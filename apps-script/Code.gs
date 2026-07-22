/**
 * English with Bubby — Gift-video access automation
 * ==================================================
 * Auto-grants 24h viewer access to the free grammar video and auto-removes it,
 * so the salesperson no longer clicks Drive to add/remove people.
 *
 * How it works:
 *   - She pastes a customer's Gmail into column A of the "Queue" sheet.
 *   - An installable onEdit trigger instantly grants that email viewer access
 *     to the gift folder and stamps a 24h expiry.
 *   - A time-driven trigger sweeps every 15 min and removes anyone past 24h.
 *   - Ticking "regrant?" (column E) grants a fresh 24h window ("last chance").
 *
 * SETUP: fill FOLDER_ID below, then run setup() once (see README.md).
 *
 * NOTE (personal Gmail): Drive has no native expiring shares on personal
 * accounts, so this script performs the removal itself. Keep the folder's
 * link-sharing OFF — per-email viewers are the whole gate.
 */

// ── CONFIG ───────────────────────────────────────────────────────────
// The Google Drive FOLDER that holds the gift video. Get the ID from its URL:
// https://drive.google.com/drive/folders/THIS_IS_THE_ID
var FOLDER_ID = 'PASTE_FOLDER_ID_HERE';

var SHEET_NAME = 'Queue';
var ACCESS_HOURS = 24;          // how long access lasts
var SWEEP_EVERY_MINUTES = 15;   // how often expired access is removed

// Column layout (1-based). Row 1 is headers; data starts at row 2.
var COL = { email: 1, grantedAt: 2, removeAt: 3, status: 4, regrant: 5 };

// ── SETUP (run once) ─────────────────────────────────────────────────
/**
 * Creates the header row and installs both triggers. Safe to re-run:
 * it clears any duplicate triggers for these functions first.
 */
function setup() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  // Header row.
  sheet.getRange(1, 1, 1, 5)
    .setValues([['email', 'grantedAt', 'removeAt', 'status', 'regrant?']])
    .setFontWeight('bold');
  sheet.setFrozenRows(1);
  // Show date AND time in grantedAt / removeAt columns (they store full timestamps).
  var dateRows = Math.max(sheet.getMaxRows() - 1, 1);
  sheet.getRange(2, COL.grantedAt, dateRows, 1).setNumberFormat('M/d/yyyy H:mm');
  sheet.getRange(2, COL.removeAt, dateRows, 1).setNumberFormat('M/d/yyyy H:mm');
  // Make column E a checkbox column for the data area.
  sheet.getRange(2, COL.regrant, Math.max(sheet.getMaxRows() - 1, 1), 1)
    .insertCheckboxes();

  // Remove existing triggers for our functions to avoid duplicates.
  ScriptApp.getProjectTriggers().forEach(function (t) {
    var fn = t.getHandlerFunction();
    if (fn === 'onEditGrant' || fn === 'sweepExpired') ScriptApp.deleteTrigger(t);
  });

  // Instant grant when an email/checkbox is edited (installable = has auth).
  ScriptApp.newTrigger('onEditGrant').forSpreadsheet(ss).onEdit().create();
  // Timed removal sweep.
  ScriptApp.newTrigger('sweepExpired').timeBased()
    .everyMinutes(SWEEP_EVERY_MINUTES).create();

  SpreadsheetApp.getActive().toast('Setup done. Triggers installed ✅');
}

// ── INSTANT GRANT (installable onEdit) ───────────────────────────────
function onEditGrant(e) {
  if (!e || !e.range) return;
  var sheet = e.range.getSheet();
  if (sheet.getName() !== SHEET_NAME) return;

  var startRow = e.range.getRow();
  var numRows = e.range.getNumRows();
  var editedCol = e.range.getColumn();
  var editedWidth = e.range.getNumColumns();

  var touchesEmail = editedCol <= COL.email && editedCol + editedWidth - 1 >= COL.email;
  var touchesRegrant = editedCol <= COL.regrant && editedCol + editedWidth - 1 >= COL.regrant;
  if (!touchesEmail && !touchesRegrant) return;

  for (var r = startRow; r < startRow + numRows; r++) {
    if (r < 2) continue; // skip header
    var row = sheet.getRange(r, 1, 1, 5);
    var vals = row.getValues()[0];
    var email = String(vals[COL.email - 1] || '').trim();
    var status = String(vals[COL.status - 1] || '').trim();
    var regrant = vals[COL.regrant - 1] === true;

    if (regrant) {
      sheet.getRange(r, COL.regrant).setValue(false); // reset checkbox
      grant(sheet, r, email);
    } else if (touchesEmail && email && status !== 'granted') {
      grant(sheet, r, email);
    }
  }
}

function grant(sheet, r, email) {
  if (!isEmail(email)) {
    setStatus(sheet, r, 'error: email không hợp lệ');
    return;
  }
  try {
    getFolder().addViewer(email); // silent — no Google notification email
    var now = new Date();
    sheet.getRange(r, COL.grantedAt).setValue(now);
    sheet.getRange(r, COL.removeAt).setValue(new Date(now.getTime() + ACCESS_HOURS * 3600 * 1000));
    setStatus(sheet, r, 'granted');
  } catch (err) {
    setStatus(sheet, r, 'error: ' + err.message);
  }
}

// ── TIMED REMOVAL (time-driven sweep) ────────────────────────────────
function sweepExpired() {
  var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  if (!sheet) return;
  var last = sheet.getLastRow();
  if (last < 2) return;

  var data = sheet.getRange(2, 1, last - 1, 5).getValues();
  var now = new Date();

  for (var i = 0; i < data.length; i++) {
    var r = i + 2;
    var email = String(data[i][COL.email - 1] || '').trim();
    var removeAt = data[i][COL.removeAt - 1];
    var status = String(data[i][COL.status - 1] || '').trim();

    if (status !== 'granted' || !email || !(removeAt instanceof Date)) continue;
    if (removeAt.getTime() > now.getTime()) continue;

    try {
      getFolder().removeViewer(email);
      setStatus(sheet, r, 'expired');
    } catch (err) {
      // Already removed / never a viewer is fine — mark expired anyway.
      setStatus(sheet, r, 'expired');
    }
  }
}

// ── HELPERS ──────────────────────────────────────────────────────────
function getFolder() {
  // If your gift is a single FILE instead of a folder, replace this with:
  //   return DriveApp.getFileById(FOLDER_ID);
  // (addViewer/removeViewer work the same on a File.)
  return DriveApp.getFolderById(FOLDER_ID);
}

function setStatus(sheet, r, text) {
  sheet.getRange(r, COL.status).setValue(text);
}

function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
