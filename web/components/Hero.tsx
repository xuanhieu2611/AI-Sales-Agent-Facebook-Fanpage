import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { YouTubeLite } from "./YouTubeLite";
import { AssetPlaceholder } from "./AssetPlaceholder";
import { TikTokGallery } from "./TikTokGallery";
import {
  ANH,
  BANG_CHUNG_TIKTOK,
  BUBBY,
  SHOW_REVIEW_PLACEHOLDERS,
  VIDEO,
} from "@/lib/site";

/**
 * Hero theo format "lời hứa lớn → video vấn đề → một tấm kính câu trả lời".
 * Với dịch vụ coaching cá nhân, video là bằng chứng sớm nhất: khách thấy
 * Bubby nói và dạy thế nào trước khi phải đọc bất cứ thứ gì bên dưới.
 *
 * Hero này CỐ Ý cao hơn một màn hình. Thứ tự lời hứa → video 1 → tấm kính
 * (Bubby + TikTok + hai video giải pháp cạnh nhau) là mạch bán hàng của
 * chủ shop, đừng nén lại cho vừa màn hình đầu.
 *
 * Video vấn đề đứng một mình trên trời. Hai video còn lại nằm chung một
 * tấm kính để đọc bio và xem cặp giải pháp / mô hình cùng lúc —
 * không xếp dọc thành Bước 2 rồi Bước 3. Nút Messenger không nằm trong
 * hero nữa — StickyCta (điện thoại) và thanh đầu trang lo phần nhắn tin.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 sm:pb-20">
      <div className="header-clear shell relative flex flex-col items-center text-center">
        {/* Mốc cho StickyCta: sau khi khách đã thấy lời hứa, thanh Messenger
            sẽ xuất hiện trên điện thoại trong lúc họ xem video. */}
        <div id="dau-trang" className="flex max-w-[76rem] flex-col items-center gap-6">
          {/* Hai dòng là hai <span> khối, không phải <br>: cụm "Mất Gốc Tiếng
              Anh" phải đứng riêng một dòng để hai cụm sao ôm đúng hai đầu.
              `whitespace-nowrap` giữ cụm từ không xuống dòng ở màn hẹp; dòng
              trên vẫn được tự xuống dòng để cỡ chữ điện thoại không bị bóp. */}
          <h1 className="max-w-[24ch] text-[2.5rem] leading-[1.22] text-brand drop-shadow-[0_1px_1px_rgb(255_255_255_/_0.45)] sm:text-[4rem] lg:text-[4.75rem]">
            <span className="block">Nơi Dành Riêng Cho Các Bạn</span>
            <span className="relative inline-block whitespace-nowrap">
              <CumSaoVang className="right-[calc(100%+0.04em)]" />
              Mất Gốc Tiếng Anh
              <CumSaoVang className="left-[calc(100%+0.04em)] -scale-x-100" />
            </span>
          </h1>
        </div>

        <BuocXem so={1}>Vì Sao Học Mãi Vẫn Không Áp Dụng Được?</BuocXem>

        <KhungVideo>
          <YouTubeLite
            id={VIDEO.gioiThieu}
            title="Vì sao học mãi vẫn không áp dụng được"
            priority
            hienTieuDe={false}
          />
        </KhungVideo>

        <TamKinhTraLoi />

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

/** Ba ngôi sao vàng nằm ngang. Cụm bên phải được lật ngang để hai phía
 * hướng vào tiêu đề thay vì trông như hai bản sao dán lại. */
