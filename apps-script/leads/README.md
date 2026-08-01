# Leads từ landing page → Google Sheet

Form "để lại số điện thoại" trên landing page đi theo đường:

```
Form (trình duyệt) → POST /api/lead (Next.js) → Apps Script Web App → Google Sheet
```

Đi vòng qua route handler của Next.js chứ không post thẳng từ trình duyệt, để URL
Apps Script không lộ ra client và không dính CORS.

## Dựng lần đầu

**1. Tạo Google Sheet**

Tạo một Sheet mới, đặt tên gì cũng được. Copy `SHEET_ID` từ URL:

```
https://docs.google.com/spreadsheets/d/<ĐÂY_LÀ_SHEET_ID>/edit
```

Không cần tự tạo cột — script tự tạo tab `Leads` và dòng tiêu đề ở lần chạy đầu.

**2. Tạo Apps Script**

1. Vào [script.google.com](https://script.google.com) → **New project**
2. Xóa hết code mẫu, dán toàn bộ nội dung `Code.gs` vào
3. Sửa `SHEET_ID` thành ID vừa copy
4. Sửa `SECRET` thành một chuỗi ngẫu nhiên bạn tự bịa (vd. `bubby-leads-8f3k2n`)
5. Đặt tên project rồi **Save**

**3. Deploy thành Web App**

1. Nút **Deploy** → **New deployment**
2. Bấm bánh răng cạnh "Select type" → chọn **Web app**
3. Điền:
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` ← bắt buộc, nếu để `Anyone with Google account` thì server gọi vào sẽ bị 401
4. **Deploy** → cấp quyền (Google sẽ cảnh báo "app chưa được xác minh" → **Advanced** → **Go to ... (unsafe)**, đây là script của chính bạn nên không sao)
5. Copy **Web app URL** (dạng `https://script.google.com/macros/s/AKfy.../exec`)

**4. Nối vào landing page**

Trong `web/.env.local` (chạy máy) và trong Vercel → Settings → Environment Variables (chạy thật):

```
LEAD_WEBHOOK_URL=https://script.google.com/macros/s/AKfy.../exec
LEAD_WEBHOOK_SECRET=bubby-leads-8f3k2n
```

`LEAD_WEBHOOK_SECRET` phải trùng với `SECRET` trong `Code.gs`.

## Kiểm tra

Mở Web app URL bằng trình duyệt — phải thấy `{"ok":true,"service":"bubby-leads"}`.

Rồi thử gửi một lead thật:

```bash
curl -X POST https://script.google.com/macros/s/AKfy.../exec \
  -H 'Content-Type: application/json' \
  -d '{"ten":"Test","sdt":"0901234567","khoa":"Khóa Full","secret":"bubby-leads-8f3k2n"}'
```

Mở Sheet ra xem có dòng mới chưa.

## Lưu ý

- **Mỗi lần sửa `Code.gs` phải deploy lại**: Deploy → Manage deployments → bút chì →
  Version: **New version** → Deploy. URL giữ nguyên, không cần đổi env.
- Nếu chưa đặt `LEAD_WEBHOOK_URL`, form vẫn báo thành công cho khách nhưng lead chỉ
  được ghi ra log của server. Nhớ đặt biến này trước khi chạy quảng cáo.
- Cột **Trạng thái** để bạn tự đánh dấu đã gọi hay chưa — script không đụng vào.
