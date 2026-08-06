import { AssetPlaceholder } from "./AssetPlaceholder";
import { FeedbackWall } from "./FeedbackWall";
import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";
import { YouTubeLite } from "./YouTubeLite";
import { FEEDBACK, FEEDBACK_NOI_BAT, FEEDBACK_VIDEO } from "@/lib/site";

/**
 * Bằng chứng xã hội, đứng ngay sau dải kênh công khai. Khi chưa gắn asset
 * thật, bản duyệt vẫn cho thấy đúng loại bằng chứng cần dùng, thay vì giả
 * ảnh feedback.
 *
 * TIÊU ĐỀ PHẢI KHỚP VỚI BẰNG CHỨNG THẬT SỰ CÓ. Bản trước đề "Người học xong
 * nói" và mở bài "nghe học viên tự kể trước" — nhưng bên dưới không có một
 * video học viên nào, cũng không có câu nào của người đã học xong khóa, chỉ
 * có bình luận của người xem video miễn phí. Hứa to hơn thứ đưa ra là kiểu
 * mất uy tín tệ nhất, vì khách phát hiện ra ngay trong ba giây.
 *
 * Nên tiêu đề giờ nói đúng cái đang có (người XEM nói), và phần mở bài biến
 * chính chỗ đó thành lợi thế: mới chỉ là đồ miễn phí mà người ta đã nói vậy.
 * Có video học viên thật rồi thì đổi lại thành "người học xong nói" — lúc đó
 * câu ấy mới đúng.
 *
 * Video học viên (nếu có) vẫn đứng TRƯỚC tường ảnh: video là thứ khó dựng
 * nhất nên cũng đáng tin nhất. Đừng đẩy nó xuống dưới.
 */
export function Feedback() {
  // `.svg` = ảnh giữ chỗ còn sót lại, không đưa cho khách xem.
  const anhThat = FEEDBACK.filter((f) => !f.src.endsWith(".svg"));
  const coFeedbackThat =
    FEEDBACK_NOI_BAT.length > 0 || FEEDBACK_VIDEO.length > 0 || anhThat.length > 0;

  return (
    <section id="feedback" className="bg-paper-2/45 py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            title="Cảm nhận của học viên tại EnglishwithBubby"
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

          {/* Tấm ghim + dải cuộn. `FeedbackWall` tự bọc `shell` cho từng phần
              vì dải cuộn CỐ Ý tràn ra ngoài lề — xem FeedbackWall.tsx. */}
          {(anhThat.length > 0 || FEEDBACK_NOI_BAT.length > 0) && (
            <div className={FEEDBACK_VIDEO.length > 0 ? "mt-12" : "mt-14 sm:mt-16"}>
              <FeedbackWall anh={anhThat} cau={FEEDBACK_NOI_BAT} />
            </div>
          )}
        </>
      ) : (
        <div className="shell">
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
                    Học viên tự nói 30 tới 60 giây: trước đây kẹt gì, sau đó dùng được vào đâu.
                  </p>
                  <p className="mt-7 text-sm text-white/70">Đặt thumbnail thật ở đây, phụ đề cháy sẵn.</p>
                </article>
              </Reveal>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
