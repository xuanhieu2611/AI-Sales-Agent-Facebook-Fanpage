import { buildSystemPrompt } from "./prompt.js";
import { getStore } from "./state.js";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = process.env.MODEL || "deepseek/deepseek-v4-flash";

// Built once; the sales script is a stable prefix (kept separate from the
// per-request date block below so the prompt stays easy to reason about).
const SYSTEM_PROMPT = buildSystemPrompt();

const HANDOFF_MARK = "[HANDOFF]";

/** System signals the model appends at the end of a reply; stripped before sending. */
export type FunnelEvent =
  | "course_sent"
  | "price_quoted"
  | "trial_sent"
  | "extend"
  | "gift_watched";
const EVENT_RE =
  /\[EVENT:(course_sent|price_quoted|trial_sent|extend|gift_watched)\]/g;

/**
 * The owner does not want the bot saying "Dạ" or the deferential particle "ạ"
 * (too subservient — not their voice). QUY_TAC tells the model that; this is the
 * deterministic backstop for slips.
 *
 * "Dạ" is only stripped as an opener (start of message/line, or after . ! ? …) —
 * "Dạ vâng", "Dạ ạ", "Dạ," included — then what follows is re-capitalised.
 * "ạ" is stripped anywhere it stands as its own syllable ("vâng ạ" → "vâng",
 * "đúng không ạ?" → "đúng không?"); the lookarounds keep "dạy", "bạn", "ạvv"
 * and friends intact.
 */
const DA_OPENER_RE =
  /(^|\n|(?<=[.!?…]\s))[ \t]*dạ(?!\p{L})(?:\s+(?:vâng|vầng|ạ))*[\s,.!]*(\p{L})?/giu;
const A_PARTICLE_RE = /[ \t]*(?<!\p{L})ạ(?!\p{L})/giu;

function stripDa(s: string): string {
  const out = s
    .replace(DA_OPENER_RE, (_m, pre: string, letter?: string) =>
      `${pre ?? ""}${letter ? letter.toUpperCase() : ""}`,
    )
    .replace(A_PARTICLE_RE, "");
  // If the whole reply was just "Dạ vâng ạ", keep something sendable.
  return out.trim() ? out : "Ok bạn nha 😊";
}

/**
 * Anti-echo backstop. The model likes to re-append its standing pitch verbatim
 * ("Nhớ là ưu đãi còn đến ngày X…", "xem xong nhắn mình feedback nha") in the very
 * next reply, so two consecutive bot messages say the same thing. QUY_TAC tells it
 * not to; this drops the leftovers deterministically.
 *
 * Only compares against the ONE previous assistant message, only drops sentences
 * that are long enough to be real content, and backs off entirely when the customer
 * just asked something — a repeat is then an answer, not an echo.
 */
const SENTENCE_RE = /[^.!?…\n]+[.!?…]*/g;
const QUESTION_RE = /\?|(^|\s)(gì|nào|sao|mấy|đâu|bao nhiêu|thế nào|khi nào|hả)(\s|$|,|\?)/i;

function stripMarkers(s: string): string {
  return s.replaceAll(HANDOFF_MARK, "").replace(EVENT_RE, "").trim();
}

function tokens(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\/]+/gu, " ") // keep dates like 04/08/2026 intact
      .trim()
      .split(/\s+/)
      .filter(Boolean),
  );
}

function similarity(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let shared = 0;
  for (const t of a) if (b.has(t)) shared++;
  return shared / (a.size + b.size - shared); // Jaccard
}

const ECHO_THRESHOLD = 0.6;
const MIN_ECHO_TOKENS = 6; // "Ok bạn nha" repeating is fine; a whole pitch is not

