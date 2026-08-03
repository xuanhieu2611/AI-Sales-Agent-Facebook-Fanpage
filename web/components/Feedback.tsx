import { AssetPlaceholder } from "./AssetPlaceholder";
import { FeedbackWall } from "./FeedbackWall";
import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";
import { YouTubeLite } from "./YouTubeLite";
import { FEEDBACK, FEEDBACK_NOI_BAT, FEEDBACK_VIDEO } from "@/lib/site";

const NEN = ["bg-surface", "bg-mark-soft/70", "bg-brand-soft/60"];

/**
 * Bằng chứng xã hội đứng ngay dưới lời hứa đầu trang. Khi chưa gắn asset thật,
 * bản duyệt vẫn cho thấy đúng loại bằng chứng cần dùng, thay vì giả ảnh feedback.
 */
export function Feedback() {
  const coFeedbackThat =
    FEEDBACK_NOI_BAT.length > 0 ||
    FEEDBACK_VIDEO.length > 0 ||
    FEEDBACK.some((f) => !f.src.endsWith(".svg"));

  return (
    <section id="feedback" className="bg-paper-2/45 py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            eyebrow="Học viên nói gì"
            title="Kết quả thật cần được thấy trước khi khách đọc tiếp."
            lead="Ba mẩu feedback ngắn, có thật, đọc được ngay trên điện thoại thuyết phục hơn một tường ảnh nhỏ không ai kịp xem."
          />
        </Reveal>

        {coFeedbackThat ? (
          <>
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

            {FEEDBACK.some((f) => !f.src.endsWith(".svg")) && (
              <div className="mt-14 flex flex-col gap-5">
                <p className="text-[0.95rem] text-muted">
                  Ảnh chụp từ tin nhắn học viên. Bấm vào ảnh để đọc rõ.
                </p>
                <FeedbackWall anh={FEEDBACK.filter((f) => !f.src.endsWith(".svg"))} />
              </div>
            )}
          </>
        ) : (
          <div className="mt-14 grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
            <Reveal>
              <AssetPlaceholder
                type="chat"
                className="aspect-[16/10] rounded-2xl"
                title="3 ảnh chụp feedback thật, đọc rõ trên điện thoại"
                description="Chọn 3 tin nhắn có một kết quả cụ thể: nói với khách nước ngoài, hiểu thì, tự đặt câu… Che avatar/tên nếu chưa xin phép. Crop dọc hoặc vuông, chữ kết quả nằm nửa trên ảnh."
              />
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <Reveal>
                <article className="flex h-full flex-col justify-between rounded-2xl bg-surface p-7 shadow-[0_18px_45px_-36px_rgba(22,35,63,0.65)]">
                  <span className="eyebrow text-brand">CÂU FEEDBACK THẬT 01</span>
                  <p className="mt-8 font-display text-xl leading-[1.35] font-bold tracking-tight text-ink">
                    “Trích nguyên văn một câu ngắn nói rõ thay đổi học viên đã đạt được.”
                  </p>
                  <p className="mt-7 text-sm text-muted">Tên viết tắt · học khóa nào · sau bao lâu</p>
                </article>
              </Reveal>
              <Reveal>
                <article className="flex h-full flex-col justify-between rounded-2xl border border-brand/20 bg-brand p-7 text-white shadow-[0_18px_45px_-36px_rgba(22,35,63,0.65)]">
                  <span className="eyebrow text-white/65">VIDEO FEEDBACK (NẾU CÓ)</span>
                  <p className="mt-8 font-display text-xl leading-[1.35] font-bold tracking-tight">
                    Học viên tự nói 30–60 giây: trước đây kẹt gì, sau đó dùng được vào đâu.
                  </p>
                  <p className="mt-7 text-sm text-white/70">Đặt thumbnail thật ở đây, phụ đề cháy sẵn.</p>
                </article>
              </Reveal>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
