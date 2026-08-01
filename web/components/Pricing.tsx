import { Reveal } from "./Reveal";
import { Button, MessengerIcon, SectionHead } from "./ui";
import { KHOA_HOC, MESSENGER_URL, UU_DAI } from "@/lib/site";

export function Pricing() {
  return (
    <section id="hoc-phi" className="border-b border-line py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            eyebrow="Học phí"
            title="Ba mức, tùy bạn muốn xây tới đâu."
            lead="Khóa nhỏ để trải nghiệm trước cũng được — sau này muốn học tiếp phần còn lại thì mua bù, không mất tiền oan."
          />
        </Reveal>

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-3">
          {KHOA_HOC.map((k) => (
            <Reveal key={k.id}>
              <article
                className={`flex h-full flex-col gap-6 rounded-2xl border p-7 ${
                  k.noiBat
                    ? "border-transparent bg-ink text-white lg:-mt-4 lg:pb-9"
                    : "border-line bg-surface"
                }`}
              >
                <div className="flex flex-col gap-3">
                  {k.noiBat && UU_DAI.nhan && (
                    <span className="eyebrow w-fit rounded-full bg-brand px-3 py-1.5 text-white">
                      {UU_DAI.nhan}
                    </span>
                  )}
                  <h3
                    className={`text-xl leading-[1.3] ${
                      k.noiBat ? "text-white" : "text-ink"
                    }`}
                  >
                    {k.ten}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      k.noiBat ? "text-muted-ink" : "text-muted"
                    }`}
                  >
                    {k.tomTat}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`font-display text-4xl font-extrabold tracking-tight ${
                        k.noiBat ? "text-white" : "text-ink"
                      }`}
                    >
                      {k.giaSale}
                    </span>
                    <span
                      className={`font-mono text-sm line-through ${
                        k.noiBat ? "text-muted-ink/70" : "text-muted/60"
                      }`}
                    >
                      {k.giaGoc}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs ${
                      k.noiBat ? "text-muted-ink" : "text-muted"
                    }`}
                  >
                    {k.buoi} · {k.coaching}
                  </span>
                </div>

                <ul
                  className={`flex flex-1 flex-col gap-3 border-t pt-6 ${
                    k.noiBat ? "border-line-ink" : "border-line"
                  }`}
                >
                  {k.gomCo.map((g) => (
                    <li key={g} className="flex items-start gap-3">
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden
                        className={`mt-1 h-3.5 w-3.5 shrink-0 ${
                          k.noiBat ? "text-brand-soft" : "text-brand"
                        }`}
                      >
                        <path
                          d="M2 8.5 6 12.5 14 3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className={`text-[0.92rem] leading-snug ${
                          k.noiBat ? "text-muted-ink" : "text-muted"
                        }`}
                      >
                        {g}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={MESSENGER_URL}
                  external
                  variant={k.noiBat ? "primary" : "outline"}
                  className="w-full"
                >
                  <MessengerIcon className="h-4 w-4" />
                  {k.noiBat ? "Đăng ký khóa này" : "Đăng ký"}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        {UU_DAI.moTa && (
          <Reveal>
            <p className="mt-8 flex items-start gap-3 text-sm text-muted">
              <span aria-hidden className="font-mono text-brand">
                ★
              </span>
              {UU_DAI.moTa}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
