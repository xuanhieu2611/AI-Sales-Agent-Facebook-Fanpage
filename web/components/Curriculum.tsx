import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";
import { BAI_HOC_QUA_TANG, LO_TRINH } from "@/lib/site";

/**
 * Thanh tỉ lệ 32 buổi. Đây là thông tin thật, không phải trang trí:
 * 18/32 buổi dồn vào kỹ năng dịch — đó chính là điểm khác biệt của giáo án.
 */
export function Curriculum() {
  return (
    <section id="lo-trinh" className="border-y border-line bg-surface py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            title="Thông tin Khóa Học"
          />
        </Reveal>

        {/* thanh tỉ lệ — scaleX từ trái: giải thích tỉ lệ, không chỉ trang trí */}
        <div className="reveal-bar mt-14">
          <div className="flex h-3 w-full gap-1 overflow-hidden rounded-full">
            {LO_TRINH.map((p, i) => (
              <div
                key={p.ten}
                style={{ flexGrow: p.buoi }}
                title={`${p.ten}: ${p.buoi} buổi`}
                className={`rounded-full ${i === 2 ? "bg-brand" : "bg-ink/12"}`}
              />
            ))}
          </div>
        </div>

        <ol className="mt-4">
          {LO_TRINH.map((p, i) => (
            <Reveal key={p.ten}>
              <li className="grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-2 border-b border-line py-7 sm:grid-cols-[3.5rem_minmax(0,15rem)_1fr] sm:gap-x-8">
                <span className="font-mono text-sm text-muted/60">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-col gap-1">
                  <h3 className="text-xl text-ink sm:text-2xl">{p.ten}</h3>
                  <span
                    className={`font-mono text-xs ${
                      i === 2 ? "text-brand" : "text-muted"
                    }`}
                  >
                    {p.buoi} buổi
                  </span>
                </div>

                <p className="col-span-2 max-w-[56ch] text-[0.97rem] leading-relaxed text-muted sm:col-span-1">
                  {p.moTa}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <aside className="mt-14 border-t border-line pt-10 sm:mt-18 sm:grid sm:grid-cols-[minmax(0,18rem)_1fr] sm:gap-x-12 sm:pt-12">
            <div>
              <p className="eyebrow text-brand">Bài học quà tặng</p>
              <h3 className="mt-4 max-w-[14ch] text-2xl leading-[1.25] text-ink sm:text-3xl">
                Học thêm miễn phí cùng Bubby
              </h3>
            </div>

            <div className="mt-6 sm:mt-0">
              <p className="max-w-[60ch] text-[0.97rem] leading-relaxed text-muted">
                EnglishWithBubby còn có những bài học quà tặng chuyên sâu miễn
                phí, giúp cộng đồng vượt qua một số khó khăn chính khi học tiếng Anh.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-5">
                {BAI_HOC_QUA_TANG.map((baiHoc, i) => (
                  <li
                    key={baiHoc}
                    className="flex items-start gap-3 border-t border-line py-4 text-[0.97rem] font-medium leading-snug text-ink"
                  >
                    <span className="font-mono text-xs text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{baiHoc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
