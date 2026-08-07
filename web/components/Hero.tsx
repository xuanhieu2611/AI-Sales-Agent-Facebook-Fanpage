import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { YouTubeLite } from "./YouTubeLite";
import { AssetPlaceholder } from "./AssetPlaceholder";
import {
  ANH,
  BANG_CHUNG_TIKTOK,
  BUBBY,
  CONTACT,
  MESSENGER_URL,
  SHOW_REVIEW_PLACEHOLDERS,
  VIDEO,
} from "@/lib/site";

/**
 * Hero theo format "lời hứa lớn → hai video → bằng chứng TikTok". Với dịch vụ
 * coaching cá nhân, video là bằng chứng sớm nhất: khách thấy Bubby nói và dạy
 * thế nào trước khi phải đọc bất cứ thứ gì bên dưới.
 *
 * Hero này CỐ Ý cao hơn một màn hình. Thứ tự lời hứa → video 1 → Bubby + ảnh
 * TikTok → video 2 là mạch bán hàng của chủ shop, đừng nén lại cho vừa màn
 * hình đầu.
 *
 * Hai video được ĐÁNH SỐ (Bước 1, Bước 2) vì cái số kéo người xem hết video
 * một sang video hai. Nút Messenger không nằm trong hero nữa — StickyCta
 * (điện thoại) và thanh đầu trang lo phần nhắn tin.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 sm:pb-20">
      {/* Hai vệt sáng lệch nhau, không phải một khối đối xứng giữa trang:
          nền có hướng thì cả khối chữ bên trên đỡ bị phẳng. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-44 left-1/2 h-[36rem] w-[58rem] -translate-x-1/2 rounded-full bg-brand-soft/75 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-[8%] h-[22rem] w-[26rem] rounded-full bg-mark-soft/70 blur-[110px]"
      />

      <div className="shell relative flex flex-col items-center pt-10 text-center sm:pt-14">
        {/* Mốc cho StickyCta: sau khi khách đã thấy lời hứa, thanh Messenger
            sẽ xuất hiện trên điện thoại trong lúc họ xem video. */}
        <div id="dau-trang" className="flex max-w-[76rem] flex-col items-center gap-6">
          {/* Ngắt dòng bằng tay để cụm "mất gốc tiếng Anh" luôn nằm trọn một
              dòng. 2.1rem trên điện thoại là cỡ lớn nhất còn vừa một dòng ở
              màn 390px. */}
          <h1 className="max-w-[20ch] text-[2.1rem] leading-[1.22] text-ink sm:text-[3.3rem] lg:text-[3.9rem]">
            Nơi dành riêng cho các bạn <br />
            mất gốc tiếng Anh
          </h1>
        </div>

        <BuocXem so={1}>Vì sao bạn học mãi không hiệu quả?</BuocXem>

        <KhungVideo>
          <YouTubeLite
            id={VIDEO.gioiThieu}
            title="Vì sao bạn học mãi không hiệu quả"
            priority
            hienTieuDe={false}
          />
        </KhungVideo>

        {/* Lối tắt cho người đã bị thuyết phục ngay từ video một. Cố ý để
            dạng link chữ nhỏ chứ không phải nút: nút thứ hai ở đây sẽ tranh
            chỗ với video hai, mà video hai mới là thứ chốt phần lớn khách. */}
        <Link
          href={MESSENGER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 text-sm font-semibold text-brand underline underline-offset-4 decoration-brand/35 transition-colors duration-[160ms] ease [@media(hover:hover)_and_(pointer:fine)]:hover:decoration-brand"
        >
          Thấy đúng chỗ mình đang kẹt rồi? Nhắn Bubby luôn
        </Link>

        <BuocXem so={2}>{CONTACT.pageName} giúp được gì cho bạn?</BuocXem>

        <AiLaBubby />

        {/* Ba ảnh TikTok trước video: kênh → playlist → feedback. Không chữ —
            dải Bubby phía trên đã nói đủ, ảnh chỉ để nhìn thấy là có thật. */}
        <TikTokProof />

        <KhungVideo>
          {SHOW_REVIEW_PLACEHOLDERS ? (
            <AssetPlaceholder
              type="video"
              className="aspect-video rounded-2xl"
              title="Video: English with Bubby giúp được gì cho bạn"
              description="Bubby giải thích khóa học, cách dạy, và lộ trình sẽ giúp học viên như thế nào. Video có phụ đề cháy sẵn."
            />
          ) : (
            <YouTubeLite
              id={VIDEO.giaiPhap}
              title="English with Bubby giúp được gì cho bạn"
              hienTieuDe={false}
            />
          )}
        </KhungVideo>

        <Link
          href="#feedback"
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-[160ms] ease [@media(hover:hover)_and_(pointer:fine)]:hover:text-brand"
        >
          Hoặc kéo xuống xem người học nói gì
          <CaretDown weight="bold" aria-hidden className="h-4 w-4 shrink-0" />
        </Link>
      </div>
    </section>
  );
}

