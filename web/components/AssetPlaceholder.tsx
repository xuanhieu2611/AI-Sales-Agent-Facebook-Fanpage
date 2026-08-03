import { ImageSquare, Play } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { SHOW_REVIEW_PLACEHOLDERS } from "@/lib/site";

/**
 * Chỉ dùng trong bản duyệt giao diện. Khối này cố ý không giả làm ảnh thật:
 * nó cho chủ shop biết CHÍNH XÁC cần tìm / chụp asset nào, nhưng trang review
 * vẫn có nhịp và tỷ lệ ảnh giống lúc đưa asset thật vào.
 */
export function AssetPlaceholder({
  title,
  description,
  type = "image",
  className = "",
  src,
  alt,
}: {
  title: string;
  description: string;
  type?: "image" | "video" | "chat";
  className?: string;
  /** Khi tắt REVIEW_PLACEHOLDERS, ảnh thật này sẽ thay hẳn khung brief. */
  src?: string;
  alt?: string;
}) {
  const Icon = type === "video" ? Play : ImageSquare;

  if (!SHOW_REVIEW_PLACEHOLDERS && src) {
    return (
      <div className={`relative overflow-hidden bg-brand-soft ${className}`}>
        <Image src={src} alt={alt ?? title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`asset-placeholder relative isolate flex overflow-hidden border border-brand/20 bg-brand-soft/60 ${className}`}
    >
      <div aria-hidden className="absolute inset-0 asset-placeholder-grid opacity-60" />
      <div aria-hidden className="absolute -right-10 -bottom-20 h-56 w-56 rounded-full bg-mark/80 blur-2xl" />
      <div aria-hidden className="absolute top-7 right-7 h-16 w-16 rounded-full border border-brand/25" />

      <div className="relative m-auto flex max-w-[29rem] flex-col items-center gap-4 p-7 text-center sm:p-10">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white shadow-[0_12px_28px_-15px_rgba(42,95,217,0.8)]">
          <Icon weight={type === "video" ? "fill" : "bold"} className="h-5 w-5" />
        </span>
        <span className="eyebrow rounded-full border border-brand/20 bg-surface/80 px-3 py-1 text-brand">
          {type === "video" ? "VIDEO CẦN THAY" : type === "chat" ? "FEEDBACK CẦN THAY" : "ẢNH CẦN THAY"}
        </span>
        <div className="flex flex-col gap-2">
          <p className="font-display text-xl leading-[1.25] font-extrabold tracking-tight text-ink sm:text-2xl">
            {title}
          </p>
          <p className="text-sm leading-relaxed text-muted">{description}</p>
        </div>
      </div>
    </div>
  );
}
