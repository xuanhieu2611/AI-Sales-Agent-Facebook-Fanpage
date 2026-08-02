import { Button, CTA, MessengerIcon } from "./ui";
import { MESSENGER_URL } from "@/lib/site";

/**
 * CTA phụ cho nhóm còn phân vân. Đây là buổi học thử của sản phẩm thật,
 * không phải quà tặng câu email — nên nó đứng ở cuối trang, sau khi khách
 * đã thấy giá, chứ không đứng trước.
 */
export function Trial() {
  return (
    <section className="border-y border-mark/50 bg-mark-soft py-20 sm:py-24">
      <div className="shell">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="flex max-w-[46ch] flex-col gap-4">
            <h2 className="text-[1.9rem] leading-[1.22] text-ink sm:text-[2.5rem]">
              Phân biệt 12 thì trong 1 giờ.
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-ink-soft">
              Một buổi học thử thật, lấy nguyên từ lộ trình. Học xong rồi hẵng
              quyết định đăng ký.
            </p>
          </div>

          <Button href={MESSENGER_URL} external className="shrink-0">
            <MessengerIcon className="h-5 w-5" />
            {CTA.nhanTin}
          </Button>
        </div>
      </div>
    </section>
  );
}
