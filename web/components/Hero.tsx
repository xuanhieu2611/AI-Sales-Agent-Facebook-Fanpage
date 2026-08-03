import { CaretDown, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { YouTubeLite } from "./YouTubeLite";
import { Button, Mark, MessengerIcon } from "./ui";
import { MESSENGER_URL, VIDEO } from "@/lib/site";

/**
 * Hero theo format "lời hứa lớn → giải thích ngắn → video". Với dịch vụ
 * coaching cá nhân, video là bằng chứng sớm nhất: khách thấy Bubby nói và
 * dạy thế nào trước khi phải đọc phần phương pháp dài hơn ở bên dưới.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 sm:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[58rem] -translate-x-1/2 rounded-full bg-brand-soft/75 blur-[120px]"
      />

      <div className="shell relative flex flex-col items-center pt-10 text-center sm:pt-16">
        {/* Mốc cho StickyCta: sau khi khách đã thấy lời hứa, thanh Messenger
            sẽ xuất hiện trên điện thoại trong lúc họ xem video. */}
        <div id="dau-trang" className="flex max-w-[76rem] flex-col items-center gap-6">
          <span className="eyebrow inline-flex w-fit items-center rounded-full border border-brand/25 bg-brand-soft/60 px-3.5 py-1.5 text-brand">
            Coaching 1-1 · Xây gốc tiếng Anh
          </span>

          <h1 className="max-w-[18ch] text-[2.45rem] leading-[1.2] text-ink sm:text-[3.55rem] lg:max-w-[19ch] lg:text-[4.25rem]">
            Bạn không dở tiếng Anh. Bạn đang <Mark>dịch từng chữ một.</Mark>
          </h1>

          <p className="max-w-[61ch] text-[1.03rem] leading-relaxed text-muted sm:text-lg">
            Đọc thì hiểu, tới lúc nói là đứng hình? Bubby chỉ ra đúng chỗ bạn
            đang kẹt, rồi trực tiếp sửa bài 1-1 để bạn dùng được tiếng Anh trong
            tình huống thật — không học thuộc mẫu câu.
          </p>
        </div>

        <p className="mt-11 flex items-center gap-2 font-display text-[1.35rem] leading-[1.25] font-extrabold tracking-tight text-brand sm:mt-14 sm:text-[1.8rem]">
          Bước 1: Xem 90 giây để biết Bubby dạy khác ở đâu
          <CaretDown weight="bold" aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
        </p>

        <div className="mt-6 w-full max-w-4xl">
          <YouTubeLite
            id={VIDEO.gioiThieu}
            title="English with Bubby dạy kiểu gì"
            priority
          />
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Button href={MESSENGER_URL} external className="px-7">
            <MessengerIcon className="h-5 w-5" />
            Bước 2: Nhận lộ trình phù hợp
          </Button>
          <p className="flex items-center gap-2 text-sm leading-relaxed text-muted">
            <CheckCircle weight="fill" aria-hidden className="h-4 w-4 shrink-0 text-brand" />
            Bubby trực tiếp tư vấn trong khung 9h–21h mỗi ngày
          </p>
        </div>
      </div>
    </section>
  );
}
