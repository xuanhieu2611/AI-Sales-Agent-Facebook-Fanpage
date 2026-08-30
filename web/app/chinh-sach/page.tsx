import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import {
  CONTACT,
  FANPAGE_URL,
  ZALO_SO_DIEN_THOAI,
} from "@/lib/site";

/**
 * Chính sách bảo mật.
 *
 * VÌ SAO TRANG NÀY PHẢI CÓ: Meta duyệt quảng cáo có kiểm tra trang đích.
 * Trang chạy Pixel mà không có chính sách bảo mật là một trong những lý do
 * bị từ chối hay gặp nhất với ngành giáo dục / khóa học. Nó cũng là điều
 * kiện trong Điều khoản Nền tảng của Meta khi dùng công cụ đo lường.
 *
 * Viết ngắn và đúng sự thật. Trang này KHÔNG có form, không thu thập email,
 * không có giỏ hàng - nói đúng như vậy thì vừa dễ đọc vừa không hứa thừa.
 * Thêm form vào trang thì phải quay lại sửa file này.
 */
export const metadata: Metadata = {
  title: "Chính sách bảo mật - English with Bubby",
  description:
    "Cách English with Bubby thu thập và sử dụng dữ liệu trên trang englishwithbubby.com.",
  // Trang phụ, không cần Google đưa lên trước trang bán hàng.
  robots: { index: false, follow: true },
};

export default function ChinhSach() {
  return (
    <>
      <SiteHeader />

      <main className="header-clear shell max-w-[68ch] pb-20">
        <h1 className="text-[2.1rem] leading-[1.22] text-ink sm:text-[2.8rem]">
          Chính sách bảo mật
        </h1>

        <p className="mt-4 text-sm text-muted">
          Áp dụng cho trang englishwithbubby.com
        </p>

        <Muc tieuDe="Trang này thu thập gì">
          <p>
            Trang không có ô nhập liệu nào. Bên mình không hỏi tên, email hay
            số điện thoại của bạn ở đây, và không có form để bạn điền.
          </p>
          <p>
            Thứ duy nhất được ghi nhận là dữ liệu đo lường ẩn danh do Meta
            Pixel tạo ra: bạn mở trang lúc nào, xem tới phần nào, có bấm nút
            nhắn tin hay không. Dữ liệu này gắn với trình duyệt, không gắn với
            tên của bạn.
          </p>
        </Muc>

        <Muc tieuDe="Meta Pixel và cookie">
          <p>
            Trang dùng Meta Pixel của Facebook để đo hiệu quả quảng cáo. Pixel
            đặt cookie trong trình duyệt của bạn để Meta biết quảng cáo nào đã
            dẫn bạn tới đây.
          </p>
          <p>
            Bên mình dùng nó để biết quảng cáo nào đáng tiền và hiển thị lại
            quảng cáo cho người đã ghé trang. Dữ liệu Pixel do Meta xử lý theo{" "}
            <A href="https://www.facebook.com/privacy/policy/">
              Chính sách quyền riêng tư của Meta
            </A>
            . Bạn tắt được phần này trong{" "}
            <A href="https://www.facebook.com/adpreferences/ad_settings">
              cài đặt quảng cáo của tài khoản Facebook
            </A>
            , hoặc bằng cách chặn cookie trong trình duyệt.
          </p>
        </Muc>

        <Muc tieuDe="Khi bạn bấm nút nhắn tin">
          <p>
            Các nút trên trang mở Messenger hoặc Zalo. Từ lúc đó, cuộc trò
            chuyện diễn ra trên nền tảng của Meta hoặc Zalo và theo chính sách
            của họ. Link Messenger có kèm một mã đánh dấu bạn bấm từ chỗ nào
            trên trang, để bên mình biết phần nội dung nào có ích - mã này
            không chứa thông tin cá nhân.
          </p>
          <p>
            Những gì bạn chủ động nhắn cho bên mình (tên, trình độ hiện tại,
            mục tiêu học) được dùng đúng một việc: tư vấn lộ trình cho bạn. Bên
            mình không bán và không chia sẻ thông tin đó cho bên thứ ba.
          </p>
        </Muc>

        <Muc tieuDe="Nội dung nhúng từ bên ngoài">
          <p>
            Video trên trang nhúng từ YouTube. Trang chỉ tải ảnh thumbnail, và
            YouTube chỉ nhận được dữ liệu của bạn khi bạn thật sự bấm nút phát.
          </p>
        </Muc>

        <Muc tieuDe="Quyền của bạn">
          <p>
            Muốn biết bên mình đang giữ gì về bạn, hoặc muốn xóa đi, nhắn qua{" "}
            <A href={FANPAGE_URL}>fanpage</A> hoặc Zalo{" "}
            {ZALO_SO_DIEN_THOAI}. Bên mình trả lời trong khung{" "}
            {CONTACT.gioLamViec}.
          </p>
        </Muc>

        <p className="mt-12">
          <Link
            href="/"
            className="text-sm font-semibold text-brand underline-offset-4 hover:underline"
          >
            ← Về trang chủ
          </Link>
        </p>
      </main>

      <Footer />
    </>
  );
}

function Muc({
  tieuDe,
  children,
}: {
  tieuDe: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 flex flex-col gap-3">
      {/* leading-[1.3] bắt buộc: utility text-* của Tailwind kèm line-height:1,
          mà 1.0 thì dấu tiếng Việt bị cắt ngọn. */}
      <h2 className="font-subtitle text-[1.35rem] leading-[1.3] font-semibold text-ink">
        {tieuDe}
      </h2>
      <div className="flex flex-col gap-3 leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-brand underline underline-offset-4"
    >
      {children}
    </a>
  );
}
