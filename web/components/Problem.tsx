import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";

const TRIEU_CHUNG = [
  "Đọc thì hiểu hết, tới lúc mở miệng là đứng hình.",
  "Nghĩ câu tiếng Việt trong đầu rồi mới dịch — dịch xong người ta đi mất rồi.",
  "Học đi học lại 12 thì, vẫn không biết lúc nào thì dùng thì nào.",
  "Biết đúng từ đó, nhưng phát âm ra không ai hiểu.",
  "Cày app, xem video miễn phí cả năm — vẫn đứng y chỗ cũ.",
  "Học ở trường bảy năm mà không tự đặt nổi một câu cho ra hồn.",
];

export function Problem() {
  return (
    <section className="border-b border-line py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            eyebrow="Nghe quen không"
            title="Vấn đề không nằm ở chỗ bạn học ít."
            lead="Hầu hết học viên tìm tới Bubby đều đã học nhiều rồi. Cái thiếu là một người chỉ ra chỗ hai ngôn ngữ lệch nhau — và dạy cách xử lý đúng chỗ đó."
          />
        </Reveal>

        <ul className="mt-14 grid gap-x-10 gap-y-px sm:grid-cols-2">
          {TRIEU_CHUNG.map((t) => (
            <Reveal key={t}>
              <li className="flex items-start gap-4 border-t border-line py-5">
                <span
                  aria-hidden
                  className="mt-1.5 font-mono text-xs font-medium text-flag"
                >
                  ✕
                </span>
                <span className="text-[1.05rem] leading-relaxed text-ink/85">
                  {t}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="mt-14 max-w-[44ch] font-display text-2xl leading-[1.3] font-extrabold tracking-tight text-ink sm:text-3xl">
            Không phải bạn lười. Là chưa ai dạy bạn cách bắc cầu giữa hai
            ngôn ngữ.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
