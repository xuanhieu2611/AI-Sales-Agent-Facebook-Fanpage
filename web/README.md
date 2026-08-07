# Landing page — English with Bubby

Trang đích cho quảng cáo Facebook. Khách bấm quảng cáo → vào trang này → nhắn
qua Facebook Page hoặc Zalo.

Next.js 16 (App Router) + Tailwind v4. Tách riêng khỏi bot Messenger ở thư mục
gốc — hai project độc lập, deploy riêng.

## Chạy

```bash
cd web
npm run dev      # http://localhost:3000
npm run build    # build production
npx eslint .     # lint
```

## Bạn sửa ở đâu

| Muốn đổi | Sửa file |
|---|---|
| Giá, tên khóa, nội dung khóa | `lib/site.ts` |
| Link Messenger (`m.me/...`) | `lib/site.ts` → `MESSENGER_URL` |
| Số Zalo, link kênh | `lib/site.ts` → `ZALO_SO_DIEN_THOAI`, `KENH_URL` |
| Số follower, danh sách phát | `lib/site.ts` → `BUBBY` |
| Nhãn ưu đãi ("Ưu đãi tháng này") | `lib/site.ts` → `UU_DAI` |
| Câu hỏi thường gặp | `lib/site.ts` → `FAQ` |
| "Vì sao học mãi vẫn không hiệu quả" | `lib/site.ts` → `LY_DO_THAT_BAI` |
| Ví dụ trong khối "Dịch thử" | `lib/translations.ts` |
| Ảnh Bubby, ảnh feedback | `public/img/` → xem `public/img/README.md` |

Nội dung nằm hết trong `lib/`, giao diện nằm trong `components/`. Đổi chữ thì
không cần đụng vào `components/`.

## Cần làm trước khi chạy quảng cáo

- [ ] **Điền `MESSENGER_URL`** trong `lib/site.ts` — đang để tạm
      `m.me/englishwithbubby`, phải đổi thành username thật của Page.
- [ ] **Thay ảnh thật** — ảnh Bubby và ảnh feedback đang là ảnh giữ chỗ màu tím.
      Xem `public/img/README.md`.
- [ ] **Kiểm tra nhãn ưu đãi** — `UU_DAI.nhan` đang là "Ưu đãi tháng này" (cố ý
      không ghi tháng cụ thể để khỏi bị cũ). Nếu muốn ghi rõ tháng thì nhớ đổi
      mỗi tháng.
- [ ] **Điền link kênh và số Zalo** — `KENH_URL`, `ZALO_SO_DIEN_THOAI` trong
      `lib/site.ts` đang để trống. Trống thì mấy chỗ đó tự ẩn, trang không lỗi
      — nhưng khối "150+ nội dung miễn phí" mất nút bấm qua kênh và khách không
      có lựa chọn nhắn Zalo.
- [ ] **Kiểm lại số follower** — `BUBBY.soFollower` đang ghi `70.6K`. Con số cũ
      hơn thực tế thì phí, mà cao hơn thực tế thì khách mở kênh ra là biết.
- [ ] **Đổi ad copy** — trang này bán thẳng vào vấn đề, không phát quà miễn phí
      nữa. Quảng cáo vẫn chạy nội dung "tặng bài học free" thì sẽ kéo về đúng
      tệp khách cũ, và trang này không hợp với họ.

## Lưu ý khi sửa giao diện

**Line-height với tiếng Việt.** Tiếng Việt chồng hai tầng dấu (`ế` `ỗ` `ữ`), phần
nhô lên cao hơn tiếng Anh nhiều. Để `line-height` dưới ~1.2 cho chữ tiêu đề là
dấu của dòng dưới đâm lên dòng trên rồi bị cắt — nhìn y như font bị lỗi mất dấu.

Cạm bẫy: utility `text-5xl` (và các cỡ khác) của Tailwind **kèm sẵn
`line-height: 1`**, đè lên rule chung trong `globals.css`. Nên mỗi tiêu đề dùng
`text-*` đều phải kèm `leading-*` rõ ràng.

**Hiệu ứng cuộn.** `components/Reveal.tsx` dùng CSS scroll-driven animation, không
dùng JavaScript — trình duyệt không hỗ trợ thì nội dung hiện bình thường. Đừng đổi
sang kiểu ẩn-rồi-hiện-bằng-JS: traffic quảng cáo chạy 4G, JS chậm là khách thấy
trang trắng rồi thoát.

**Video.** `components/YouTubeLite.tsx` chỉ tải ảnh thumbnail, bấm mới nhúng
iframe. Nhúng thẳng iframe YouTube làm trang nặng thêm ~1MB.