/**
 * Ba ảnh TikTok nhỏ, không tiêu đề — nằm giữa dải Bubby và video Bước 2.
 * Chỉ cần nhìn thấy kênh / playlist / feedback là có thật. Cắt lấy phần đầu
 * (object-top): follower, playlist, bình luận đều nằm ở đó; giữ nguyên tấm
 * dọc thì dải này cao hơn cả video và tranh mất chỗ.
 */
function TikTokProof() {
  return (
    <div
      aria-label="Ảnh chụp kênh TikTok của Bubby"
      className="mt-6 w-full max-w-2xl sm:mt-7"
    >
      <ul className="grid grid-cols-3 gap-3 sm:gap-4">
        {BANG_CHUNG_TIKTOK.map((anh) => (
          <li
            key={anh.src}
            className="overflow-hidden rounded-xl border border-line bg-surface p-1.5 shadow-[0_14px_32px_-26px_rgba(22,35,63,0.75)]"
          >
            <div className="relative aspect-3/4 overflow-hidden rounded-lg">
              <Image
                src={anh.src}
                alt={anh.alt}
                fill
                sizes="(max-width: 639px) 30vw, 220px"
                className="object-cover object-top"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Dải ngắn "Bubby là ai" giữa tiêu đề Bước 2 và video. Khách vừa đọc xong
 * câu hỏi "giúp được gì" thì cần biết người trong video sắp nói là ai — rồi
 * mới xem. Cố ý nhỏ: bằng chứng kênh nằm ở dải TikTok phía dưới, đừng tranh
 * chỗ với video. Ba ảnh TikTok nhỏ đứng ngay dưới dải này, trước video.
 *
 * Vạch dọc mờ phía trên cùng kiểu với BuocXem: nối tiêu đề xuống dải này,
 * rồi xuống ảnh và video, để cả khối Bước 2 đọc thành một mạch.
 */
function AiLaBubby() {
  const daCoAnhThat = !ANH.bubby.endsWith(".svg");
  const chiSo = [
    { so: BUBBY.soFollower, nhan: BUBBY.nhanFollower },
    { so: BUBBY.namDay, nhan: BUBBY.nhanNamDay },
    { so: BUBBY.chungChi, nhan: BUBBY.nhanChungChi },
  ];

  return (
    <aside
      aria-label="Bubby là ai"
      className="mt-6 flex w-full max-w-lg flex-col items-center sm:mt-7"
    >
      <span
        aria-hidden
        className="h-10 w-px bg-linear-to-b from-transparent to-brand/35 sm:h-12"
      />

      <div className="mt-4 flex w-full flex-col items-center gap-4">
        <div className="flex items-center gap-3.5 text-left">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-line bg-brand-soft sm:h-16 sm:w-16">
            {daCoAnhThat ? (
              <Image
                src={ANH.bubby}
                alt={`Ảnh chân dung ${BUBBY.ten}`}
                fill
                sizes="64px"
                className="object-cover object-top"
              />
            ) : (
              <span
                aria-hidden
                className="grid h-full w-full place-items-center font-display text-lg font-extrabold text-brand"
              >
                B
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-display text-[1.15rem] leading-[1.25] font-extrabold tracking-tight text-ink sm:text-[1.25rem]">
              {BUBBY.ten}
            </p>
            <p className="mt-0.5 text-sm text-muted">{BUBBY.vaiTro}</p>
          </div>
        </div>

        <p className="max-w-[36ch] text-center text-[0.92rem] leading-relaxed text-ink-soft">
          {BUBBY.tomTat}
        </p>

        <ul className="flex w-full max-w-md flex-wrap items-stretch justify-center gap-y-3 border-y border-line py-4">
          {chiSo.map((muc, i) => (
            <li
              key={muc.nhan}
              className={`flex min-w-[6.5rem] flex-1 flex-col items-center px-3 ${
                i > 0 ? "border-l border-line" : ""
              }`}
            >
              <span className="font-display text-[1.15rem] leading-none font-extrabold tracking-tight text-ink sm:text-[1.3rem]">
                {muc.so}
              </span>
              <span className="mt-1.5 text-center text-[0.72rem] leading-snug text-muted">
                {muc.nhan}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={BUBBY.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-brand underline underline-offset-4 decoration-brand/35 transition-colors duration-[160ms] ease [@media(hover:hover)_and_(pointer:fine)]:hover:decoration-brand"
        >
          Xem TikTok {BUBBY.taiKhoan}
        </Link>
      </div>
    </aside>
  );
}

/**
 * Mốc "Bước N" trước mỗi video.
 *
 * Trước đây chỗ này là một dòng chữ xanh đậm in đậm Viết Hoa Từng Chữ. Nó
 * hét to ngang câu tiêu đề chính nên cả nửa trên có hai giọng cùng gào, mà
 * lại không chỉ xuống video nào cả.
 *
 * Giờ số nằm trong một chấm tròn, chữ để cỡ vừa màu mực, và có một vạch dọc
 * mờ dần phía trên. Vạch đó làm việc thật: nó nối khối vừa đọc xong xuống
 * video ngay dưới, đúng cái việc mà con số được đặt ra để làm.
 */
function BuocXem({ so, children }: { so: number; children: ReactNode }) {
  return (
    <div className="mt-8 flex flex-col items-center sm:mt-10">
      {/* Vạch dài, bắt đầu từ trong suốt: nó phải đọc ra "nối từ trên xuống",
          không phải "một cái gạch nhỏ lửng lơ". Ngắn quá là thành gạch. */}
      <span
        aria-hidden
        className="h-20 w-px bg-linear-to-b from-transparent to-brand/45 sm:h-24"
      />
      {/* Điện thoại xếp dọc, máy tính xếp ngang. Trên màn hẹp câu nhãn xuống
          hai dòng, mà xếp ngang thì cái chấm số bị canh vào giữa hai dòng đó,
          trôi lửng lơ không dính vào dòng nào. Xếp dọc là hết, và nó nối
          thẳng mạch với cái vạch dọc ngay bên trên. */}
      <span className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:gap-3.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand font-mono text-[0.8rem] font-bold text-white">
          {so}
        </span>
        {/* leading-[1.25] bắt buộc: cụm này hay có dấu chồng hai tầng (hiệu quả). */}
        <span className="font-display text-[1.2rem] leading-[1.3] font-extrabold tracking-tight text-ink sm:text-[1.6rem] sm:leading-[1.25]">
          {children}
        </span>
      </span>
    </div>
  );
}

/**
 * Khung cho video. Bóng đổ ám màu mực (không phải đen thuần) để tấm video
 * nổi khỏi nền giấy xanh — nếu không nó chỉ là một ô chữ nhật dán phẳng.
 */
function KhungVideo({ children }: { children: ReactNode }) {
  return (
    <div className="mt-7 w-full max-w-4xl rounded-2xl shadow-[0_38px_75px_-45px_rgba(22,35,63,0.65)]">
      {children}
    </div>
  );
}
