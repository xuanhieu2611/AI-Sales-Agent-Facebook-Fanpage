# Gift-video access automation (Apps Script)

Auto-grants **24h** viewer access to the free grammar video and auto-removes it, so the
salesperson only pastes an email — no more manual Drive add/remove.

- `Code.gs` — the whole tool (grant on paste, sweep-remove after 24h, re-grant on checkbox).
- The "queue" is a Google Sheet with columns: `email | grantedAt | removeAt | status | regrant?`

## Why Apps Script (not a server)
The gift folder is on a **personal Gmail**, where Drive can't auto-expire shares (that's
Workspace-only). Apps Script runs *on that same account*, so it can add/remove viewers and
run a timed sweep with no OAuth app, no server, and no cost.

---

## One-time setup (~5 min)

**1. Get the gift folder's ID**
- Open Google Drive, open the folder that holds the video.
- Look at the URL: `https://drive.google.com/drive/folders/`**`XXXXXXXX`** — copy the
  `XXXXXXXX` part.
- Make sure the folder's **link-sharing is OFF** (right-click → Share → under "General
  access" pick **Restricted**). Per-email viewers are the whole gate.
  - *If your gift is a single video file, not a folder:* use the file's ID instead and see
    the `getFolder()` note in `Code.gs`.

**2. Create the Sheet + script**
- Go to https://sheets.google.com and create a new blank spreadsheet.
- Menu: **Extensions → Apps Script**. A code editor opens.
- Delete the default `function myFunction() {}` and paste the entire contents of `Code.gs`.
- At the top, replace `PASTE_FOLDER_ID_HERE` with the ID from step 1.
- Click the **Save** icon (💾).

**3. Run setup once (this installs the triggers)**
- In the Apps Script toolbar, pick the function **`setup`** from the dropdown, click **Run**.
- Google will ask for authorization the first time:
  - Click **Review permissions** → choose your account.
  - You'll see "Google hasn't verified this app" (expected — it's your own script).
    Click **Advanced → Go to (project name) (unsafe)** → **Allow**.
- Back in the sheet you'll see a "Setup done ✅" toast and a **Queue** tab with headers.

Done. The tool is live.

---

## Daily use (salesperson)

- Open the spreadsheet, go to the **Queue** tab.
- Paste (or type) the customer's Gmail into column **A**. Access is granted within a second;
  columns B–D fill in (`grantedAt`, `removeAt`, `status = granted`).
- Send the customer the Drive link as usual.
- After 24h the script removes access automatically (`status` → `expired`).
- **Last-chance re-grant:** tick the **regrant?** checkbox (column E) on that row → a fresh
  24h window starts.

You can paste several emails down column A at once — each row is granted.

---

## Verify it works (do this before going live)
1. Paste a **throwaway Gmail** into column A → open the folder signed in as that account →
   the video should be viewable, and the row should say `granted`.
2. Edit that row's `removeAt` (column C) to a time in the **past**, then in Apps Script run
   `sweepExpired` manually → the throwaway account should lose access; row → `expired`.
3. Tick `regrant?` on that row → access restored, fresh `removeAt`.
4. Confirm the folder's General access stayed **Restricted** the whole time.

## Notes / limits
- Grant is silent (Google sends **no** notification email — the salesperson sends the link).
- Removal fires on the sweep interval (default every 15 min), so expiry is "within ~15 min
  of 24h" — fine for this use.
- The recipient must be a real Google account or the share just pends.
- **Forward-compatible:** when the Messenger bot is ready to own the conversation, it can
  append a row to this same Sheet (Sheets API) and the grant/expire engine keeps working
  unchanged.
