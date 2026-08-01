import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";
import { LO_TRINH, TONG_BUOI } from "@/lib/site";

/**
 * Thanh tỉ lệ 32 buổi. Đây là thông tin thật, không phải trang trí:
 * 18/32 buổi dồn vào kỹ năng dịch — đó chính là điểm khác biệt của giáo án.
 */
export function Curriculum() {
  return (
    <section id="lo-trinh" className="border-b border-line py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            eyebrow={`Lộ trình ${TONG_BUOI} buổi`}
            title="Bốn phần, và một phần chiếm hơn nửa lộ trình."
            lead="Giáo án do Bubby tự nghiên cứu và thiết kế trong 10 năm. Tỉ lệ dưới đây là cố ý: kỹ năng dịch Việt → Anh mới là chỗ quyết định bạn có nói được hay không."
          />
        </Reveal>

        {/* thanh tỉ lệ */}
        <Reveal>
          <div className="mt-14 flex h-3 w-full gap-1 overflow-hidden rounded-full">
            {LO_TRINH.map((p, i) => (
              <div
                key={p.ten}
                style={{ flexGrow: p.buoi }}
                title={`${p.ten} — ${p.buoi} buổi`}
                className={`rounded-full ${
                  i === 2 ? "bg-brand" : "bg-ink/15"
                }`}
              />
            ))}
          </div>
        </Reveal>

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
      </div>
    </section>
  );
}
