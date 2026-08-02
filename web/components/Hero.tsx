import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { YouTubeLite } from "./YouTubeLite";
import { Button, CTA, Mark, MessengerIcon } from "./ui";
import { MESSENGER_URL, VIDEO } from "@/lib/site";

/**
 * Đầu trang kiểu "xem video trước".
 *
 * Chữ ở đây chỉ có đúng ba việc: chặn khách lại, nói trong một câu bên
 * mình chữa cái gì, rồi đẩy mắt xuống video. Mọi thứ còn lại để video nói.
 * Đừng thêm đoạn văn nào vào khối này — thêm chữ ở đây là đẩy video
 * xuống dưới màn hình, mà video mới là thứ giữ chân khách.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 sm:pb-20">
      {/* vệt sáng xanh rất nhạt phía sau, để nền giấy không phẳng lì */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[52rem] -translate-x-1/2 rounded-full bg-brand-soft/70 blur-[120px]"
      />

      <div className="shell relative flex flex-col items-center pt-10 text-center sm:pt-14">
        {/* Mốc cho StickyCta: thanh nút dưới màn hình hiện lên khi khối
            chữ này trôi khỏi tầm nhìn, tức là đúng lúc khách bắt đầu xem
            video. Đừng bọc cả video vào đây. */}
        <div id="dau-trang" className="flex flex-col items-center gap-6">
          <span className="eyebrow inline-flex w-fit items-center rounded-full border border-brand/25 bg-brand-soft/60 px-3.5 py-1.5 text-brand">
            Coaching 1-1 · Xây gốc tiếng Anh
          </span>

          {/* leading-[1.2]: xem ghi chú dấu tiếng Việt trong globals.css.
              Vệt bút vàng làm lỗi cắt dấu lộ ra rõ hơn nữa.

              <br /> là cố ý: để chữ tự xuống dòng thì nó ngắt thành
              "…dở tiếng / Anh." và cắt đúng giữa một cụm từ. Dấu chấm
              cuối nằm TRONG <Mark> vì padding của vệt bút đẩy nó ra xa,
              trông như bị lạc mất một khoảng trắng. */}
          <h1 className="text-[2.1rem] leading-[1.2] text-ink sm:text-[2.9rem] lg:text-[3.4rem]">
            Bạn không dở tiếng Anh.
            <br />
            Bạn đang <Mark>dịch từng chữ một.</Mark>
          </h1>

          <p className="max-w-[52ch] text-lg leading-relaxed text-muted">
            Đọc thì hiểu, tới lúc nói là đứng hình. Bên mình sửa đúng chỗ đó,
            bằng giáo án xây gốc 32 buổi và coaching 1-1 với Bubby.
          </p>
        </div>

        {/* Lời nhắc bấm play — khách lạ cần được chỉ việc phải làm tiếp.
            Giữ NGẮN: font mono rất rộng, câu dài là xuống hai dòng trên
            điện thoại và mũi tên bị bỏ lại một mình ở dòng dưới. */}
        <p className="mt-10 flex items-center gap-2 font-mono text-[0.8rem] text-brand sm:text-sm">
          Xem 2 phút để biết bên mình dạy kiểu gì
          <CaretDown weight="bold" aria-hidden className="h-4 w-4 shrink-0" />
        </p>

        <div className="mt-5 w-full max-w-3xl">
          <YouTubeLite
            id={VIDEO.gioiThieu}
            title="English with Bubby dạy kiểu gì"
            priority
          />
        </div>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button href={MESSENGER_URL} external>
            <MessengerIcon className="h-5 w-5" />
            {CTA.nhanTin}
          </Button>
          <Button href="#dang-ky" variant="outline">
            {CTA.deLaiSo}
          </Button>
        </div>
      </div>
    </section>
  );
}
