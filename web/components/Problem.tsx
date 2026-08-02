import { Reveal } from "./Reveal";
import { TranslateDemo } from "./TranslateDemo";
import { Mark, SectionHead } from "./ui";

/**
 * Bốn câu này là lời khách tự nói với chính mình. Để nguyên giọng nói
 * đó, đừng viết lại thành gạch đầu dòng marketing — khách phải đọc và
 * thấy đúng mình trong đó thì mới đọc tiếp.
 *
 * Bốn câu là đủ. Trước đây để sáu, nhưng câu thứ năm trở đi không thêm
 * được gì mà chỉ làm khối chữ dài ra.
 */
const TRIEU_CHUNG = [
  "Đọc thì hiểu hết, tới lúc mở miệng là đứng hình.",
  "Nghĩ câu tiếng Việt rồi mới dịch, dịch xong người ta đi mất rồi.",
  "Học đi học lại 12 thì, vẫn không biết lúc nào dùng thì nào.",
  "Cày app cả năm, vẫn đứng y chỗ cũ.",
];

/**
 * Khối "soi gương" — trước đây tách làm hai mục riêng: mấy câu triệu
 * chứng ở một chỗ, khối dịch thử ở đầu trang. Gộp lại vì chúng nói
 * đúng một điều: đây là chỗ bạn đang kẹt, và đây là nó trông ra sao.
 */
export function Problem() {
  return (
    <section className="border-y border-line bg-surface py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            title="Vấn đề không nằm ở chỗ bạn học ít."
            lead="Hầu hết học viên tìm tới Bubby đều đã học nhiều rồi. Cái thiếu là người chỉ ra chỗ hai ngôn ngữ lệch nhau."
          />
        </Reveal>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="flex flex-col gap-8">
            <ul className="flex flex-col gap-3">
              {TRIEU_CHUNG.map((t) => (
                <Reveal key={t}>
                  <li className="rounded-2xl border border-line bg-paper/70 p-5 text-[1.02rem] leading-relaxed text-ink-soft">
                    “{t}”
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal>
              {/* text-balance: không có nó thì chữ "ngôn ngữ" bị bỏ lại
                  một mình ở dòng cuối, kéo theo cả vệt bút vàng */}
              <p className="max-w-[26ch] text-balance font-display text-2xl leading-[1.35] font-extrabold tracking-tight text-ink sm:text-[1.9rem]">
                Không phải bạn lười. Là chưa ai dạy bạn cách{" "}
                <Mark>bắc cầu giữa hai ngôn ngữ</Mark>.
              </p>
            </Reveal>
          </div>

          {/* chứng minh ngay, không cần bấm, không cần tải gì */}
          <TranslateDemo />
        </div>
      </div>
    </section>
  );
}
