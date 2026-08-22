import Link from "next/link";
import type { ReactNode } from "react";

/* ── Messenger glyph ───────────────────────────────────────────────
   Đây là logo thương hiệu của Messenger, không phải icon giao diện,
   nên vẽ tay là đúng. Mọi icon còn lại trên trang lấy từ Phosphor. */
export function MessengerIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`shrink-0 ${className}`}
      fill="currentColor"
    >
      <path d="M12 2C6.24 2 2 6.22 2 11.78c0 2.9 1.19 5.42 3.13 7.17.16.15.26.35.27.57l.05 1.77a.8.8 0 0 0 1.12.71l1.98-.87c.17-.08.36-.09.54-.04 1.13.31 2.34.48 3.61.48 5.76 0 10-4.22 10-9.79C22.7 6.22 17.76 2 12 2Zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75c.21.16.51.16.72 0l3.16-2.39c.42-.32.97.18.69.62Z" />
    </svg>
  );
}

/* ── Nhãn CTA ──────────────────────────────────────────────────────
   Mỗi hành động CHỈ có một cách gọi tên trên toàn trang. Khách đọc
   lướt, thấy ba cách gọi khác nhau cho cùng một nút thì phải dừng lại
   nghĩ xem chúng có khác nhau không. Đừng thêm nhãn mới ở đây. */
export const CTA = {
  /** Nhãn chính của hành động "qua Messenger". Dùng ở đầu trang, thanh dính
   *  đáy và khối chốt — ba chỗ khách đang trong mạch đọc, phải trùng khớp. */
  loTrinh: "Nhận lộ trình phù hợp",
  /** Bản ngắn, CHỈ dùng cho nút trên thanh đầu trang. Ngoại lệ có chủ đích:
   *  chỗ đó hẹp (điện thoại còn phải chứa cả tên page), và thanh đầu trang
   *  là chrome đứng ngoài mạch đọc, không phải một CTA trong bài. */
  loTrinhNgan: "Nhắn tin tư vấn",
} as const;

/* ── Buttons ──────────────────────────────────────────────────────
   Nút không bao giờ dùng màu pastel. Pastel trên nút trông như nút
   bị khoá, khách không bấm. Pastel để làm nền, xanh đậm để bấm. */
type ButtonProps = {
  href: string;
  children: ReactNode;
  /** `onBrand` / `outlineOnBrand` chỉ dùng trên nền xanh đậm. */
  variant?: "primary" | "outline" | "onBrand" | "outlineOnBrand";
  className?: string;
  external?: boolean;
};

const VARIANTS = {
  primary:
    "bg-brand text-white shadow-[0_10px_24px_-14px_rgba(42,95,217,0.9)] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-brand-deep",
  outline:
    "border border-ink/15 bg-surface text-ink [@media(hover:hover)_and_(pointer:fine)]:hover:border-brand/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-brand-soft/50",
  onBrand:
    "bg-white text-brand [@media(hover:hover)_and_(pointer:fine)]:hover:bg-mark [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink",
  outlineOnBrand:
    "border border-white/45 text-white [@media(hover:hover)_and_(pointer:fine)]:hover:border-white [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/10",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold whitespace-nowrap transition-[transform,background-color,border-color,color] duration-[160ms] ease-[var(--ease-out)] active:scale-[0.97]";
  const props = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link href={href} className={`${base} ${VARIANTS[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

/* ── Vệt bút dạ quang ─────────────────────────────────────────────
   Dùng để tô sáng đúng MỘT cụm từ trong một tiêu đề. Tô nhiều chỗ
   thì thành ra không tô chỗ nào. */
export function Mark({ children }: { children: ReactNode }) {
  return <span className="highlight">{children}</span>;
}

/* ── Section scaffolding ──────────────────────────────────────────
   `eyebrow` cố tình là tuỳ chọn và rất ít khi dùng. Nhãn nhỏ in hoa
   trên mọi tiêu đề làm cả trang có cùng một nhịp, đọc rất máy móc.
   Cả trang chỉ dùng 4 cái. */
export function Eyebrow({
  children,
  onBrand = false,
}: {
  children: ReactNode;
  onBrand?: boolean;
}) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-2 ${
        onBrand ? "text-white/70" : "text-brand"
      }`}
    >
      <span
        className={`h-px w-6 ${onBrand ? "bg-white/40" : "bg-brand/40"}`}
        aria-hidden
      />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  onBrand = false,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  onBrand?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      {eyebrow && <Eyebrow onBrand={onBrand}>{eyebrow}</Eyebrow>}
      {/* leading-[1.22] là bắt buộc: utility text-5xl của Tailwind kèm sẵn
          line-height:1, đè lên rule chung — mà 1.0 thì dấu tiếng Việt của
          dòng dưới đâm lên dòng trên. */}
      <h2
        className={`max-w-[19ch] text-[2.1rem] leading-[1.22] sm:text-5xl lg:text-[3.2rem] ${
          onBrand ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`max-w-[52ch] text-[1.05rem] leading-relaxed ${
            onBrand ? "text-white/75" : "text-muted"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
