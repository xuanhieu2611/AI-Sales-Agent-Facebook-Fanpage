import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { AssetPlaceholder } from "./AssetPlaceholder";
import { Reveal } from "./Reveal";
import { ANH, KENH, KENH_URL } from "@/lib/site";

export function About() {
  return (
    <section id="ve-bubby" className="border-y border-line bg-surface py-24 sm:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <Reveal>
            <figure className="flex flex-col gap-3">
              <AssetPlaceholder
                className="aspect-[4/5] w-full rounded-2xl"
                title="Chân dung Bubby"
                description="Ảnh dọc 4:5, nhìn thẳng hoặc đang dạy; nền gọn, ánh sáng ban ngày, mặc như khi đứng lớp. Đây là ảnh để khách biết người trực tiếp coaching là ai."
                src={ANH.bubby}
                alt="Bubby, giảng viên của English with Bubby"
              />
              <figcaption className="font-mono text-xs text-muted">
                Bubby, giảng viên và người trực tiếp coaching
              </figcaption>
            </figure>
          </Reveal>

          <Reveal>
            <div className="flex flex-col gap-7">
              <h2 className="max-w-[18ch] text-[2.1rem] leading-[1.22] text-ink sm:text-5xl">
                10 năm để viết ra một giáo án không đi mượn.
              </h2>

              <p className="max-w-[54ch] text-[1.05rem] leading-relaxed text-muted">
                Bubby dạy tiếng Anh 10 năm, chuyên xây gốc và giao tiếp thực
                chiến, đạt{" "}
                <strong className="font-semibold text-ink">
                  C1 kỳ thi VSTEP, trung bình 8.5 cả 4 kỹ năng
                </strong>
                . Cả 10 năm đó dùng để viết một giáo án riêng cho người mất
                gốc, thay vì dạy rời rạc từng mảng như chương trình thường.
              </p>

              <blockquote className="border-l-2 border-brand pl-6">
                <p className="font-display text-xl leading-[1.35] font-bold tracking-tight text-ink sm:text-2xl">
                  “Người mất gốc không thiếu kiến thức. Họ thiếu câu trả lời cho
                  những chữ ‘vì sao’ mà không ai chịu giải thích tới nơi.”
                </p>
              </blockquote>
            </div>
          </Reveal>
        </div>

        {/* Bằng chứng khách tự đi kiểm chứng được. Mọi thứ phía trên trang này
            là bên mình tự nói về mình; khối này chỉ vào một đống nội dung công
            khai đã nằm sẵn ngoài kia từ nhiều năm. Với khách lạ, đây là chỗ
            chuyển từ "nghe hay đấy" sang "ừ, có thật". */}
        <Reveal>
          <div className="mt-16 rounded-2xl border border-line bg-paper-2/60 p-7 sm:p-10">
            <div className="flex flex-col gap-3 border-b border-line pb-7 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <div className="flex max-w-[44ch] flex-col gap-2">
                <h3 className="text-[1.5rem] leading-[1.28] text-ink sm:text-[1.8rem]">
                  {KENH.soNoiDung} nội dung miễn phí, đăng công khai.
                </h3>
                <p className="text-[0.97rem] leading-relaxed text-muted">
                  Không cần tin lời bên mình. Mở kênh ra xem thử vài video rồi
                  hẵng quyết định có nên nhắn tin hay không.
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-1">
                <span className="font-display text-3xl font-extrabold tracking-tight text-ink">
                  {KENH.soFollower}
                </span>
                <span className="text-sm text-muted">người theo dõi</span>
              </div>
            </div>

            <div className="mt-7 grid gap-8 sm:grid-cols-2 sm:gap-12">
              <div className="flex flex-col gap-3">
                <span className="eyebrow text-muted/70">Danh sách phát</span>
                <ul className="flex flex-wrap gap-2">
                  {KENH.danhSachPhat.map((d) => (
                    <li
                      key={d}
                      className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink-soft"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <span className="eyebrow text-brand">Bài học quà tặng, miễn phí</span>
                <ul className="flex flex-col gap-1.5">
                  {KENH.quaTang.map((q) => (
                    <li key={q} className="text-[0.95rem] leading-snug text-ink-soft">
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Link chỉ hiện khi đã điền KENH_URL — link rỗng còn tệ hơn không có link */}
            {KENH_URL && (
              <Link
                href={KENH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-brand underline-offset-4 hover:underline"
              >
                Xem kênh English with Bubby
                <ArrowUpRight weight="bold" aria-hidden className="h-4 w-4" />
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
