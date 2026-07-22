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
