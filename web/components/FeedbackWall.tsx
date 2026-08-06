import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { FeedbackFlood } from "./FeedbackFlood";
import { CTA, Mark, MessengerIcon } from "./ui";
import { MESSENGER_URL } from "@/lib/site";
import type { AnhFeedback, FeedbackNoiBat, TrichDan } from "@/lib/site";

/**
 * Tường bình luận, ba nhịp: một tấm ghim đọc được từ xa → dải cuộn rộng gần
 * trọn màn hình → khối chốt.
 *
 * TẤM GHIM là chỗ mục này thuyết phục. Ảnh chụp bình luận là chữ xám cỡ 15px
 * của TikTok: dán nguyên vào trang thì khách phải cúi vào đọc, mà khách đang
 * lướt thì không cúi. Nên tấm ghim đánh máy lại đúng nguyên văn câu đó bằng
 * chữ tiêu đề cỡ lớn, và để ảnh gốc ngay bên cạnh làm bằng chứng. Đọc được
 * trong một giây, mà vẫn kiểm chứng được.
 *
 * DẢI CUỘN bán số lượng, nên nó tràn ra hết bề ngang màn hình (xem
 * `.feedback-flood` trong globals.css) chứ không nằm trong `shell`: mỗi cột
 * rộng ~700px thay vì ~360px, tức là ảnh chụp hiện gần đúng cỡ thật và chữ
 * trong ảnh đọc được. Đây là lý do duy nhất để nó tràn lề — đừng bó nó lại.
 *
 * Tối đa 2 cột, và chỉ từ 1024px. Dưới mức đó một cột rộng luôn thắng hai cột
 * hẹp, vì thứ phải đọc được là chữ nằm TRONG ảnh. Cột duy nhất đó chứa ĐỦ mọi
 * bình luận (cột kia là cùng bộ, chỉ lệch pha) nên ẩn cột hai không mất gì.
 */
