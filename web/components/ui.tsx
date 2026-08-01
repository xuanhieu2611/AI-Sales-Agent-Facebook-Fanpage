import Link from "next/link";
import type { ReactNode } from "react";

/* ── Messenger glyph ──────────────────────────────────────────────── */
export function MessengerIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 2C6.24 2 2 6.22 2 11.78c0 2.9 1.19 5.42 3.13 7.17.16.15.26.35.27.57l.05 1.77a.8.8 0 0 0 1.12.71l1.98-.87c.17-.08.36-.09.54-.04 1.13.31 2.34.48 3.61.48 5.76 0 10-4.22 10-9.79C22.7 6.22 17.76 2 12 2Zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75c.21.16.51.16.72 0l3.16-2.39c.42-.32.97.18.69.62Z" />
    </svg>
  );
}

/* ── Buttons ──────────────────────────────────────────────────────── */
type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ink" | "outline" | "outlineInk";
  className?: string;
  external?: boolean;
};

const VARIANTS = {
  primary:
    "bg-brand text-white hover:bg-brand-deep shadow-[0_10px_30px_-12px_rgba(58,49,232,0.85)]",
  ink: "bg-white text-ink hover:bg-white/90",
  outline: "border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/5",
  outlineInk:
    "border border-white/25 text-white hover:border-white/60 hover:bg-white/10",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold transition-all duration-200 active:scale-[0.98]";
  const props = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link href={href} className={`${base} ${VARIANTS[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

/* ── Section scaffolding ──────────────────────────────────────────── */
export function Eyebrow({
  children,
  onInk = false,
}: {
  children: ReactNode;
  onInk?: boolean;
}) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-2 ${
        onInk ? "text-muted-ink" : "text-brand"
      }`}
    >
      <span
        className={`h-px w-6 ${onInk ? "bg-line-ink" : "bg-brand/40"}`}
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
  onInk = false,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  onInk?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      {eyebrow && <Eyebrow onInk={onInk}>{eyebrow}</Eyebrow>}
      {/* leading-[1.22] là bắt buộc: utility text-5xl của Tailwind kèm sẵn
          line-height:1, đè lên rule chung — mà 1.0 thì dấu tiếng Việt của
          dòng dưới đâm lên dòng trên. */}
      <h2
        className={`max-w-[19ch] text-[2.1rem] leading-[1.22] sm:text-5xl lg:text-[3.4rem] ${
          onInk ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`max-w-[52ch] text-[1.05rem] leading-relaxed ${
            onInk ? "text-muted-ink" : "text-muted"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