function CumSaoVang({ className }: { className: string }) {
  const ngoiSao =
    "M0-10 2.35-3.24 9.51-3.09 3.8 1.24 5.88 8.09 0 4-5.88 8.09-3.8 1.24-9.51-3.09-2.35-3.24Z";

  return (
    <svg
      viewBox="0 0 59 28"
      aria-hidden="true"
      className={`pointer-events-none absolute top-1/2 h-[0.45em] w-[0.9em] -translate-y-1/2 overflow-visible text-mark drop-shadow-[0_1px_0_rgb(255_255_255_/_0.7)] ${className}`}
    >
      <path fill="currentColor" d={ngoiSao} transform="translate(9 14) scale(.65) rotate(-10)" />
      <path fill="currentColor" d={ngoiSao} transform="translate(29 14) rotate(5)" />
      <path fill="currentColor" d={ngoiSao} transform="translate(50 14) scale(.75) rotate(-7)" />
    </svg>
  );
}

/**
 * Tấm kính cho cả chương trả lời: Bubby là ai, kênh có thật, rồi hai video
 * giải pháp nằm cạnh nhau. Trước đây là một tấm giấy trắng đục — nó che mất
 * đúng thứ làm trang này khác người ta, là bầu trời thật phía sau. Giờ nó là
 * kính: đậm ở nửa trên (chỗ có bio để đọc), loãng dần xuống dưới (chỗ chỉ
 * còn video, vốn đã đục sẵn). Đừng loãng hơn nữa — xem .glass-panel. Điện thoại xếp dọc (giải pháp rồi mô hình); máy tính
 * xếp ngang để khỏi phải xem hết video này mới thấy video kia.
 */
function TamKinhTraLoi() {
  return (
    <div className="mt-8 flex w-full max-w-6xl flex-col items-center sm:mt-10">
      <span
        aria-hidden
        className="h-20 w-px bg-linear-to-b from-transparent to-brand/45 sm:h-24"
      />

      <article
        aria-label="English with Bubby giúp được gì cho bạn"
        className="glass-panel mt-4 w-full rounded-2xl border border-white/60 bg-linear-to-b from-white/78 to-white/55 px-5 py-8 backdrop-blur-xl backdrop-saturate-150 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
      >
        <AiLaBubby />
        <TikTokProof />

        <div className="mt-8 grid w-full gap-10 lg:mt-10 lg:grid-cols-2 lg:gap-8">
          <VideoCot so={2} tieuDe="English With Bubby Có Thể Giúp Gì Cho Bạn?">
            {SHOW_REVIEW_PLACEHOLDERS ? (
              <AssetPlaceholder
                type="video"
                className="aspect-video rounded-2xl"
                title="Video: English With Bubby có thể giúp gì cho bạn?"
                description="Bubby giải thích khóa học, cách dạy, và lộ trình sẽ giúp học viên như thế nào. Video có phụ đề cháy sẵn."
              />
            ) : (
              <YouTubeLite
                id={VIDEO.giaiPhap}
                title="English With Bubby có thể giúp gì cho bạn"
                hienTieuDe={false}
                sizes="(max-width: 1023px) 92vw, 36rem"
              />
            )}
          </VideoCot>

          <VideoCot so={3} tieuDe="Mô Hình Coaching 1-1">
            <YouTubeLite
              id={VIDEO.moHinhCoaching}
              title="Mô hình coaching 1-1"
              hienTieuDe={false}
              sizes="(max-width: 1023px) 92vw, 36rem"
            />
          </VideoCot>
        </div>
      </article>
    </div>
  );
}

