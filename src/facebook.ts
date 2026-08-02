/**
 * Facebook Messenger Send API helpers.
 * Docs: https://developers.facebook.com/docs/messenger-platform
 */

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || "";
const GRAPH_URL = "https://graph.facebook.com/v21.0/me/messages";

/** True for web-playground session ids (not real Messenger PSIDs). */
export function isWebSession(id: string): boolean {
  return id.startsWith("web-");
}

/** Send a text message to a customer by their Page-Scoped ID (PSID). */
export async function sendMessage(recipientId: string, text: string): Promise<void> {
  // Web playground sessions only persist to the DB; the /play UI polls for them.
  if (isWebSession(recipientId)) {
    console.log(`[play] → ${recipientId}: ${text.slice(0, 80)}${text.length > 80 ? "…" : ""}`);
    return;
  }

  const res = await fetch(`${GRAPH_URL}?access_token=${PAGE_ACCESS_TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { id: recipientId },
      messaging_type: "RESPONSE",
      message: { text },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Facebook Send API error:", res.status, err);
  }
}

/** Show the "typing…" bubble so replies feel human. */
export async function sendTyping(recipientId: string): Promise<void> {
  if (isWebSession(recipientId)) return;
  await fetch(`${GRAPH_URL}?access_token=${PAGE_ACCESS_TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { id: recipientId },
      sender_action: "typing_on",
    }),
  }).catch(() => {});
}

// Soft cap per Messenger bubble. business.ts's QUY_TAC already tells the model to put
// price/deadline sentences "on their own line" precisely so they read as one thought —
// so newlines are the primary split point; MAX_CHARS only kicks in for a long paragraph
// that has no line breaks at all.
const MAX_CHARS = 300;
const SENTENCE_RE = /[^.!?…]+[.!?…]*\s*/g;

/** Break a reply into human-sized chat bubbles: paragraph breaks first, then long
 * paragraphs get packed sentence-by-sentence up to MAX_CHARS. */
export function splitForMessenger(text: string): string[] {
  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  for (const para of paragraphs) {
    if (para.length <= MAX_CHARS) {
      chunks.push(para);
      continue;
    }
    const sentences = para.match(SENTENCE_RE) ?? [para];
    let current = "";
    for (const s of sentences) {
      if (current && current.length + s.length > MAX_CHARS) {
        chunks.push(current.trim());
        current = s;
      } else {
        current += s;
      }
    }
    if (current.trim()) chunks.push(current.trim());
  }
  return chunks.length ? chunks : [text.trim()];
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const INTER_MESSAGE_DELAY_MS = 700;

/** Send a reply as one or more bubbles (see splitForMessenger), pausing with a
 * typing indicator between them so a long reply reads like a real person chatting
 * instead of one wall of text. */
export async function sendReply(recipientId: string, text: string): Promise<void> {
  const chunks = splitForMessenger(text);
  for (let i = 0; i < chunks.length; i++) {
    if (i > 0) {
      await sendTyping(recipientId);
      await sleep(INTER_MESSAGE_DELAY_MS);
    }
    await sendMessage(recipientId, chunks[i]);
  }
}
