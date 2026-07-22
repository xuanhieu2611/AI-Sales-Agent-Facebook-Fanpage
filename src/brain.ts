import { buildSystemPrompt } from "./prompt.js";
import { getStore } from "./state.js";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = process.env.MODEL || "deepseek/deepseek-v4-flash";

// Built once; the sales script is a stable prefix (kept separate from the
// per-request date block below so the prompt stays easy to reason about).
const SYSTEM_PROMPT = buildSystemPrompt();

const HANDOFF_MARK = "[HANDOFF]";

/** System signals the model appends at the end of a reply; stripped before sending. */
export type FunnelEvent = "course_sent" | "price_quoted" | "trial_sent" | "extend";
const EVENT_RE = /\[EVENT:(course_sent|price_quoted|trial_sent|extend)\]/g;

export interface Reply {
  raw: string; // full model output incl. markers (stored for context)
  text: string; // cleaned text to send to the customer
  handoff: boolean;
  events: FunnelEvent[];
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function plusDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

interface ChatCompletionResponse {
  choices?: Array<{ message?: { content?: string | null } }>;
  error?: { message?: string };
}

/**
 * Feed the customer's history through the LLM via OpenRouter. The caller
 * (funnel.ts) is responsible for having appended the latest user turn first,
 * and for persisting the assistant turn + acting on `events` afterwards.
 */
export async function generateReply(psid: string): Promise<Reply> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  const store = await getStore();
  const convo = await store.getConversation(psid);
  const turns = await store.getTurns(psid);

  // Volatile per-request context — not baked into SYSTEM_PROMPT.
  const promoLine = convo.promoDeadline
    ? `Hạn ưu đãi đã chốt cho khách này: ${convo.promoDeadline}. Dùng đúng ngày này khi nhắc ưu đãi.`
    : `Khách này chưa chốt hạn ưu đãi. Nếu báo giá/hạn ưu đãi lần đầu, hạn = hôm nay + 2 ngày (tức ${plusDays(2)}).`;
  const dateBlock = `Hôm nay là ${today()}. ${promoLine}`;

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://englishwithbubby.com",
      "X-Title": "English with Bubby Messenger Agent",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      messages: [
        { role: "system", content: `${SYSTEM_PROMPT}\n\n${dateBlock}` },
        ...turns,
      ],
    }),
  });

  const data = (await response.json()) as ChatCompletionResponse;
  if (!response.ok) {
    throw new Error(
      `OpenRouter ${response.status}: ${data.error?.message ?? JSON.stringify(data)}`,
    );
  }

  const raw = (data.choices?.[0]?.message?.content ?? "").trim();
  if (!raw) {
    throw new Error("OpenRouter returned an empty completion");
  }

  const handoff = raw.includes(HANDOFF_MARK);
  const events = [...raw.matchAll(EVENT_RE)].map((m) => m[1] as FunnelEvent);

  // Strip every marker before the customer sees it.
  const text = raw.replaceAll(HANDOFF_MARK, "").replace(EVENT_RE, "").replace(/\s+$/g, "").trim();

  return { raw, text, handoff, events: [...new Set(events)] };
}
