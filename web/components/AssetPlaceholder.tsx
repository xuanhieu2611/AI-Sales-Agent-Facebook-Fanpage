import { ImageSquare, Play } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { SHOW_REVIEW_PLACEHOLDERS } from "@/lib/site";

/**
 * Khung brief cho asset chưa có. Nó cố ý không giả làm ảnh thật: nó nói cho
 * chủ shop biết CHÍNH XÁC cần chụp cái gì, nhưng vẫn giữ đúng tỷ lệ và nhịp
 * của ảnh thật để bản duyệt không bị lệch layout.
 *
 * TỰ NHẬN BIẾT theo đuôi file: mọi ảnh giữ chỗ trong repo đều là `.svg`, nên
 * `src` trỏ vào `.svg` (hoặc chưa có `src`) nghĩa là asset chưa có thật. Chủ
 * shop chỉ cần thả ảnh thật vào `public/img/` và sửa đường dẫn — ĐÚNG Ô ĐÓ tự
 * chuyển sang ảnh thật, không phải bật tắt gì. Trước đây phải lật một cờ
 * chung cho cả trang, nghĩa là chỉ cần một asset chưa có là kẹt cả trang.
 */
export function AssetPlaceholder({
  title,
  description,
  type = "image",
  className = "",
  src,
  alt,
  viTriAnh = "object-center",
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  title: string;
  description: string;
  type?: "image" | "video" | "chat";
  className?: string;
  /** Trỏ vào file `.svg` (hoặc bỏ trống) = chưa có ảnh thật, hiện khung brief. */
  src?: string;
  alt?: string;
  /**
   * Ảnh bị cắt theo `object-cover`, nên phần nào của ảnh được giữ lại là do
   * class này quyết định (`object-top`, `object-left-top`, `object-[50%_30%]`…).
   * PHẢI CHỈNH LẠI mỗi khi thay ảnh: mỗi tấm chụp có chỗ quan trọng nằm một
   * kiểu, không có giá trị nào đúng cho mọi ảnh.
   */
  viTriAnh?: string;
  sizes?: string;
}) {
  const Icon = type === "video" ? Play : ImageSquare;
  const daCoAnhThat = Boolean(src) && !src!.endsWith(".svg");

  if (daCoAnhThat && !SHOW_REVIEW_PLACEHOLDERS) {
    return (
      <div className={`relative overflow-hidden bg-brand-soft ${className}`}>
        <Image
          src={src!}
          alt={alt ?? title}
          fill
          sizes={sizes}
          className={`object-cover ${viTriAnh}`}
        />
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
          <p className="font-display text-xl leading-[1.25] font-heading tracking-tight text-ink sm:text-2xl">
            {title}
          </p>
          <p className="text-sm leading-relaxed text-muted">{description}</p>
        </div>
      </div>
    </div>
  );
}
