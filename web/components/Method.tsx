import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";

const PHAN_KHUC = [
  {
    ma: "TỪ",
    ten: "Từ",
    tom: "Chữ nào dịch, chữ nào bỏ",
    moTa: "Tiếng Việt có những chữ không có bản dịch — dịch đủ chữ là ra thừa chữ. Ngược lại, tiếng Anh bắt buộc có mạo từ và giới từ mà tiếng Việt không cần. Bạn học cách nhận ra cả hai chiều.",
  },
  {
    ma: "CÂU",
    ten: "Câu",
    tom: "Trật tự phải đảo lại",
    moTa: "Câu hỏi lồng trong câu, tính từ đi với “to be”, mệnh đề quan hệ — đây là chỗ dịch thẳng theo tiếng Việt là sai ngay. Bạn học quy trình sắp lại trật tự trước khi nói.",
  },
  {
    ma: "THÌ",
    ten: "Thì",
    tom: "Cái tiếng Việt không có",
    moTa: "Tiếng Việt không chia động từ — “rồi”, “đang”, “sẽ” gánh hết. Tiếng Anh thì bắt buộc. Bạn học cách đọc dấu hiệu thời gian trong câu tiếng Việt rồi chọn đúng thì, không phải học thuộc bảng.",
  },
];

export function Method() {
  return (
    <section id="phuong-phap" className="border-b border-line py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            eyebrow="Cách Bubby dạy"
            title="Ba chỗ tiếng Việt và tiếng Anh lệch nhau."
            lead="Toàn bộ kỹ năng dịch Việt → Anh nằm gọn trong ba phân khúc này. Học hết ba chỗ là bạn dịch được bất kỳ câu nào — không phải nhớ mẫu câu."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PHAN_KHUC.map((p, i) => (
            <Reveal key={p.ma}>
              <article className="group flex h-full flex-col gap-5 rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-brand/40">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs font-medium tracking-[0.18em] text-brand">
                    {p.ma}
                  </span>
                  <span
                    aria-hidden
                    className="font-mono text-xs text-muted/50"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-[1.6rem] text-ink">{p.tom}</h3>

                <p className="text-[0.97rem] leading-relaxed text-muted">
                  {p.moTa}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
