# Ảnh cho landing page

Hiện tất cả đang là **ảnh giữ chỗ** (file `.svg` màu tím có chữ). Thay bằng ảnh
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

## 2. Feedback học viên — `feedback/fb-01.*` … `fb-08.*`

| | |
|---|---|
| Vị trí trên trang | Mục "Học viên nói gì" |
| Tỉ lệ | **3:4 (dọc)** — ảnh chụp màn hình điện thoại là vừa đẹp |
| Định dạng | `.jpg`, `.png` hoặc `.webp` |
| Số lượng | Đang để 8 ô. Thêm/bớt bao nhiêu cũng được. |

**Quan trọng:** ảnh được cắt theo **phần trên** (`object-top`), nên hãy crop sẵn
sao cho câu feedback nằm ở nửa trên của ảnh. Phần dưới có thể bị cắt.

**Nhớ che tên/ảnh đại diện học viên** nếu chưa xin phép đăng.

Bỏ file vào `web/public/img/feedback/`, rồi trong `web/lib/site.ts`:

```ts
export const FEEDBACK = [
  { src: "/img/feedback/fb-01.jpg", alt: "Feedback học viên về khóa phát âm" },
  // ... đổi hết .svg thành .jpg
];
```

`alt` là mô tả cho người khiếm thị và cho Google — viết đúng nội dung feedback,
đừng để chung chung.

---

## Mẹo về dung lượng

Ảnh nên dưới **300KB** mỗi tấm. Traffic từ quảng cáo phần lớn chạy 4G — trang
nặng là mất khách trước khi họ kịp đọc.

Nén nhanh bằng [squoosh.app](https://squoosh.app) (kéo thả, chọn WebP, chất
lượng ~75).
