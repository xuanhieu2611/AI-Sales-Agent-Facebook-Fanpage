import { TranslateDemo } from "./TranslateDemo";
import { Button, MessengerIcon } from "./ui";
import { CHI_SO, MESSENGER_URL, TONG_BUOI } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-8 pb-20 sm:pb-24">
      {/* lưới rất mờ — gợi giấy kẻ ô, không phải hiệu ứng tech */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <div className="shell relative">
        {/* thanh điều hướng tối giản */}
        <header className="flex items-center justify-between py-5">
          <span className="font-display text-lg font-extrabold tracking-tight text-white">
            English with Bubby
          </span>
          <Button
            href={MESSENGER_URL}
            external
            variant="outlineInk"
            className="px-5 py-2.5 text-sm"
          >
            <MessengerIcon className="h-4 w-4" />
            Nhắn tin
          </Button>
        </header>

        <div className="grid items-start gap-12 pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-20">
          {/* ── cột trái: luận điểm ── */}
          <div className="flex flex-col gap-7">
            <span className="eyebrow inline-flex w-fit items-center gap-2 rounded-full border border-line-ink bg-white/5 px-3.5 py-1.5 text-muted-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              Coaching 1-1 · Xây gốc tiếng Anh
            </span>

            <h1 className="text-[2.5rem] leading-[1.18] text-white sm:text-[3.4rem] lg:text-[3.9rem]">
              Bạn không dở tiếng Anh.
              <br />
              <span className="text-brand-soft">
                Bạn đang dịch từng chữ một.
              </span>
            </h1>

            <p className="max-w-[46ch] text-lg leading-relaxed text-muted-ink">
              Đọc thì hiểu, mà tới lúc nói là đứng hình — vì tiếng Việt và
              tiếng Anh lệch nhau ở ba chỗ:{" "}
              <strong className="font-semibold text-white">Từ</strong>,{" "}
              <strong className="font-semibold text-white">Câu</strong> và{" "}
              <strong className="font-semibold text-white">Thì</strong>. Lộ trình{" "}
              {TONG_BUOI} buổi của Bubby xử lý đúng ba chỗ đó, không dạy lan man.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={MESSENGER_URL} external>
                <MessengerIcon className="h-5 w-5" />
                Nhắn tin nhận tư vấn lộ trình
              </Button>
              <Button href="#dang-ky" variant="outlineInk">
                Để lại số điện thoại
              </Button>
            </div>

            <p className="font-mono text-xs text-muted-ink/70">
              Tư vấn miễn phí · Bubby trả lời trực tiếp 9h–21h
            </p>
          </div>

          {/* ── cột phải: chứng minh ── */}
          <TranslateDemo />
        </div>

        {/* dải số liệu */}
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line-ink pt-10 lg:grid-cols-4">
          {CHI_SO.map((c) => (
            <div key={c.nhan} className="flex flex-col gap-1.5">
              <dt className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {c.so}
              </dt>
              <dd className="text-sm leading-snug text-muted-ink">{c.nhan}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
