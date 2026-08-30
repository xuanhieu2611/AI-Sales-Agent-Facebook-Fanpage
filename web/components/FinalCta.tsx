import { ChatCircleDots } from "@phosphor-icons/react/dist/ssr";
import { Button, MessengerIcon, SectionHead } from "./ui";
import { Reveal } from "./Reveal";
import { messengerCta, ZALO_SO_DIEN_THOAI, ZALO_URL } from "@/lib/site";
import { VI_TRI } from "@/lib/tracking";

/**
 * Khối chốt. Đây là chỗ DUY NHẤT trên trang đảo sang nền màu đậm — cả
 * trang là nền sáng, nên một khối xanh đặc ở cuối đọc như một điểm dừng.
 */
export function FinalCta() {
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

      <div className="shell relative flex flex-col items-center gap-10">
        <Reveal>
          <SectionHead onBrand align="center" title="Thông Tin Liên Hệ" />
        </Reveal>

        <Reveal className="reveal-d1">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <Button
              href={messengerCta(VI_TRI.chotCuoiTrang)}
              external
              cta={VI_TRI.chotCuoiTrang}
              variant="onBrand"
            >
              <MessengerIcon className="h-4 w-4" />
              Messenger
            </Button>

            {ZALO_URL && (
              <Button
                href={ZALO_URL}
                external
                cta={VI_TRI.chotCuoiTrang}
                variant="outlineOnBrand"
              >
                <ChatCircleDots weight="fill" aria-hidden className="h-4 w-4" />
                Zalo · {ZALO_SO_DIEN_THOAI}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