export function dropEchoes(text: string, prevAssistant: string, lastUser: string): string {
  if (!prevAssistant.trim() || QUESTION_RE.test(lastUser)) return text;

  const prevSentences = (prevAssistant.match(SENTENCE_RE) ?? [])
    .map(tokens)
    .filter((t) => t.size >= MIN_ECHO_TOKENS);
  if (!prevSentences.length) return text;

  const kept = text
    .split("\n")
    .map((line) => {
      const sentences = line.match(SENTENCE_RE) ?? [];
      return sentences
        .map((s) => s.trim())
        .filter((s) => {
          const t = tokens(s);
          if (t.size < MIN_ECHO_TOKENS) return true;
          return !prevSentences.some((p) => similarity(t, p) >= ECHO_THRESHOLD);
        })
        .join(" ")
        .trim();
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Whole reply was an echo → a short ack beats sending the same message twice.
  return kept || "Ok bạn nha 😊";
}

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
  choices?: Array<{
    message?: { content?: string | null };
    finish_reason?: string | null;
  }>;
  usage?: { completion_tokens_details?: { reasoning_tokens?: number } };
  error?: { message?: string };
}

// Reasoning-capable models (deepseek-v4-flash) burn part of max_tokens on an
// internal reasoning trace before the visible reply. On complex multi-branch
// prompts that trace has been observed up to ~1600-1900 tokens combined with
// the reply; 3072 leaves comfortable headroom. `reasoning.max_tokens` is NOT
// a reliable cap (verified empirically: model still exceeded a 200-token cap)
// so we don't rely on it — a generous max_tokens is the real safety margin.
const MAX_TOKENS = 3072;
// Same call, once, for the truncation retry — kept separate so the retry can
// hand it a fresh/bigger budget without duplicating the whole request setup.
const RETRY_MAX_TOKENS = 4096;
const TRUNCATION_FALLBACK_TEXT =
  "Để mình kiểm tra lại và phản hồi bạn sớm nhất nha 😊";

async function callOpenRouter(
  apiKey: string,
  messages: unknown[],
  maxTokens: number,
): Promise<ChatCompletionResponse> {
  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://englishwithbubby.com",
      "X-Title": "English with Bubby Messenger Agent",
    },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, messages }),
  });

  const data = (await response.json()) as ChatCompletionResponse;
  if (!response.ok) {
    throw new Error(
      `OpenRouter ${response.status}: ${data.error?.message ?? JSON.stringify(data)}`,
    );
  }
  return data;
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
  // Ground truth for gift access — model must not invent "đã cấp quyền".
  const emailLine = convo.accessGrantedAt
    ? `Hệ thống ĐÃ cấp quyền Drive cho email ${convo.email}. Có thể nói đã cấp quyền.`
    : `Hệ thống CHƯA cấp quyền (chưa có email hợp lệ dạng tên@domain). TUYỆT ĐỐI KHÔNG nói "đã cấp quyền" / "mình cấp rồi". Nếu đang chờ email mà tin khách không phải địa chỉ email → nhắc gửi lại email.`;
  const dateBlock = `Hôm nay là ${today()}. ${promoLine}\n${emailLine}`;

  const messages = [
    { role: "system", content: `${SYSTEM_PROMPT}\n\n${dateBlock}` },
    ...turns,
  ];

  let data = await callOpenRouter(apiKey, messages, MAX_TOKENS);
  let truncated = data.choices?.[0]?.finish_reason === "length";
  if (truncated) {
    const reasoningTokens = data.usage?.completion_tokens_details?.reasoning_tokens;
    console.warn(
      `⚠️ OpenRouter truncated reply (finish_reason=length, reasoning_tokens=${reasoningTokens}) — retrying with a bigger budget`,
    );
    data = await callOpenRouter(apiKey, messages, RETRY_MAX_TOKENS);
    truncated = data.choices?.[0]?.finish_reason === "length";
  }

  if (truncated) {
    // Both attempts got cut off. Markers are appended at the END of a reply,
    // so a truncated string can't be trusted for events, and a partial
    // sentence isn't safe to show a real customer — hand off instead of
    // guessing. This mirrors what funnel.ts/server.ts already do for a
    // model-issued [HANDOFF], so no changes are needed there.
    console.error("🔔 OpenRouter truncated reply twice — forcing handoff");
    return {
      raw: `${TRUNCATION_FALLBACK_TEXT} ${HANDOFF_MARK}`,
      text: TRUNCATION_FALLBACK_TEXT,
      handoff: true,
      events: [],
    };
  }

  const modelOutput = (data.choices?.[0]?.message?.content ?? "").trim();
  if (!modelOutput) {
    throw new Error("OpenRouter returned an empty completion");
  }
  // Scrub "Dạ" before storing too, so the history doesn't reinforce the habit.
  const cleaned = stripDa(modelOutput);

  const handoff = cleaned.includes(HANDOFF_MARK);
  const events = [...new Set([...cleaned.matchAll(EVENT_RE)].map((m) => m[1] as FunnelEvent))];

  // Strip every marker before the customer sees it.
  // Messenger bold is *one* asterisk per side; models often emit Markdown **…**.
  const stripped = cleaned
    .replaceAll(HANDOFF_MARK, "")
    .replace(EVENT_RE, "")
    .replaceAll("**", "*")
    .replace(/\s+$/g, "")
    .trim();

  const prevAssistant = stripMarkers(
    [...turns].reverse().find((t) => t.role === "assistant")?.content ?? "",
  );
  const lastUser = [...turns].reverse().find((t) => t.role === "user")?.content ?? "";
  const text = dropEchoes(stripped, prevAssistant, lastUser);

  // History stores what the customer actually saw + the signals, so a dropped echo
  // can't come back as context on the next turn.
  const markers = [...events.map((e) => `[EVENT:${e}]`), ...(handoff ? [HANDOFF_MARK] : [])];
  const raw = markers.length ? `${text} ${markers.join(" ")}` : text;

  return { raw, text, handoff, events };
}
