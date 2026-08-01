import Image from "next/image";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./ui";
import { ANH } from "@/lib/site";

export function About() {
  return (
    <section id="ve-bubby" className="border-b border-line py-24 sm:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <Reveal>
            <figure className="flex flex-col gap-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-brand-soft">
                <Image
                  src={ANH.bubby}
                  alt="Bubby, giảng viên của English with Bubby"
                  fill
                  sizes="(max-width: 1024px) 100vw, 352px"
                  className="object-cover"
                />
              </div>
              <figcaption className="font-mono text-xs text-muted">
                Bubby · giảng viên & người trực tiếp coaching
              </figcaption>
            </figure>
          </Reveal>

          <Reveal>
            <div className="flex flex-col gap-7">
              <Eyebrow>Người dạy bạn</Eyebrow>

              <h2 className="max-w-[18ch] text-[2.1rem] leading-[1.22] text-ink sm:text-5xl">
                10 năm để viết ra một giáo án không đi mượn.
              </h2>

              <div className="flex flex-col gap-5 text-[1.05rem] leading-relaxed text-muted">
                <p>
                  Bubby dạy tiếng Anh 10 năm, chuyên xây gốc và giao tiếp thực
                  chiến, đạt trình độ{" "}
                  <strong className="font-semibold text-ink">
                    C1 kỳ thi VSTEP với điểm trung bình 8.5 cả 4 kỹ năng
                  </strong>
                  .
                </p>
                <p>
                  Suốt 10 năm đó, Bubby tập trung nghiên cứu và thiết kế một
                  giáo án riêng cho người mất gốc: đi trực diện vào các kiến
                  thức nền tảng cốt lõi, rồi liên kết chúng lại thành kỹ năng
                  nói — thay vì dạy rời rạc từng mảng như chương trình thông
                  thường.
                </p>
              </div>

              <blockquote className="border-l-2 border-brand pl-6">
                <p className="font-display text-xl leading-[1.35] font-bold tracking-tight text-ink sm:text-2xl">
                  “Người mất gốc không thiếu kiến thức. Họ thiếu câu trả lời cho
                  những chữ ‘vì sao’ mà không ai chịu giải thích tới nơi.”
                </p>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
