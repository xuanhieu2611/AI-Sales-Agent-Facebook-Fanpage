# Ảnh và video cho landing page

Bỏ file ảnh vào đây, rồi sửa đường dẫn trong **`web/lib/site.ts`** — không cần
đụng vào code giao diện.

**Ô nào chưa có ảnh thật thì tự hiện khung brief** ghi rõ cần chụp cái gì.
Trang nhận biết bằng đuôi file: đường dẫn còn trỏ vào `.svg` nghĩa là ảnh giữ
chỗ. Thay bằng `.jpg`/`.png`/`.webp` là **đúng ô đó** đổi sang ảnh thật, các ô
khác không ảnh hưởng. Không phải bật tắt gì thêm.

Đang còn thiếu: **ảnh chân dung Bubby** (mục 1).

---

## 1. Ảnh Bubby — `bubby.*`

| | |
|---|---|
| Vị trí trên trang | Dải ngắn "Bubby là ai", giữa tiêu đề Bước 2 và video giải pháp |
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

## 2. Ảnh chụp kênh — `kenh/`

Ba tấm này nằm **giữa dải "Bubby là ai" và video Bước 2**, không có tiêu đề
chữ — chỉ ảnh nhỏ. Chúng làm một việc mà con số gõ tay không làm được: khách
**nhìn thấy kênh thật** (avatar, follower, playlist, feedback).

| | |
|---|---|
| Vị trí trên trang | Giữa dải "Bubby là ai" và video Bước 2 |
| Khung hiển thị | **8:5 (ngang)**, ảnh bị cắt cho vừa khung |
| Định dạng | `.jpg`, `.png` hoặc `.webp` |
| Số lượng | 3 tấm: TikTok, YouTube, Fanpage |

**Chụp bằng điện thoại.** Khung hẹp nên chữ tự to, thả vào thẻ là đọc được
ngay. Ảnh chụp màn hình máy tính rộng gấp ba, nhét vào thẻ ~380px thì dòng
follower bé tới mức không ai đọc nổi — mà **đọc được con số mới là toàn bộ lý
do dải này tồn tại**. (Tấm YouTube hiện tại chụp trên máy tính nên đã phải cắt
riêng khối đầu trang ra file `youtube-header.png`.)

Cần thấy rõ: **ảnh đại diện, tên kênh, và số người theo dõi**.

Bỏ file vào `web/public/img/kenh/`, rồi trong `web/lib/site.ts` sửa `NEN_TANG`:

```ts
{
  id: "tiktok",
  soLieu: "70.6K",                // ← phải khớp với số in trong ảnh
  url: "https://www.tiktok.com/@englishwithbubby",   // ← BẮT BUỘC điền
  anh: "/img/kenh/tiktok.jpg",
  viTriAnh: "object-top",         // ← xem giải thích bên dưới
  ...
}
```

**`url` là bắt buộc.** Thẻ nào chưa có link sẽ tự hiện dạng bấm không được —
mà ảnh chụp không bấm được thì lại tụt về thành lời tự khen, đúng thứ dải
này sinh ra để tránh.

**`soLieu` phải khớp với con số in trong chính tấm ảnh đó.** Ghi "150+ video"
cạnh tấm ảnh in rõ "59 videos" thì không chỉ mất tác dụng — nó chứng minh
ngược lại rằng bên mình nói số không đáng tin.

**`viTriAnh` quyết định phần nào của ảnh được giữ khi cắt.** Ảnh chụp mỗi
nền tảng một tỉ lệ khác nhau nên **thay ảnh là phải chỉnh lại giá trị này**,
rồi mở trang xem lại xem số follower có còn nằm trong khung không:

| Giá trị | Giữ lại phần nào |
|---|---|
| `object-top` | Mép trên (ảnh dọc dài như TikTok) |
| `object-left-top` | Góc trên trái (ảnh ngang rộng) |
| `object-[50%_30%]` | Đẩy khung xuống 30% (khi chữ nằm dưới ảnh bìa, như Fanpage) |

---

## 3. Feedback học viên

Trang có **ba kiểu feedback**, và chúng hiện **theo đúng thứ tự dưới đây**:
video trước, rồi mới tới chữ và ảnh. Cùng một mạch với đầu trang — khách xem
xong hai video rồi mới đọc. Dùng đủ cả ba thì thuyết phục nhất.

### 3a. Video học viên tự quay — mạnh nhất, để lên đầu

Đây là thứ khó dựng giả nhất, nên cũng đáng tin nhất. Bạn nói có một cái rồi,
đó chính là chỗ để nó.

