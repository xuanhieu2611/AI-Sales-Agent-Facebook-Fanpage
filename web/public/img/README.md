# Ảnh và video cho landing page

Hiện tất cả ảnh đang là **ảnh giữ chỗ** (file `.svg` có chữ). Thay bằng ảnh
thật theo hướng dẫn dưới.

Sau khi bỏ file vào đây, sửa đường dẫn trong **`web/lib/site.ts`** — không cần
đụng vào code giao diện.

---

## 1. Ảnh Bubby — `bubby.*`

| | |
|---|---|
| Vị trí trên trang | Mục "Người dạy bạn" |
| Tỉ lệ | **4:5 (dọc)** — vd. 800×1000, 1200×1500 |
| Định dạng | `.jpg` hoặc `.webp` |
| Nên là | Ảnh chân dung rõ mặt, sáng, nhìn thẳng. Ảnh đang dạy hoặc ngồi bàn làm việc đều được. Tránh ảnh selfie tối hoặc ảnh có nhiều người. |

Bỏ file vào `web/public/img/bubby.jpg`, rồi trong `web/lib/site.ts`:

```ts
export const ANH = {
  bubby: "/img/bubby.jpg",   // ← đổi .svg thành .jpg
};
```

---

## 2. Feedback học viên

Trang có **ba kiểu feedback**. Dùng đủ cả ba thì thuyết phục nhất, vì mỗi
kiểu làm một việc khác nhau.

### 2a. Câu nói nổi bật (chữ đánh máy) — thuyết phục nhất trên điện thoại

Ảnh chụp tin nhắn ở cỡ nhỏ thì không ai đọc nổi. Ba câu này được đánh máy
lại nên đọc được ngay khi lướt qua.

Trong `web/lib/site.ts`, điền vào `FEEDBACK_NOI_BAT`:

```ts
export const FEEDBACK_NOI_BAT: FeedbackNoiBat[] = [
  {
    cau: "Lần đầu em nói với khách nước ngoài mà không phải dịch trong đầu.",
    ten: "Ngọc Ánh",
    ketQua: "học xong khóa Full",
  },
  // thêm 2 câu nữa
];
```

Lưu ý: **trích ngắn thôi**, tối đa 3 dòng. Câu dài thì khách không đọc.
Và **nhớ xin phép học viên** trước khi đăng tên thật.

Để trống mảng này thì khối đó tự ẩn, trang vẫn chạy bình thường.

### 2b. Video học viên tự quay — thuyết phục nhất, nhưng phải bấm mới xem

Up lên YouTube (để chế độ "không công khai" cũng nhúng được), rồi lấy phần
ID trong link. Ví dụ link `youtube.com/watch?v=abc123xyz` thì ID là
`abc123xyz`.

```ts
export const FEEDBACK_VIDEO: FeedbackVideo[] = [
  { videoId: "abc123xyz", ketQua: "Minh Thư, đi phỏng vấn bằng tiếng Anh sau 5 tháng" },
];
```

**2 tới 3 cái là đủ**, đừng nhiều hơn. Video nên ngắn, dưới 1 phút.

### 2c. Ảnh chụp màn hình — chứng minh mấy cái trên là có thật

| | |
|---|---|
| Vị trí trên trang | Mục "Học viên nói gì", phần tường ảnh phía dưới |
| Tỉ lệ | **3:4 (dọc)** — ảnh chụp màn hình điện thoại là vừa đẹp |
| Định dạng | `.jpg`, `.png` hoặc `.webp` |
| Số lượng | Đang để 8 ô. Thêm/bớt bao nhiêu cũng được. |

Ảnh trong lưới bị cắt theo **phần trên** (`object-top`), nên crop sẵn sao cho
câu feedback nằm ở nửa trên. Khách **bấm vào ảnh là phóng to đọc được cả
tấm**, nên phần dưới bị cắt trong lưới cũng không mất đi đâu.

**Nhớ che tên/ảnh đại diện học viên** nếu chưa xin phép đăng.

```ts
export const FEEDBACK = [
  { src: "/img/feedback/fb-01.jpg", alt: "Feedback học viên về khóa phát âm" },
  // ... đổi hết .svg thành .jpg
];
```

`alt` là mô tả cho người khiếm thị và cho Google — viết đúng nội dung feedback,
đừng để chung chung.

---

## 3. Video giới thiệu (quan trọng nhất)

Video này nằm **ngay trong phần đầu trang**, ngay dưới câu tiêu đề. Nó là thứ
quan trọng nhất trên cả trang: khách lạ xem nó thay vì đọc.

| | |
|---|---|
| Độ dài | **60 tới 90 giây**, đừng dài hơn |
| Phụ đề | **Bắt buộc cháy sẵn trong video** |
| Nội dung | Bubby là ai · dạy kiểu gì · vì sao cách này khác · mời nhắn tin |

Vì sao phụ đề là bắt buộc: phần lớn khách xem trên điện thoại và **tắt tiếng**.
Không có phụ đề thì coi như không có video.

Up lên YouTube rồi sửa trong `web/lib/site.ts`:

```ts
export const VIDEO = {
  gioiThieu: "ID_VIDEO_MOI",   // ← thay vào đây
  // ...
};
```

---

## Mẹo về dung lượng

Ảnh nên dưới **300KB** mỗi tấm. Traffic từ quảng cáo phần lớn chạy 4G, trang
nặng là mất khách trước khi họ kịp đọc.

Nén nhanh bằng [squoosh.app](https://squoosh.app) (kéo thả, chọn WebP, chất
lượng ~75).
