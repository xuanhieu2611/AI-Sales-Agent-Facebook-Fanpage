# AI Sales Agent cho Facebook Fanpage

Chatbot AI tự động trả lời khách và chốt đơn trên Messenger, chạy theo **kịch bản bán hàng của bạn** + chăm sóc khách. Dùng Claude làm "bộ não".

## Cách hoạt động

```
Khách nhắn Fanpage  →  Server của bạn  →  Claude (kịch bản + tư vấn)  →  Trả lời khách
                              └─ nếu khó → đánh dấu [HANDOFF] để bạn xử lý
```

---

## Phần 1 — Chạy thử AI trên máy (KHÔNG cần Facebook)

Làm phần này trước để dạy AI đúng kịch bản của bạn.

1. **Cài Node.js** (bản 20 trở lên): [https://nodejs.org](https://nodejs.org)
2. Mở terminal trong thư mục này, chạy:

```bash
 npm install
 cp .env.example .env
```

3. Mở file `.env`, điền `OPENROUTER_API_KEY` (lấy ở [https://openrouter.ai/keys](https://openrouter.ai/keys)).
4. **Điền thông tin shop** trong file `[src/business.ts](src/business.ts)` — thay hết các chỗ `[ĐIỀN ...]`.
5. Chat thử với AI:

```bash
 npm run playground
```

Nhắn như một khách hàng, xem AI tư vấn có đúng ý không. Sửa `business.ts` rồi chạy lại đến khi ưng.

---

## Phần 2 — Kết nối Facebook Fanpage

Khi AI đã trả lời tốt, đưa nó lên Messenger. (Hướng dẫn theo giao diện Meta 2026.)

**Bước 0 — Đưa server ra internet trước.** Mở 2 cửa sổ terminal:

```bash
npm run dev            # cửa sổ 1: server chạy ở cổng 3000
npx ngrok http 3000    # cửa sổ 2: copy URL https://...ngrok-free.app nó in ra
```

Giữ nguyên cả 2 cửa sổ. Webhook URL của bạn là `https://<url-ngrok>/webhook`.
(Khi chạy thật, deploy lên Render / Railway / VPS để luôn online.)

**Bước 1 — Tạo Meta app.** Vào [https://developers.facebook.com/apps](https://developers.facebook.com/apps) → **Create app**.
Chọn mục đích **Other** → loại app **Business** → tạo.

**Bước 2 — Thêm sản phẩm Messenger.** Trong dashboard, tìm **Messenger** → **Set up**.
Trang này tên là **Messenger API settings**.

**Bước 3 — Kết nối Fanpage.** Ở mục **Generate access tokens**, bấm **Connect** /
**Add or remove Pages** → chọn Fanpage của bạn, đồng ý các quyền.

**Bước 4 — Lấy Page Access Token.** Bấm **Generate** cạnh tên Fanpage → copy token dài →
dán vào `PAGE_ACCESS_TOKEN` trong `.env`. (Generate lần nữa sẽ tạo token mới, token cũ hết hạn.)

**Bước 5 — Đặt Verify Token.** Nghĩ 1 chuỗi bất kỳ, dán vào `VERIFY_TOKEN` trong `.env`
(ví dụ `bubby-secret-2026`).

**Bước 6 — Khai báo Webhook.** Cùng trang, mục **Configure webhooks** → **Edit**:

- **Callback URL:** `https://<url-ngrok>/webhook`
- **Verify token:** giống HỆT `VERIFY_TOKEN` trong `.env`
- Bấm **Verify and save → cử**a sổ 1 hiện `Webhook verified ✅`.
- Mục **Webhook fields** → **Add subscriptions** → tích `messages`, `messaging_postbacks`,
  và `message_reactions` (để bot nhận biết khách "thả tim").

**Bước 7 — Nhắn thử** vào Fanpage bằng chính tài khoản admin của bạn. Bot sẽ trả lời.

> ⚠️ **Ai được nhắn bot trong lúc test:** Trước khi qua **App Review** cho quyền
> `pages_messaging`, bot CHỈ trả lời tài khoản có vai trò **Admin / Developer / Tester**
> trong app. Muốn bạn bè test cùng: dashboard → **App roles → Roles** → thêm họ làm **Tester**.
> Khách thật chỉ nhắn được sau khi app được duyệt.

> 💡 Lưu ý: mỗi lần restart `ngrok`, URL đổi → phải sửa lại Callback URL ở Bước 6.
> Token ở Bước 4 là loại ngắn hạn (đủ để test); khi deploy thật cần đổi sang token dài hạn.

---

## Phần 3 — Bật database Supabase (lưu hội thoại + hẹn giờ follow-up)

Không có bước này, bot vẫn chạy nhưng dùng bộ nhớ RAM: **mất hết khi restart** và
**không gửi được các tin nhắc theo giờ** (20h/6h/hết hạn ưu đãi). Làm phần này khi
muốn chạy thật.

**Bước 1 — Tạo project.** Vào [https://supabase.com/dashboard](https://supabase.com/dashboard)
→ **New project**. Đặt tên (vd `bubby-agent`), chọn region gần VN (Singapore),
đặt **Database Password** (lưu lại). Bấm **Create new project**, đợi ~1 phút.

**Bước 2 — Lấy connection string.** Trên thanh trên cùng bấm nút **Connect** →
tab **Connection string** → chọn **Session pooler** (không phải Transaction) →
copy chuỗi dạng `postgresql://postgres.xxxx:[YOUR-PASSWORD]@...pooler.supabase.com:5432/postgres`.
   - Thay `[YOUR-PASSWORD]` bằng mật khẩu ở Bước 1.
   - Thêm `?sslmode=require` vào cuối nếu chưa có.
   - Dán vào `DATABASE_URL` trong `.env`.

**Bước 3 — Tạo bảng.** Chạy:

```bash
npm run db:migrate
```

In ra `✅ Migration applied — tables are ready.` là xong. (Hoặc: mở Supabase →
**SQL Editor** → dán nội dung file `migrations/001_init.sql` → **Run**.)

**Bước 4 — Chạy lại** `npm run dev`. Khởi động thấy `✅ Connected to Postgres` và
`⏰ Scheduler started` là ổn. Từ giờ hội thoại được lưu và các tin nhắc tự gửi đúng giờ.

> 💡 **Test nhanh timer:** đặt `TIMER_SCALE=0.002` trong `.env` để 20h co lại còn
> ~2.4 phút — xem các tin nhắc tự bắn mà không phải đợi thật.

### Tự động cấp quyền quà tặng (Apps Script)

Khi khách gửi email, bot POST `{email, psid, extension}` tới `GIFT_ACCESS_WEBHOOK_URL`.
Trỏ biến này tới **Apps Script Web App** của bạn (cái đang cấp quyền Drive 24h). Trong
Apps Script: **Deploy → New deployment → Web app**, *Execute as: Me*, *Who has access:
Anyone*, copy URL `.../exec` dán vào `.env`. Chưa cấu hình thì bot chỉ **ghi log** —
bạn cấp quyền tay như cũ, mọi thứ khác vẫn chạy.

---

## Bàn giao cho người thật

Khi AI gặp khiếu nại, hỏi về đơn cụ thể, hoặc điều nó không biết, nó sẽ trả lời
"chờ shop kiểm tra..." và **đánh dấu cuộc trò chuyện cần người thật** — sau đó bot
im lặng cho khách đó để bạn tự trả lời trên Messenger.

Chỗ này in ra log:

```
🔔 CẦN NGƯỜI THẬT — khách <id>: "..."
```

Bạn nên nối thêm thông báo qua Telegram/email (xem `TODO` trong `src/server.ts`).

---

## File nào làm gì

| File                     | Vai trò                                                              |
| ------------------------ | -------------------------------------------------------------------- |
| `src/business.ts`        | **Bạn sửa file này** — shop, sản phẩm, giá, kịch bản, tin follow-up  |
| `src/prompt.ts`          | Ghép thông tin trên + tín hiệu hệ thống thành "bộ não" cho AI        |
| `src/brain.ts`           | Gọi OpenRouter, đọc tín hiệu `[EVENT:...]` / `[HANDOFF]`             |
| `src/funnel.ts`          | Điều phối: bắt email, đổi giai đoạn, hẹn/huỷ timer theo tín hiệu     |
| `src/state.ts`           | Lưu trạng thái + hội thoại + hàng đợi job (Postgres hoặc RAM)        |
| `src/scheduler.ts`       | Bộ hẹn giờ: tự gửi các tin nhắc 20h/6h/hết hạn ưu đãi                |
| `src/automation.ts`      | Gọi Apps Script cấp/gia hạn quyền Drive khi có email                 |
| `src/facebook.ts`        | Gửi tin nhắn qua Messenger                                           |
| `src/server.ts`          | Nhận webhook (text + reaction), khởi động scheduler                  |
| `src/playground.ts`      | Chat thử với AI trên terminal                                        |
| `migrations/001_init.sql`| Schema database (chạy `npm run db:migrate`)                          |

## Ghi chú kỹ thuật

- **Model**: mặc định `deepseek/deepseek-v4-flash` (rẻ nhất qua OpenRouter). Đổi
  `MODEL` trong `.env` sang slug khác bất kỳ (vd. `deepseek/deepseek-v3.2`,
  `anthropic/claude-haiku-4.5`) — không cần sửa code.
- **Lưu trữ**: có `DATABASE_URL` (Supabase) thì hội thoại + timer lưu bền vững; không
  có thì tự động rơi về bộ nhớ RAM (mất khi restart) — tiện cho playground.
- **Timer**: `scheduler.ts` chạy in-process (poll mỗi 30s). Nếu sau này deploy
  serverless, đổi sang Supabase `pg_cron` gọi endpoint — bảng `scheduled_jobs` giữ nguyên.
- **Tín hiệu**: AI gắn `[EVENT:course_sent|trial_sent|price_quoted|extend|gift_watched]` và
  `[HANDOFF]` ở cuối tin (khách không thấy) để hệ thống hẹn giờ / bàn giao. Đổi ký hiệu
  thì sửa cả `prompt.ts`/`business.ts` lẫn `brain.ts`/`funnel.ts`.
# AI-Sales-Agent-Facebook-Fanpage
