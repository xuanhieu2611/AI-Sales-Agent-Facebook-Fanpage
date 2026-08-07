import {
  ArrowUpRight,
  ChatCircleDots,
  FacebookLogo,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { Eyebrow } from "./ui";
import { Reveal } from "./Reveal";
import {
  CONTACT,
  FANPAGE_URL,
  ZALO_SO_DIEN_THOAI,
  ZALO_URL,
} from "@/lib/site";

/**
 * Khối chốt. Đây là chỗ DUY NHẤT trên trang đảo sang nền màu đậm — cả
 * trang là nền sáng, nên một khối xanh đặc ở cuối đọc như một điểm dừng,
 * không phải như đi lạc sang trang khác. Đừng nhân bản kiểu nền này cho
 * các mục khác.
 */
export function FinalCta() {
  const smsUrl = ZALO_SO_DIEN_THOAI
    ? `sms:${ZALO_SO_DIEN_THOAI.replace(/[^\d+]/g, "")}`
    : "";

  return (
    <section id="dang-ky" className="relative overflow-hidden bg-brand py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-44 -right-32 h-[31rem] w-[31rem] rounded-full bg-white/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-[20%] h-64 w-64 rounded-full bg-brand-deep/35 blur-[100px]"
      />

      <div className="shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-20">
          <div className="flex max-w-xl flex-col items-start gap-6">
            <Eyebrow onBrand>Bắt đầu</Eyebrow>

            <h2 className="max-w-[14ch] text-[2.3rem] leading-[1.22] text-white sm:text-5xl lg:text-[3.4rem]">
              Nhắn Bubby theo cách bạn quen.
            </h2>

            <p className="max-w-[48ch] text-[1.05rem] leading-relaxed text-white/80">
              Không cần để lại thông tin. Chọn nơi bạn hay nhắn, rồi nói Bubby
              biết bạn đang kẹt ở đâu.
            </p>

            <p className="font-mono text-xs text-white/65">
              {CONTACT.pageName} · trả lời {CONTACT.gioLamViec}
            </p>
          </div>

          <Reveal className="w-full">
            <div className="rounded-2xl border border-white/20 bg-brand-deep/30 p-3 shadow-[0_24px_60px_-36px_rgba(8,27,76,0.9)] backdrop-blur-sm">
              <p className="px-3 pt-3 pb-2 text-sm font-semibold text-white">
                Chọn kênh nhắn tin
              </p>

              <a
                href={FANPAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl bg-white p-4 text-ink transition-[transform,background-color] duration-[160ms] ease-[var(--ease-out)] active:scale-[0.98] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-mark"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                  <FacebookLogo aria-hidden weight="fill" className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.95rem] font-bold">Nhắn Facebook</span>
                  <span className="mt-0.5 block text-sm text-muted">
                    Xem Page và gửi tin nhắn cho Bubby
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  weight="bold"
                  className="h-5 w-5 shrink-0 text-brand transition-transform duration-[160ms] ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-0.5"
                />
              </a>

              {ZALO_URL && (
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-2 flex items-center gap-4 rounded-xl border border-white/20 bg-white/[0.07] p-4 text-white transition-[transform,background-color,border-color] duration-[160ms] ease-[var(--ease-out)] active:scale-[0.98] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:border-white/35 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.13]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/12 text-white">
                    <ChatCircleDots aria-hidden weight="fill" className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.95rem] font-bold">Nhắn Zalo</span>
                    <span className="mt-0.5 block font-mono text-sm text-white/70">
                      {ZALO_SO_DIEN_THOAI}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    weight="bold"
                    className="h-5 w-5 shrink-0 text-white/80 transition-transform duration-[160ms] ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-0.5"
                  />
                </a>
              )}

              {smsUrl && (
                <a
                  href={smsUrl}
                  className="mt-1.5 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-colors duration-[160ms] ease-[var(--ease-out)] hover:text-white"
                >
                  <Phone aria-hidden weight="bold" className="h-4 w-4" />
                  Hoặc nhắn SMS: {ZALO_SO_DIEN_THOAI}
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
