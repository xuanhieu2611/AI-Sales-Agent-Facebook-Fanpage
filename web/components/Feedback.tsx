import { AssetPlaceholder } from "./AssetPlaceholder";
import { FeedbackCta, FeedbackWall } from "./FeedbackWall";
import { FeedbackVideoWall } from "./FeedbackVideoWall";
import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";
import { FEEDBACK, FEEDBACK_VIDEO } from "@/lib/site";

/**
 * Bằng chứng xã hội, đứng sau bảng giá.
 *
 * Ảnh tin nhắn đi TRƯỚC video, dù video khó dựng giả hơn. Tường ảnh đọc được
 * ngay lúc lướt, không phải bấm gì; sức thuyết phục của nó nằm ở chỗ NHIỀU.
 * Hàng video thì phải bấm mới có nội dung, mà khách vào từ quảng cáo đa số
 * đang dùng 4G. Đặt một hàng thumbnail chưa bấm lên đầu mục là đem chỗ đẹp
 * nhất đổi lấy một khoảng khách lướt qua. Để tường ảnh kéo khách vào, rồi
 * video làm lớp bằng chứng sâu hơn cho người đã chịu dừng lại.
 */
export function Feedback() {
  const anhThat = FEEDBACK.filter((f) => !f.src.endsWith(".svg"));
  const coVideo = FEEDBACK_VIDEO.length > 0;
  const coFeedbackThat = coVideo || anhThat.length > 0;

  return (
    <section id="feedback" className="py-16 sm:py-24">
      <div className="shell">
        <Reveal>
          <SectionHead
            title="Cảm Nhận Của Học Viên"
            lead={
              coVideo
                ? "Tin nhắn thật trên Messenger và Zalo, và học viên tự kể sau khi học xong."
                : "Tin nhắn thật trên Messenger và Zalo, sau khi học xong."
            }
          />
        </Reveal>
      </div>

      {coFeedbackThat ? (
        <>
          {anhThat.length > 0 && (
            <div className="mt-14 sm:mt-16">
              <FeedbackWall anh={anhThat} />
            </div>
          )}

          {coVideo && (
            // Hai dải dính liền nhau, không có tiêu đề phụ chen giữa: mỗi
            // dải đã tự chừa 3-4rem trên dưới cho phần nghiêng và bóng đổ,
            // cộng thêm khoảng cách nữa là hở ra một mảng trời trống giữa
            // mục. Kéo lên một chút cho hai dải đọc như một khối.
            <div
              className={
                anhThat.length > 0 ? "-mt-6 sm:-mt-8" : "mt-10 sm:mt-12"
              }
            >
              <FeedbackVideoWall video={FEEDBACK_VIDEO} />
            </div>
          )}

          <div className="shell mt-10 sm:mt-12">
            <FeedbackCta />
          </div>
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
