/**
 * Gift-video Drive access automation.
 *
 * The owner's Apps Script + Sheet actually grants/revokes the 24h Drive access.
 * Here we just POST the captured email to that Apps Script Web App URL so the
 * grant (or the one-time extension) happens automatically.
 *
 * Set GIFT_ACCESS_WEBHOOK_URL in .env to the Apps Script deployment URL.
 * If it's not set, we just log what *would* happen (safe for local testing).
 */
const WEBHOOK_URL = process.env.GIFT_ACCESS_WEBHOOK_URL;

/** Human-readable result for logs / playground notices. */
export async function grantGiftAccess(
  email: string,
  psid: string,
  opts: { extension?: boolean } = {},
): Promise<string> {
  const payload = { email, psid, extension: !!opts.extension };
  const action = opts.extension ? "extended" : "granted";

  if (!WEBHOOK_URL) {
    const msg = `[automation] (GIFT_ACCESS_WEBHOOK_URL not set) would ${action === "extended" ? "extend" : "grant"} access → ${email}`;
    console.log(msg, payload);
    return msg;
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error("[automation] grant webhook returned", res.status, detail);
      return `[automation] webhook failed (${res.status}) for ${email}`;
    }
    const msg = `[automation] access ${action} for ${email}`;
    console.log(msg);
    return msg;
  } catch (err) {
    console.error("[automation] grant webhook failed:", err);
    return `[automation] webhook error for ${email}`;
  }
}
