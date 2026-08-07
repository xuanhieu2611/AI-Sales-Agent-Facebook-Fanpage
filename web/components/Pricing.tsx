import { Check, Star } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";
import { Button, MessengerIcon, SectionHead } from "./ui";
import { KHOA_HOC, MESSENGER_URL, UU_DAI } from "@/lib/site";

export function Pricing() {
  return (
    <section id="hoc-phi" className="py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            title="Học phí"
          />
        </Reveal>

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-3">
          {KHOA_HOC.map((k, i) => (
            <Reveal
              key={k.id}
              className={i === 1 ? "reveal-d1" : i === 2 ? "reveal-d2" : ""}
            >
              <article
                className={`flex h-full flex-col gap-6 rounded-2xl border p-7 ${
                  k.noiBat
                    ? "border-transparent bg-brand text-white shadow-[0_24px_60px_-30px_rgba(42,95,217,0.9)] lg:-mt-4 lg:pb-9"
                    : "border-line bg-surface"
                }`}
              >
                <div className="flex flex-col gap-3">
                  {k.noiBat && UU_DAI.nhan && (
                    <span className="eyebrow w-fit rounded-full bg-mark px-3 py-1.5 text-ink">
                      {UU_DAI.nhan}
                    </span>
                  )}
                  {/* min-h = đúng 2 dòng. Tên khóa dài ngắn khác nhau, không
                      chốt chiều cao thì giá của ba thẻ lệch nhau theo bậc
                      thang khi xếp ngang — nhìn như trang bị vỡ. */}
                  <h3
                    className={`text-xl leading-[1.3] lg:min-h-[3.25rem] ${
                      k.noiBat ? "text-white" : "text-ink"
                    }`}
                  >
                    {k.ten}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      k.noiBat ? "text-white/80" : "text-muted"
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
                        k.noiBat ? "text-white/60" : "text-muted/60"
                      }`}
                    >
                      {k.giaGoc}
                    </span>
                  </div>
                  {/* Quy ra giá một buổi. "2tr5" làm khách khựng lại, "78k/buổi"
                      thì so được với một bữa ăn — cùng một số tiền, khác nhau ở
                      chỗ khách có đọc tiếp hay không. */}
                  <span
                    className={`font-display text-[0.95rem] font-bold tracking-tight ${
                      k.noiBat ? "text-mark" : "text-brand"
                    }`}
                  >
                    {k.giaMoiBuoi}
                  </span>
                  <span
                    className={`font-mono text-xs ${
                      k.noiBat ? "text-white/75" : "text-muted"
                    }`}
                  >
                    {k.buoi} · {k.coaching}
                  </span>
                </div>

                <ul
                  className={`flex flex-1 flex-col gap-3 border-t pt-6 ${
                    k.noiBat ? "border-white/25" : "border-line"
                  }`}
                >
                  {k.gomCo.map((g) => (
                    <li key={g} className="flex items-start gap-3">
                      <Check
                        weight="bold"
                        aria-hidden
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          k.noiBat ? "text-mark" : "text-brand"
                        }`}
                      />
                      <span
                        className={`text-[0.92rem] leading-snug ${
                          k.noiBat ? "text-white/85" : "text-muted"
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
                  variant={k.noiBat ? "onBrand" : "outline"}
                  className="w-full"
                >
                  <MessengerIcon className="h-4 w-4" />
                  {k.id === "full"
                    ? "Hỏi xem khóa Full có hợp không"
                    : `Hỏi về ${k.ten.replace("Khóa ", "")}`}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        {UU_DAI.moTa && (
          <Reveal>
            <p className="mt-8 flex items-start gap-3 text-sm text-muted">
              <Star weight="fill" aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              {UU_DAI.moTa}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
