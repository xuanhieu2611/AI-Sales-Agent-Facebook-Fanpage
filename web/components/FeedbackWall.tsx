import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { FeedbackFlood } from "./FeedbackFlood";
import { CTA, MessengerIcon } from "./ui";
import { MESSENGER_URL } from "@/lib/site";
import type { AnhFeedback } from "@/lib/site";

/**
 * Một hàng điện thoại trôi trên nền trời.
 *
 * Ảnh gốc là screenshot đủ kiểu (dài, ngắn, có thanh gõ, có status bar).
 * Nhét nguyên tấm vào hai dải thẻ trắng thì nhìn như đổ file, không phải
 * một mục trên trang. Cắt mỗi tấm thành một màn hình điện thoại cùng cỡ,
 * hơi nghiêng, rồi cho trôi chậm - khách thấy đây là tin nhắn thật, và
 * thấy là có nhiều.
 */
export function FeedbackWall({ anh }: { anh: AnhFeedback[] }) {
  if (anh.length === 0) return null;

  return (
    <div className="flex flex-col gap-14 sm:gap-16">
      <FeedbackFlood>
        <Lane anh={anh} duration="96s" />
      </FeedbackFlood>

      <div className="shell hidden motion-reduce:block">
        <div className="flex gap-5 overflow-x-auto px-1 py-6 sm:gap-6">
          {anh.map((a) => (
            <TheAnh key={`tinh-${a.src}`} anh={a} sizes="256px" />
          ))}
        </div>
      </div>

      <div className="shell">
        <TheChot />
      </div>
    </div>
  );
}

function Lane({ anh, duration }: { anh: AnhFeedback[]; duration: string }) {
  return (
    <div className="feedback-flood-lane">
      <div className="feedback-marquee-track" style={{ animationDuration: duration }}>
        <LaneSet anh={anh} />
        <LaneSet anh={anh} anDanh />
      </div>
    </div>
  );
}

function LaneSet({ anh, anDanh = false }: { anh: AnhFeedback[]; anDanh?: boolean }) {
  return (
    <div className="feedback-marquee-set" aria-hidden={anDanh || undefined}>
      {anh.map((a, i) => (
        <TheAnh
          key={`${anDanh ? "dup-" : ""}${a.src}-${i}`}
          anh={a}
          sizes="(max-width: 640px) 212px, (max-width: 1024px) 256px, 280px"
        />
      ))}
    </div>
  );
}

function TheAnh({ anh: f, sizes }: { anh: AnhFeedback; sizes: string }) {
  return (
    <figure className="feedback-phone">
      <div className="feedback-phone-tilt">
        <div className="feedback-phone-screen">
          <Image
            src={f.src}
            alt={f.alt}
            fill
            sizes={sizes}
            loading="lazy"
            className="object-cover object-top"
          />
        </div>
      </div>
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
      <p className="max-w-[34ch] font-display text-[1.2rem] leading-[1.32] font-heading tracking-tight sm:text-[1.45rem]">
        Bạn đang kẹt ở đâu? Nhắn Bubby, mình xem rồi nói thật là nên học phần
        nào trước.
      </p>
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
