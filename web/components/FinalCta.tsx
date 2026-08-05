import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";
import { Button, CTA, Eyebrow, MessengerIcon } from "./ui";
import {
  CONTACT,
  FANPAGE_URL,
  MESSENGER_URL,
  SO_DIEN_THOAI,
  ZALO_URL,
} from "@/lib/site";

/**
 * Khối chốt. Đây là chỗ DUY NHẤT trên trang đảo sang nền màu đậm — cả
 * trang là nền sáng, nên một khối xanh đặc ở cuối đọc như một điểm dừng,
 * không phải như đi lạc sang trang khác. Đừng nhân bản kiểu nền này cho
 * các mục khác.
 */
export function FinalCta() {
  return (
    <section id="dang-ky" className="relative overflow-hidden bg-brand py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-[110px]"
      />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_minmax(0,26rem)] lg:gap-16">
          <div className="flex flex-col gap-7">
            <Eyebrow onBrand>Bắt đầu</Eyebrow>

            <h2 className="max-w-[16ch] text-[2.3rem] leading-[1.2] text-white sm:text-5xl lg:text-[3.4rem]">
              Nhắn một câu thôi, Bubby tư vấn lộ trình cho bạn.
            </h2>

            <p className="max-w-[46ch] text-[1.05rem] leading-relaxed text-white/80">
              Bạn kể mình học tới đâu, kẹt chỗ nào. Bubby nói thẳng nên bắt đầu
              từ khóa nào, kể cả khi câu trả lời là “chưa cần học khóa nào cả”.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={MESSENGER_URL} external variant="onBrand">
                <MessengerIcon className="h-5 w-5" />
                {CTA.loTrinh}
              </Button>
              <Button href={FANPAGE_URL} external variant="outlineOnBrand">
                {CTA.fanpage}
              </Button>
            </div>

            {/* Kênh phụ cho khách ngại Messenger — nhiều người Việt nhắn Zalo
                quen tay hơn. Cố ý để dạng link chữ, không phải nút: thêm nút
                thứ ba ở đây là bắt khách phải chọn, mà Messenger mới là chỗ
                bot trả lời được ngay. Chưa điền số thì cả dòng tự ẩn. */}
            {(ZALO_URL || SO_DIEN_THOAI) && (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.95rem]">
                {ZALO_URL && (
                  <a
                    href={ZALO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white underline-offset-4 hover:underline"
                  >
                    Nhắn Zalo
                  </a>
                )}
                {SO_DIEN_THOAI && (
                  <a
                    href={`tel:${SO_DIEN_THOAI.replace(/[^\d+]/g, "")}`}
                    className="font-semibold text-white underline-offset-4 hover:underline"
                  >
                    Gọi {SO_DIEN_THOAI}
                  </a>
                )}
              </div>
            )}

            <p className="font-mono text-xs text-white/60">
              {CONTACT.pageName} · trả lời {CONTACT.gioLamViec}
            </p>
          </div>

          <Reveal>
            <div className="flex flex-col gap-5 rounded-2xl bg-surface p-7">
              <p className="font-display text-lg font-bold tracking-tight text-ink">
                Hoặc để lại số, Bubby gọi lại.
              </p>
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
