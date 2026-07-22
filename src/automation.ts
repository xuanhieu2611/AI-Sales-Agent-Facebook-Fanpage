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

export async function grantGiftAccess(
  email: string,
  psid: string,
  opts: { extension?: boolean } = {},
): Promise<void> {
  const payload = { email, psid, extension: !!opts.extension };

  if (!WEBHOOK_URL) {
    console.log(
      `[automation] (GIFT_ACCESS_WEBHOOK_URL not set) would grant access →`,
      payload,
    );
    return;
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("[automation] grant webhook returned", res.status, await res.text());
    } else {
      console.log(`[automation] access ${opts.extension ? "extended" : "granted"} for ${email}`);
    }
  } catch (err) {
    console.error("[automation] grant webhook failed:", err);
  }
}
