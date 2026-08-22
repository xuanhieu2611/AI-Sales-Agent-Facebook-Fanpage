import { AssetPlaceholder } from "./AssetPlaceholder";
import { FeedbackWall } from "./FeedbackWall";
import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";
import { YouTubeLite } from "./YouTubeLite";
import { FEEDBACK, FEEDBACK_VIDEO } from "@/lib/site";

/**
 * Bằng chứng xã hội, đứng sau bảng giá. Ảnh là tin nhắn học viên thật
 * (Messenger / Zalo), các tấm đè lên nhau một chút rồi trôi chậm trên
 * nền trời. Video học viên (nếu có) đứng trước ảnh vì đó là
 * thứ khó dựng giả nhất.
 */
export function Feedback() {
  const anhThat = FEEDBACK.filter((f) => !f.src.endsWith(".svg"));
  const coFeedbackThat = FEEDBACK_VIDEO.length > 0 || anhThat.length > 0;

  return (
    <section id="feedback" className="py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            title="Cảm Nhận Của Học Viên"
            lead="Tin nhắn thật trên Messenger và Zalo, sau khi học xong."
          />
        </Reveal>
      </div>

      {coFeedbackThat ? (
        <>
          {FEEDBACK_VIDEO.length > 0 && (
            <div className="shell">
              <div
                className={`mt-14 grid gap-5 ${
                  FEEDBACK_VIDEO.length === 1
                    ? "max-w-3xl"
                    : "sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {FEEDBACK_VIDEO.map((v) => (
                  <Reveal key={v.videoId} className="flex flex-col gap-3">
                    <YouTubeLite id={v.videoId} title={v.ketQua} />
                    <p className="text-sm leading-snug text-muted">{v.ketQua}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {anhThat.length > 0 && (
            <div className={FEEDBACK_VIDEO.length > 0 ? "mt-12" : "mt-14 sm:mt-16"}>
              <FeedbackWall anh={anhThat} />
            </div>
          )}
        </>
      ) : (
        <div className="shell">
          <div className="mt-14">
            <Reveal>
              <AssetPlaceholder
                type="chat"
                className="aspect-[9/16] max-w-sm rounded-2xl"
                title="Ảnh chụp tin nhắn học viên, đọc rõ trên điện thoại"
                description="Bỏ screenshot Messenger/Zalo vào web/feedback rồi trang sẽ tự nhận."
              />
            </Reveal>
          </div>
        </div>
      )}
    </section>
  );
}
