import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";
import { FAQ } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="border-b border-line py-24 sm:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
          <Reveal>
            <SectionHead
              eyebrow="Hỏi & đáp"
              title="Những câu hay được hỏi nhất."
            />
          </Reveal>

          <div className="flex flex-col">
            {FAQ.map((f) => (
              <Reveal key={f.hoi}>
                <details className="group border-t border-line last:border-b">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
                      {f.hoi}
                    </span>
                    <span
                      aria-hidden
                      className="relative mt-1.5 grid h-5 w-5 shrink-0 place-items-center"
                    >
                      <span className="absolute h-0.5 w-3.5 rounded-full bg-brand" />
                      <span className="absolute h-3.5 w-0.5 rounded-full bg-brand transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <p className="max-w-[62ch] pb-6 text-[0.98rem] leading-relaxed text-muted">
                    {f.dap}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
