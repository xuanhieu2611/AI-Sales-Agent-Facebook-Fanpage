"use client";

import Image from "next/image";
import { useState } from "react";
import type { AnhTikTok } from "@/lib/site";

export function TikTokGallery({ images }: { images: AnhTikTok[] }) {
  return (
    <>
      <MobileTikTokCarousel images={images} />
      <DesktopTikTokGallery images={images} />
    </>
  );
}

function MobileTikTokCarousel({ images }: { images: AnhTikTok[] }) {
  return (
    <div className="w-full md:hidden">
      <ul
        aria-label="Ảnh kênh và bình luận TikTok"
        className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto overscroll-x-contain px-5 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <li
            key={image.src}
            className="w-[calc(100%_-_2.25rem)] shrink-0 snap-start first:ml-0"
          >
            <figure>
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-white shadow-[0_12px_30px_-18px_rgba(22,35,63,0.62)]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 4.75rem), 0px"
                  className={`object-cover ${index === 0 ? "object-top" : "object-[center_64%]"}`}
                />
              </div>
              <figcaption className="mt-2 flex items-center justify-between gap-3 text-xs font-medium text-ink-soft">
                <span className="truncate">{image.tieuDe}</span>
                <span className="shrink-0 tabular-nums text-muted" aria-label={`Ảnh ${index + 1} trên ${images.length}`}>
                  {index + 1}/{images.length}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
        <li aria-hidden className="w-1 shrink-0" />
      </ul>
    </div>
  );
}

function DesktopTikTokGallery({ images }: { images: AnhTikTok[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex];
  const comments = images.slice(1);

  return (
    <div className="hidden w-full max-w-[37rem] justify-center gap-3 md:grid md:grid-cols-[18rem_18rem] md:items-start">
      <figure className="w-full min-w-0">
        <div className="relative aspect-[944/2046] w-full overflow-hidden rounded-xl bg-white shadow-[0_14px_34px_-18px_rgba(22,35,63,0.62)]">
          <Image
            key={selected.src}
            src={selected.src}
            alt={selected.alt}
            fill
            sizes="18rem"
            className="object-contain"
          />
        </div>
        <figcaption className="mt-2 flex min-h-5 items-center justify-center gap-1.5 text-center text-xs font-medium text-ink-soft">
          <span>{selected.tieuDe}</span>
          {selectedIndex > 0 ? (
            <>
              <span aria-hidden>·</span>
              <button
                type="button"
                onClick={() => setSelectedIndex(0)}
                className="font-semibold text-brand underline decoration-brand/30 underline-offset-2 transition-[text-decoration-color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:decoration-brand"
              >
                Xem lại kênh
              </button>
            </>
          ) : null}
        </figcaption>
      </figure>

      <div className="min-w-0" aria-label="Chọn bình luận TikTok để xem">
        <div className="grid w-full grid-cols-3 grid-rows-3 gap-2">
          {comments.map((image, commentIndex) => {
            const imageIndex = commentIndex + 1;
            const isSelected = imageIndex === selectedIndex;

            return (
              <button
                key={image.src}
                type="button"
                onClick={() => setSelectedIndex(imageIndex)}
                aria-label={`Xem ${image.tieuDe}`}
                aria-pressed={isSelected}
                className={`group relative aspect-[944/2046] w-full overflow-hidden rounded-lg border-2 bg-white transition-[border-color,opacity,transform,box-shadow] duration-[160ms] ease-out active:scale-[0.97] ${
                  isSelected
                    ? "border-brand shadow-[0_5px_16px_-8px_rgba(42,95,217,0.8)]"
                    : "border-white/80 opacity-75 [@media(hover:hover)_and_(pointer:fine)]:hover:border-brand/35 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-100"
                }`}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="91px"
                  className="object-cover object-top"
                />
                <span
                  className={`absolute inset-x-1 bottom-1 rounded-md px-1 py-0.5 text-[0.62rem] leading-tight font-bold shadow-sm ${
                    isSelected ? "bg-brand text-white" : "bg-white/90 text-ink"
                  }`}
                >
                  CMT {commentIndex + 1}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-center text-[0.7rem] leading-relaxed text-muted">
          Chọn một bình luận để xem rõ hơn
        </p>
      </div>
    </div>
  );
}
