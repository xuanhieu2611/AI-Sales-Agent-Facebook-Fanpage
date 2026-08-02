import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";
import { VI_DU, type ViDu } from "@/lib/translations";

const PHAN_KHUC = [
  {
    ma: "TỪ" as const,
    tom: "Chữ nào dịch, chữ nào bỏ",
    moTa: "Tiếng Việt có chữ không dịch được, dịch đủ là ra thừa. Ngược lại, tiếng Anh bắt buộc mạo từ và giới từ. Bạn học cách nhận ra cả hai chiều.",
    /** ô rộng, nằm một mình hàng trên */
    rong: true,
    nen: "bg-surface",
  },
  {
    ma: "CÂU" as const,
    tom: "Trật tự phải đảo lại",
    moTa: "Câu hỏi lồng trong câu, tính từ đi với “to be”, mệnh đề quan hệ. Dịch thẳng theo tiếng Việt là sai ngay.",
    rong: false,
    nen: "bg-brand-soft/60",
  },
  {
    ma: "THÌ" as const,
    tom: "Cái tiếng Việt không có",
    moTa: "Tiếng Việt không chia động từ, mấy chữ “rồi”, “đang”, “sẽ” gánh hết. Bạn học cách đọc dấu hiệu thời gian rồi chọn thì, không học thuộc bảng.",
    rong: false,
    nen: "bg-mark-soft/70",
  },
];

/** Lấy đúng một ví dụ thật cho mỗi phân khúc, không bịa thêm câu mới. */
function viDuCua(ma: ViDu["loai"]) {
  return VI_DU.find((v) => v.loai === ma);
}

/**
 * Ghép các token lại thành câu. Phải bỏ khoảng trắng trước dấu câu, không
 * thì ra "how much money ?" — nhìn như lỗi chính tả chứ không phải như một
 * câu dịch sai có chủ đích.
 */
function ghepCau(literal: ViDu["literal"]) {
  return literal
    .map((t) => t.t)
    .join(" ")
    .replace(/\s+([.,?!])/g, "$1");
}

export function Method() {
  return (
    <section id="phuong-phap" className="py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            title="Ba chỗ tiếng Việt và tiếng Anh lệch nhau."
            lead="Học hết ba chỗ này là bạn dịch được bất kỳ câu nào, không phải nhớ mẫu câu."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {PHAN_KHUC.map((p) => {
            const vd = viDuCua(p.ma);
            return (
              <Reveal key={p.ma} className={p.rong ? "md:col-span-2" : ""}>
                <article
                  className={`flex h-full flex-col gap-5 rounded-2xl border border-line p-7 ${p.nen} ${
                    p.rong ? "md:flex-row md:items-start md:gap-10" : ""
                  }`}
                >
                  <div className={`flex flex-col gap-4 ${p.rong ? "md:flex-1" : ""}`}>
                    <span className="font-mono text-xs font-medium tracking-[0.18em] text-brand">
                      {p.ma}
                    </span>
                    <h3 className="text-[1.6rem] text-ink">{p.tom}</h3>
                    <p className="max-w-[46ch] text-[0.97rem] leading-relaxed text-muted">
                      {p.moTa}
                    </p>
                  </div>

                  {/* ví dụ thật, để khách thấy ngay chứ không chỉ nghe tả */}
                  {vd && (
                    <div
                      className={`flex flex-col gap-3 rounded-xl border border-line/80 bg-surface/80 p-4 ${
                        p.rong ? "md:w-[22rem] md:shrink-0" : ""
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="eyebrow text-muted/70">Dịch từng chữ</span>
                        <p className="font-mono text-sm leading-relaxed text-flag">
                          {ghepCau(vd.literal)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="eyebrow text-brand">Thực ra là</span>
                        <p className="font-mono text-sm leading-relaxed text-ink">
                          {vd.dung}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
