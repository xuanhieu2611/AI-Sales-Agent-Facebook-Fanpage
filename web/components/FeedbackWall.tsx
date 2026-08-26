import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { FeedbackGallery } from "./FeedbackGallery";
import { CTA, MessengerIcon } from "./ui";
import { MESSENGER_URL } from "@/lib/site";
import type { AnhFeedback } from "@/lib/site";

/**
 * Một chồng ảnh tin nhắn trôi trên nền trời.
 *
 * Ảnh gốc là screenshot đủ kiểu (dài, ngắn, có thanh gõ, có status bar).
 * Nhét nguyên tấm vào hai dải thẻ trắng thì nhìn như đổ file, không phải
 * một mục trên trang. Cắt mỗi tấm về cùng một khổ dọc, hơi nghiêng, đè
 * lên nhau một chút rồi cho trôi chậm - khách thấy đây là tin nhắn thật,
 * và thấy là có nhiều. Không đóng khung điện thoại: viền lặp lại 20 lần
 * ăn mất bề ngang và làm phần xếp chồng trông rối. Bóng đổ lo chiều sâu.
 */
export function FeedbackWall({ anh }: { anh: AnhFeedback[] }) {
  if (anh.length === 0) return null;

  return (
    <div className="flex flex-col gap-14 sm:gap-16">
      <FeedbackGallery anh={anh} />

      <div className="shell">
        <TheChot />
      </div>
    </div>
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
        Bạn đang phân vân khoá nào phù hợp với mình?
        <br />
        Bạn muốn biết các chương trình ưu đãi hấp dẫn?
        <br />
        Nhắn cho English With Bubby ngay!
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
