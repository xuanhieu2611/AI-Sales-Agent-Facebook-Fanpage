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

## Đo lường quảng cáo

Chuyển đổi thật KHÔNG xảy ra trên trang này. Khách bấm nút rồi nhảy sang
Messenger, và Pixel mù từ đó trở đi. Nên có hai lớp đo, mạnh yếu khác nhau:

| Sự kiện | Bắn lúc nào | Đáng tin tới đâu |
|---|---|---|
| `PageView` | mở trang | đủ dùng |
| `ViewContent` | cuộn tới bảng giá | tín hiệu giữa phễu, nhiều số, tối ưu được khi ngân sách còn nhỏ |
| `Contact` | bấm nút Messenger / Zalo | **chỉ là thay thế.** Meta tối ưu theo cái này sẽ đi tìm người hay bấm nút |
| `Lead` | bot nhận cuộc trò chuyện thật | sự thật - nhưng phải làm thêm ở phía bot, xem dưới |

Hai biến môi trường, đặt trên Vercel (xem `.env.example`):

- `NEXT_PUBLIC_META_PIXEL_ID` - trống thì toàn bộ khối đo lường biến mất,
  không tải script nào. Ở máy nên để trống.
- `META_DOMAIN_VERIFICATION` - mã xác minh domain.

Sửa ở đâu:

| Muốn đổi | Sửa file |
|---|---|
| Thêm vị trí nút CTA mới | `lib/tracking.ts` → `VI_TRI` |
| Cách bắn sự kiện | `components/MetaPixel.tsx` |
| Link Messenger của một nút | `lib/site.ts` → `messengerCta()` |

**Thêm nút CTA mới thì nhớ hai thứ:** `href={messengerCta(VI_TRI.x)}` và
`data-cta={VI_TRI.x}` trên chính thẻ `<a>`. Quên `data-cta` thì sự kiện vẫn
bắn, chỉ là dồn hết vào nhóm `khac` và bạn mất khả năng biết nút nào chạy.

### Bàn giao cho bot (phần còn thiếu)

Mỗi link Messenger mang theo tham số:

```
?ref=lp:<viTri>:<_fbc>:<_fbp>
```

`_fbc` và `_fbp` là hai cookie do Pixel đặt ra. Chúng là thứ duy nhất nối
được cuộc trò chuyện trong Messenger ngược về đúng quảng cáo đã trả tiền.
Trang này đã gắn xong. **Phía bot (repo gốc) chưa làm**, cần:

1. Đọc `ref` ở webhook `messaging_referrals` (khách đã từng nhắn) và trong
   postback của nút Get Started (khách nhắn lần đầu) - hai đường khác nhau,
   thiếu một là mất một nửa số khách.
2. Tách chuỗi theo dấu `:`, lấy `_fbc` / `_fbp`.
3. Gửi Conversions API sự kiện `Lead` kèm hai giá trị đó.

Làm xong bước này thì mới chuyển được mục tiêu quảng cáo sang tối ưu theo
người thật sự nhắn tin, thay vì người bấm nút.

## Cần làm trước khi chạy quảng cáo

Trong Meta Business Manager:

- [ ] **Xác minh domain** `englishwithbubby.com` (Brand safety → Domains).
      Chọn cách Meta-tag, dán mã vào biến `META_DOMAIN_VERIFICATION` rồi
      deploy lại. Không xác minh thì không cấu hình được sự kiện chuyển đổi
      cho khách iPhone - mà phần lớn traffic quảng cáo là điện thoại.
- [ ] **Tạo / lấy Pixel ID** rồi đặt vào `NEXT_PUBLIC_META_PIXEL_ID`.
- [ ] **Xếp thứ tự ưu tiên sự kiện** (Aggregated Event Measurement):
      `Lead` → `Contact` → `ViewContent` → `PageView`.
- [ ] **Kiểm bằng Meta Pixel Helper** trên Chrome: mở trang thật, xem
      `PageView` có bắn không, cuộn tới bảng giá xem `ViewContent`, bấm nút
      xem `Contact` và `content_name` có đúng tên vị trí không.

Trong nội dung trang:

- [ ] **Điền `KENH_URL`** trong `lib/site.ts` - đang trống nên link kênh ở
      chân trang tự ẩn.
- [ ] **Kiểm lại số follower** - `BUBBY.soFollower` đang ghi `70k+`. Con số
      cũ hơn thực tế thì phí, cao hơn thực tế thì khách mở kênh ra là biết.
- [ ] **Kiểm tra nhãn ưu đãi** - `UU_DAI.nhan` đang là "Ưu đãi tháng này"
      (cố ý không ghi tháng cụ thể để khỏi bị cũ).
- [ ] **Đổi ad copy** - trang này bán thẳng vào vấn đề, không phát quà miễn
      phí nữa. Quảng cáo vẫn chạy nội dung "tặng bài học free" thì sẽ kéo về
      đúng tệp khách cũ, và trang này không hợp với họ.

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