function VideoCot({
  so,
  tieuDe,
  children,
}: {
  so: number;
  tieuDe: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-col items-center gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand font-subtitle text-[0.8rem] font-bold text-white">
          {so}
        </span>
        {/* leading ≥ 1.25: cụm này hay có dấu chồng hai tầng (hiệu quả). */}
        <h2 className="font-subtitle text-[1.15rem] leading-[1.3] font-bold tracking-normal text-ink sm:text-[1.35rem] sm:leading-[1.25]">
          <span className="title-band">{tieuDe}</span>
        </h2>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

/**
 * Ảnh kênh TikTok luôn mở đầu. Các ảnh bình luận nằm thành dải chọn bên
 * phải để khách tò mò có thể xem thêm mà không kéo dài luồng chính.
 */
function TikTokProof() {
  return (
    <div
      aria-label="Ảnh chụp kênh và bình luận TikTok của Bubby"
      className="mx-auto mt-6 flex w-full max-w-2xl flex-col items-center sm:mt-7"
    >
      <TikTokGallery images={BANG_CHUNG_TIKTOK} />
      <Link
        href={BUBBY.tiktokUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-sm font-semibold text-brand underline underline-offset-4 decoration-brand/35 transition-colors duration-[160ms] ease [@media(hover:hover)_and_(pointer:fine)]:hover:decoration-brand"
      >
        Mở kênh TikTok
      </Link>
    </div>
  );
}

/**
 * Dải ngắn "Bubby là ai" trên tấm kính trả lời. Khách cần biết người trong
 * hai video sắp nói là ai — rồi mới xem. Cố ý nhỏ: bằng chứng kênh nằm ở
 * dải TikTok phía dưới, đừng tranh chỗ với video.
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
      className="mx-auto flex w-full max-w-lg flex-col items-center"
    >
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex items-center gap-3.5 text-left">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-line bg-brand-soft sm:h-16 sm:w-16">
            {daCoAnhThat ? (
              <Image
                src={ANH.bubby}
                alt={`Ảnh chân dung ${BUBBY.ten}`}
                fill
                sizes="64px"
                className="object-cover object-[center_18%]"
              />
            ) : (
              <span
                aria-hidden
                className="grid h-full w-full place-items-center font-display text-lg font-heading text-brand"
              >
                B
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-display text-[1.15rem] leading-[1.25] font-heading tracking-tight text-ink sm:text-[1.25rem]">
              {BUBBY.ten}
            </p>
            <p className="mt-0.5 text-sm text-muted">{BUBBY.vaiTro}</p>
          </div>
        </div>

        <p className="max-w-[52ch] text-center text-[0.92rem] leading-relaxed text-ink-soft">
          {BUBBY.tomTat.split(/(4 danh sách phát)/).map((phan, i) =>
            phan === "4 danh sách phát" ? (
              <strong key={i} className="font-semibold text-ink">
                {phan}
              </strong>
            ) : (
              phan
            ),
          )}
        </p>

        <ul className="flex w-full max-w-md flex-wrap items-stretch justify-center gap-y-3 border-y border-ink/10 py-4">
          {chiSo.map((muc, i) => (
            <li
              key={muc.nhan}
              className={`flex min-w-[6.5rem] flex-1 flex-col items-center px-3 ${
                i > 0 ? "border-l border-ink/10" : ""
              }`}
            >
              <span className="font-display text-[1.5rem] leading-[1.2] font-heading tracking-tight text-ink sm:text-[1.75rem]">
                {muc.so}
              </span>
              <span className="mt-1.5 text-center text-[0.72rem] leading-snug text-muted">
                {muc.nhan}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

/**
 * Mốc "Bước N" trước video vấn đề.
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
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand font-subtitle text-[0.8rem] font-bold text-white">
          {so}
        </span>
        {/* leading ≥ 1.25: cụm này hay có dấu chồng hai tầng (hiệu quả). */}
        <span className="title-band font-subtitle text-[1.2rem] leading-[1.3] font-bold sm:text-[1.6rem] sm:leading-[1.25]">
          {children}
        </span>
      </span>
    </div>
  );
}

/**
 * Khung cho video đứng trên trời. Bóng đổ ám màu mực (không phải đen thuần)
 * để tấm video nổi khỏi nền trời — nếu không nó chỉ là một ô chữ nhật dán phẳng.
 */
function KhungVideo({ children }: { children: ReactNode }) {
  return (
    <div className="mt-7 w-full max-w-4xl rounded-2xl shadow-[0_38px_75px_-45px_rgba(22,35,63,0.65)]">
      {children}
    </div>
  );
}
