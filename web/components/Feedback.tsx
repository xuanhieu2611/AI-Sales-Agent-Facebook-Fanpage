import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";
import { FEEDBACK } from "@/lib/site";

export function Feedback() {
  return (
    <section id="feedback" className="border-b border-line py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            eyebrow="Học viên nói gì"
            title="Không phải lời quảng cáo. Là tin nhắn học viên gửi."
            lead="Ảnh chụp trực tiếp từ tin nhắn và bài đăng trên Fanpage."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {FEEDBACK.map((f) => (
            <Reveal key={f.src}>
              <figure className="relative aspect-3/4 w-full overflow-hidden rounded-xl border border-line bg-surface">
                <Image
                  src={f.src}
                  alt={f.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
                  className="object-cover object-top"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
