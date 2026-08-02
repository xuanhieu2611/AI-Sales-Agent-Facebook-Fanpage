import { FeedbackWall } from "./FeedbackWall";
import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";
import { YouTubeLite } from "./YouTubeLite";
import { FEEDBACK, FEEDBACK_NOI_BAT, FEEDBACK_VIDEO } from "@/lib/site";

/** Nền xen kẽ để ba câu nổi bật không trông giống hệt nhau. */
const NEN = ["bg-surface", "bg-mark-soft/70", "bg-brand-soft/60"];

/**
 * Bằng chứng xã hội, xếp theo thứ tự dễ tin dần:
 *   1. câu nói đánh máy lại  → đọc được ngay, không phải căng mắt
 *   2. video học viên        → thuyết phục nhất, nhưng phải bấm mới xem
 *   3. ảnh chụp màn hình     → chứng minh mấy câu trên là có thật
 *
 * Hai khối đầu tự ẩn khi chưa có dữ liệu trong `lib/site.ts`.
 */
export function Feedback() {
  return (
    <section id="feedback" className="py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            eyebrow="Học viên nói gì"
            title="Không phải lời quảng cáo. Là tin nhắn học viên gửi."
          />
        </Reveal>

        {FEEDBACK_NOI_BAT.length > 0 && (
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {FEEDBACK_NOI_BAT.map((f, i) => (
              <Reveal key={f.cau}>
                <figure
                  className={`flex h-full flex-col gap-5 rounded-2xl border border-line p-7 ${
                    NEN[i % NEN.length]
                  }`}
                >
                  <blockquote className="font-display text-xl leading-[1.4] font-bold tracking-tight text-ink">
                    “{f.cau}”
                  </blockquote>
                  <figcaption className="mt-auto flex flex-col gap-0.5 text-sm">
                    <span className="font-semibold text-ink">{f.ten}</span>
                    <span className="text-muted">{f.ketQua}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        {FEEDBACK_VIDEO.length > 0 && (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEEDBACK_VIDEO.map((v) => (
              <Reveal key={v.videoId} className="flex flex-col gap-3">
                <YouTubeLite id={v.videoId} title={v.ketQua} />
                <p className="text-sm leading-snug text-muted">{v.ketQua}</p>
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-14 flex flex-col gap-5">
          <p className="text-[0.95rem] text-muted">
            Ảnh chụp từ tin nhắn học viên. Bấm vào ảnh để đọc rõ.
          </p>
          <FeedbackWall anh={FEEDBACK} />
        </div>
      </div>
    </section>
  );
}