export function FeedbackWall({
  anh,
  cau = [],
}: {
  anh: AnhFeedback[];
  /** Câu feedback đánh máy lại. Trộn xen vào giữa các ảnh trong dải cuộn. */
  cau?: FeedbackNoiBat[];
}) {
  const ghim = chonGhim(anh);
  const conLai = ghim ? anh.filter((a) => a.src !== ghim.src) : anh;
  // Ít ảnh thì dải cuộn lấy cả bộ — số lượng quan trọng hơn "không trùng ghim".
  const trongDai = conLai.length >= 3 ? conLai : anh;

  const muc = tron(trongDai, cau);
  const laneA = lapDay(muc);
  const laneB = lapDay(xoay(muc, Math.ceil(muc.length / 2)));

  return (
    <div className="flex flex-col gap-14 sm:gap-20">
      {ghim && (
        <div className="shell">
          <Ghim anh={ghim} />
        </div>
      )}

      {muc.length > 0 && (
        <>
          <FeedbackFlood>
            <Lane muc={laneA} duration="78s" />
            {/* Cột thứ hai chỉ có từ 1024px — khớp với `.feedback-flood`.
                Nó chứa cùng bộ bình luận, chỉ lệch pha, nên ẩn ở màn hẹp
                không mất bình luận nào. */}
            <Lane
              muc={laneB}
              duration="98s"
              reverse
              className="hidden lg:block"
            />
          </FeedbackFlood>

          {/* Bản tĩnh cho prefers-reduced-motion — chỉ hiện khi dải cuộn bị ẩn. */}
          <div className="shell hidden motion-reduce:block">
            <div className="columns-1 gap-4 lg:columns-2 lg:gap-5">
              {muc.map((m) => (
                <div key={`tinh-${m.khoa}`} className="mb-4 break-inside-avoid lg:mb-5">
                  {m.loai === "anh" ? (
                    <TheAnh anh={m.anh} sizes="(max-width: 1024px) 100vw, 560px" />
                  ) : (
                    <TheCau cau={m.cau} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="shell">
        <TheChot />
      </div>
    </div>
  );
}

/** Mỗi cột luôn phải đủ dài để lấp kín khung, nếu không nó chạy hết rồi hở
 *  ra một mảng trống to bằng nửa mục — nhìn như trang bị lỗi. Chưa đủ ảnh thì
 *  lặp lại vòng tròn; thả đủ ảnh thật vào là hết lặp, không phải sửa gì. */
const TOI_THIEU_MOI_COT = 8;

type Muc =
  | { loai: "anh"; khoa: string; anh: AnhFeedback }
  | { loai: "cau"; khoa: string; cau: FeedbackNoiBat };

/** Ảnh nào có `trichDan` thì ghim ảnh đó; không có thì ghim tấm to nhất. */
function chonGhim(anh: AnhFeedback[]): AnhFeedback | undefined {
  const coTrichDan = anh.find((a) => a.trichDan);
  if (coTrichDan) return coTrichDan;

  return [...anh].sort((a, b) => b.rong * b.cao - a.rong * a.cao)[0];
}

function lapDay(muc: Muc[]): Muc[] {
  if (muc.length === 0) return [];

  const soLuong = Math.max(TOI_THIEU_MOI_COT, muc.length);
  return Array.from({ length: soLuong }, (_, i) => muc[i % muc.length]);
}

/** Cùng một bộ nhưng bắt đầu từ giữa — hai cột không chạy song song y hệt. */
function xoay(muc: Muc[], n: number): Muc[] {
  return [...muc.slice(n), ...muc.slice(0, n)];
}

/** Trộn câu đánh máy vào giữa ảnh chụp, cứ 2 ảnh chèn 1 câu. */
function tron(anh: AnhFeedback[], cau: FeedbackNoiBat[]): Muc[] {
  const ra: Muc[] = [];
  let i = 0;

  anh.forEach((a, viTri) => {
    ra.push({ loai: "anh", khoa: a.src, anh: a });
    if ((viTri + 1) % 2 === 0 && i < cau.length) {
      ra.push({ loai: "cau", khoa: cau[i].cau, cau: cau[i] });
      i += 1;
    }
  });

  for (; i < cau.length; i += 1) {
    ra.push({ loai: "cau", khoa: cau[i].cau, cau: cau[i] });
  }

  return ra;
}

/**
 * Tấm ghim: chữ đánh máy bên trái, ảnh gốc bên phải.
 *
 * Hai thứ này CỐ Ý nói cùng một câu. Chữ to để đọc, ảnh để tin — bỏ ảnh thì
 * thành lời tự khen, bỏ chữ thì không ai đọc. Ảnh chưa có `trichDan` thì
 * chỉ hiện ảnh, không bịa chữ.
 */
function Ghim({ anh }: { anh: AnhFeedback }) {
  const t = anh.trichDan;

  if (!t) {
    return (
      <div className="max-w-3xl">
        <TheAnh anh={anh} sizes="(max-width: 640px) 100vw, 720px" />
      </div>
    );
  }

  const [truoc, giua, sau] = xeCau(t);

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.86fr)] lg:gap-12">
      <blockquote className="flex flex-col gap-6 sm:gap-7">
        {/* leading-[1.3] là bắt buộc, không phải thẩm mỹ: cỡ chữ này mà bóp
            xuống 1.1 thì dấu của dòng dưới đâm lên dòng trên và bị cắt. */}
        {/* KHÔNG dùng text-balance ở đây: câu này dài 5–6 dòng, balance bóp bề
            ngang lại cho đều dòng nên cột chữ hụt hẳn một khoảng so với ảnh
            bên cạnh. Cứ để chữ chảy hết bề rộng cột. */}
        <p className="font-display text-[1.6rem] leading-[1.3] font-extrabold tracking-tight text-ink sm:text-[1.95rem] lg:text-[2.2rem]">
          “{truoc}
          {giua && <Mark>{giua}</Mark>}
          {sau}”
        </p>

        <footer className="flex flex-col gap-1">
          <cite className="font-display text-[1.05rem] leading-snug font-bold tracking-tight text-ink not-italic">
            {t.ten}
          </cite>
          <span className="font-mono text-xs text-muted">{t.nguon}</span>
        </footer>
      </blockquote>

      {/* Tấm giấy lấp ló phía sau: "đây là một tấm lấy ra từ một chồng", nói
          được điều đó mà không phải viết ra chữ "còn hàng trăm cái nữa". */}
      <div className="relative lg:justify-self-end">
        <span
          aria-hidden
          className="absolute inset-x-5 top-4 h-full rounded-2xl border border-line bg-surface/70"
        />
        <TheAnh
          anh={anh}
          uuTien
          sizes="(max-width: 1024px) 100vw, 560px"
          className="relative"
        />
      </div>
    </div>
  );
}

/** Cắt câu thành 3 khúc quanh cụm được tô vàng. */
function xeCau(t: TrichDan): [string, string, string] {
  if (!t.toSang) return [t.cau, "", ""];

  const i = t.cau.indexOf(t.toSang);
  if (i < 0) return [t.cau, "", ""];

  return [t.cau.slice(0, i), t.toSang, t.cau.slice(i + t.toSang.length)];
}

function Lane({
  muc,
  duration,
  reverse = false,
  className = "",
}: {
  muc: Muc[];
  duration: string;
  reverse?: boolean;
  className?: string;
}) {
  if (muc.length === 0) return null;

  return (
    <div className={`feedback-flood-lane ${className}`.trim()}>
      <div
        className={`feedback-marquee-track${reverse ? " feedback-marquee-reverse" : ""}`}
        style={{ animationDuration: duration }}
      >
        <LaneSet muc={muc} />
        <LaneSet muc={muc} anDanh />
      </div>
    </div>
  );
}

function LaneSet({ muc, anDanh = false }: { muc: Muc[]; anDanh?: boolean }) {
  return (
    <div className="feedback-marquee-set" aria-hidden={anDanh || undefined}>
      {muc.map((m, i) => (
        <div key={`${anDanh ? "dup-" : ""}${m.khoa}-${i}`}>
          {m.loai === "anh" ? (
            <TheAnh anh={m.anh} sizes="(max-width: 1024px) 100vw, 760px" />
          ) : (
            <TheCau cau={m.cau} gon />
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Ảnh chụp bình luận, hiện nguyên tấm (`object-contain`, không cắt).
 *
 * Bóng đổ hai tầng và pha màu mực navy, không phải đen: bóng đen trên nền
 * giấy xanh ra một vệt xám bẩn. Tầng mảnh 1px làm nét mép thẻ, tầng loe rộng
 * tách thẻ khỏi nền.
 */
function TheAnh({
  anh: f,
  uuTien = false,
  sizes,
  className = "",
}: {
  anh: AnhFeedback;
  uuTien?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_1px_rgba(22,35,63,0.05),0_18px_40px_-28px_rgba(22,35,63,0.55)] ${className}`.trim()}
    >
      <Image
        src={f.src}
        alt={f.alt}
        width={f.rong}
        height={f.cao}
        sizes={sizes}
        // Tấm ghim nằm giữa trang, KHÔNG được `priority`: nó cướp mất preload
        // của ảnh đầu trang và tự trở thành LCP. `eager` là đủ — nó ở ngay
        // dưới màn hình đầu nên tải sớm vẫn có lợi.
        loading={uuTien ? "eager" : "lazy"}
        className="h-auto w-full object-contain"
      />
    </figure>
  );
}

const NEN = [
  "bg-mark-soft/80 border-mark/45",
  "bg-brand-soft/60 border-brand/20",
  "bg-surface border-line",
];

function TheCau({
  cau: f,
  gon = false,
}: {
  cau: FeedbackNoiBat;
  gon?: boolean;
}) {
  const nen = NEN[f.cau.length % NEN.length];

  return (
    <figure
      className={`flex flex-col rounded-2xl border ${nen} ${
        gon ? "gap-3 p-5 sm:p-6" : "gap-5 p-6 sm:p-7"
      }`}
    >
      <blockquote
        className={`font-display font-bold tracking-tight text-ink ${
          gon
            ? "text-[1.05rem] leading-[1.4] sm:text-[1.2rem]"
            : "text-[1.15rem] leading-[1.4] sm:text-[1.3rem]"
        }`}
      >
        “{f.cau}”
      </blockquote>
      <figcaption className="flex flex-col gap-0.5 text-sm">
        <span className="font-semibold text-ink">{f.ten}</span>
        <span className="text-muted">{f.ketQua}</span>
      </figcaption>
    </figure>
  );
}

function TheChot() {
  return (
    <Link
      href={MESSENGER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-6 rounded-2xl bg-brand p-7 text-white shadow-[0_22px_54px_-34px_rgba(42,95,217,0.95)] transition-[background-color,transform] duration-[160ms] ease-[var(--ease-out)] active:scale-[0.99] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-brand-deep sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:p-9"
    >
      <p className="max-w-[34ch] font-display text-[1.2rem] leading-[1.32] font-extrabold tracking-tight sm:text-[1.45rem]">
        Bạn đang kẹt ở đâu? Nhắn Bubby, mình xem rồi nói thật là nên học phần
        nào trước.
      </p>
      {/* Trông như nút nhưng là một phần của thẻ — cả thẻ mới là link, vì trên
          điện thoại ngón tay nhắm vào cả khối chứ không nhắm vào dòng chữ. */}
      <span className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-white px-5 py-3 text-sm font-semibold whitespace-nowrap text-brand transition-[background-color,color] duration-[160ms] ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-mark [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-ink sm:self-auto">
        <MessengerIcon className="h-4 w-4" />
        {CTA.loTrinh}
        <ArrowUpRight
          weight="bold"
          aria-hidden
          className="h-4 w-4 transition-transform duration-[160ms] ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
