/**
 * Nhận lead từ landing page (web/app/api/lead/route.ts) và ghi vào Google Sheet.
 *
 * CÁCH DỰNG — xem README.md trong cùng thư mục này.
 */

// Dán ID của Google Sheet vào đây (lấy từ URL của Sheet).
const SHEET_ID = 'ĐIỀN_ID_GOOGLE_SHEET';
const SHEET_NAME = 'Leads';

// Chuỗi bí mật tự bịa. Phải trùng với LEAD_WEBHOOK_SECRET bên Vercel.
// Để trống nếu không muốn kiểm tra (không khuyến khích — ai biết URL cũng ghi được).
const SECRET = '';

const COT = ['Thời gian', 'Tên', 'Số điện thoại', 'Khóa quan tâm', 'Nguồn', 'Trạng thái'];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (SECRET && data.secret !== SECRET) {
      return json({ ok: false, error: 'sai-secret' });
    }

    const sheet = laySheet_();

    sheet.appendRow([
      new Date(),
      data.ten || '',
      // dấu nháy để Sheet không cắt mất số 0 ở đầu
      "'" + (data.sdt || ''),
      data.khoa || '',
      data.nguon || '',
      'Mới',
    ]);

    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err) });
  }
}

/** Mở bằng trình duyệt để kiểm tra Web App đã chạy chưa. */
function doGet() {
  return json({ ok: true, service: 'bubby-leads' });
}

function laySheet_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Tự tạo dòng tiêu đề nếu sheet còn trống.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COT);
    sheet.getRange(1, 1, 1, COT.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
