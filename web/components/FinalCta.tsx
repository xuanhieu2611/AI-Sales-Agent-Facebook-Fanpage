import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";
import { Button, Eyebrow, MessengerIcon } from "./ui";
import { CONTACT, MESSENGER_URL } from "@/lib/site";

export function FinalCta() {
  return (
    <section id="dang-ky" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
      />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_minmax(0,26rem)] lg:gap-20">
          <div className="flex flex-col gap-7">
            <Eyebrow onInk>Bắt đầu</Eyebrow>

            <h2 className="max-w-[16ch] text-[2.3rem] leading-[1.2] text-white sm:text-5xl lg:text-[3.6rem]">
              Nhắn một câu thôi, Bubby tư vấn lộ trình cho bạn.
            </h2>

            <p className="max-w-[48ch] text-[1.05rem] leading-relaxed text-muted-ink">
              Bạn kể tình trạng hiện tại của mình — học tới đâu, kẹt chỗ nào,
              muốn đạt gì. Bubby sẽ nói thẳng bạn nên bắt đầu từ khóa nào, kể cả
              khi câu trả lời là “chưa cần học khóa nào cả”.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={MESSENGER_URL} external variant="ink">
                <MessengerIcon className="h-5 w-5" />
                Nhắn tin qua Messenger
              </Button>
            </div>

            <p className="font-mono text-xs text-muted-ink/70">
              {CONTACT.pageName} · trả lời {CONTACT.gioLamViec}
            </p>
          </div>

          <Reveal>
            <div className="flex flex-col gap-5">
              <p className="font-display text-lg font-bold tracking-tight text-white">
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
