"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "@phosphor-icons/react/dist/ssr";

/**
 * Facade cho YouTube: chỉ tải ảnh thumbnail, tới khi bấm mới nhúng iframe.
 * Nhúng thẳng iframe làm trang nặng thêm ~1MB — với traffic từ quảng cáo
 * chạy 4G thì đó là mất khách.
 */
export function YouTubeLite({
  id,
  title,
  className = "",
  priority = false,
}: {
  id: string;
  title: string;
  className?: string;
  /** Bật cho video đầu trang để ảnh thumbnail tải sớm. */
  priority?: boolean;
}) {
  const [choi, setChoi] = useState(false);

  return (
    <div
      className={`group relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-paper-2 ${className}`}
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
            priority={priority}
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {/* thumbnail có thể sáng màu (vd. ảnh chụp tài liệu) — cần lớp
              tối chân ảnh thì tiêu đề trắng mới đọc được */}
          <span className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-ink/90 via-ink/45 to-transparent" />

          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play weight="fill" className="ml-0.5 h-6 w-6 text-brand" />
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
