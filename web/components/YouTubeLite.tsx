"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Facade cho YouTube: chỉ tải ảnh thumbnail, tới khi bấm mới nhúng iframe.
 * Nhúng thẳng iframe làm trang nặng thêm ~1MB — với traffic từ quảng cáo
 * chạy 4G thì đó là mất khách.
 */
export function YouTubeLite({
  id,
  title,
  className = "",
}: {
  id: string;
  title: string;
  className?: string;
}) {
  const [choi, setChoi] = useState(false);

  return (
    <div
      className={`group relative aspect-video w-full overflow-hidden rounded-2xl border border-line-ink bg-ink-2 ${className}`}
    >
      {choi ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setChoi(true)}
          className="absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Phát video: ${title}`}
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-ink/30 transition-colors duration-300 group-hover:bg-ink/15" />
          {/* thumbnail có thể sáng màu (vd. ảnh chụp tài liệu) — cần lớp
              tối chân ảnh thì tiêu đề trắng mới đọc được */}
          <span className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-ink/90 to-transparent" />

          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="ml-1 h-6 w-6 fill-ink"
              >
                <path d="M8 5.14v13.72L19 12 8 5.14Z" />
              </svg>
            </span>
          </span>

          <span className="absolute inset-x-0 bottom-0 p-5 text-left">
            <span className="font-display text-base font-bold tracking-tight text-white drop-shadow sm:text-lg">
              {title}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