Up lên YouTube (để chế độ "không công khai" cũng nhúng được), rồi lấy phần
ID trong link. Ví dụ link `youtube.com/watch?v=abc123xyz` thì ID là
`abc123xyz`.

```ts
export const FEEDBACK_VIDEO: FeedbackVideo[] = [
  { videoId: "abc123xyz", ketQua: "Minh Thư, đi phỏng vấn bằng tiếng Anh sau 5 tháng" },
];
```

**2 tới 3 cái là đủ**, đừng nhiều hơn. Video nên ngắn, dưới 1 phút. Có một
cái thì nó tự hiện to ra giữa mục, không bị co lại thành ô nhỏ.

`ketQua` là dòng chữ dưới video — viết **kết quả cụ thể**, đừng viết "bạn A
review khóa học".

### 3b. Câu nói nổi bật (chữ đánh máy) — đọc được ngay khi lướt

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

### 3c. Ảnh chụp bình luận — chứng minh mấy cái trên là có thật

| | |
|---|---|
| Vị trí trên trang | Mục "Học viên nói gì", phần cuối |
| Tỉ lệ | **Ngang, dẹt** — crop sát vào đúng một bình luận |
| Định dạng | `.jpg`, `.png` hoặc `.webp` |
| Số lượng | Đang có 4. Thêm bớt bao nhiêu cũng được. |

Ảnh hiện **nguyên tấm, rộng hết cột, không bị cắt tí nào** — nên cứ crop sát
vào đúng một bình luận là đẹp và dễ đọc nhất. Crop rộng lấy cả màn hình thì
chữ co lại và không ai đọc.

**Nhớ che tên/ảnh đại diện** nếu chưa xin phép đăng.

Mỗi tấm cần thêm **kích thước pixel thật** (`rong` × `cao`). Trang dùng nó để
chừa sẵn chỗ, ảnh tải xong không làm giật cả trang. Lấy số bằng cách bấm chuột
phải > Get Info trên máy Mac, hoặc chạy:

```bash
sips -g pixelWidth -g pixelHeight web/public/img/feedback/fb-01.jpeg
```

```ts
export const FEEDBACK: AnhFeedback[] = [
  {
    src: "/img/feedback/fb-01.jpeg",
    alt: "Bình luận: “hay lắm luôn, dễ hiểu, tui xem xog là áp dụng đc luôn”",
    rong: 1290,
    cao: 391,
  },
];
```

`alt` là mô tả cho người khiếm thị và cho Google — **chép luôn câu bình luận
vào đó**, đừng để chung chung kiểu "feedback học viên".

---

## 4. Ba video đầu trang (quan trọng nhất)

Ba video này **là cả nửa trên của trang**. Khách từ quảng cáo không đọc đoạn
văn, nên toàn bộ việc thuyết phục ban đầu nằm ở đây.

| | Bước 1 — `gioiThieu` | Bước 2 — `giaiPhap` | Bước 3 — `moHinhCoaching` |
|---|---|---|---|
| Tiêu đề trên trang | "Vì sao bạn học mãi không hiệu quả?" | "EnglishWithBubby giúp được gì cho bạn?" | "Mô hình coaching 1-1 là gì?" |
| Việc nó làm | Nói trúng chỗ khách đang kẹt | Bên mình là ai, chữa kiểu gì | Lớp chạy thế nào |
| Nội dung | Vì sao học mãi vẫn không nói được | Lộ trình / cách dạy | Bài quay sẵn + chữa 1-1 |
| **Không** làm gì | **Không bán gì ở video này** | Không kể lể dài, để giá cho phần dưới | Không nhồi giá vào đây |

Hai điều bắt buộc cho **cả ba** video:

1. **Dưới 75 giây.** Traffic quảng cáo phần lớn rời trang trước giây 30. Video
   một mà dài hai phút thì gần như không ai xem tới video sau.
2. **Phụ đề cháy sẵn trong video.** Khách xem trên điện thoại và **tắt tiếng**.
   Không có phụ đề thì coi như không có video.

Up lên YouTube rồi sửa trong `web/lib/site.ts`:

```ts
export const VIDEO = {
  gioiThieu: "ID_VIDEO_BUOC_1",
  giaiPhap: "ID_VIDEO_BUOC_2",
  moHinhCoaching: "ID_VIDEO_BUOC_3",
};
```

---

## Mẹo về dung lượng

Ảnh nên dưới **300KB** mỗi tấm. Traffic từ quảng cáo phần lớn chạy 4G, trang
nặng là mất khách trước khi họ kịp đọc.

Nén nhanh bằng [squoosh.app](https://squoosh.app) (kéo thả, chọn WebP, chất
lượng ~75).
