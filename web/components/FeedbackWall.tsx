"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "@phosphor-icons/react/dist/ssr";

type Anh = { src: string; alt: string };

/**
 * Tường ảnh chụp feedback, bấm vào là phóng to.
 *
 * Vì sao cần phóng to: ảnh chụp tin nhắn ở cỡ 260px thì không ai đọc nổi
 * chữ. Không đọc được thì nó chỉ còn là hình trang trí, mất luôn tác dụng
 * làm bằng chứng.
 *
 * Dùng thẻ <dialog> của trình duyệt nên phím Esc, khoá cuộn nền và bẫy
 * focus có sẵn, không phải tự viết.
 */
export function FeedbackWall({ anh }: { anh: Anh[] }) {
  const [mo, setMo] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (mo !== null && !d.open) d.showModal();
    if (mo === null && d.open) d.close();
  }, [mo]);

  const dong = useCallback(() => setMo(null), []);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {anh.map((f, i) => (
          <li key={f.src}>
            <button
              type="button"
              onClick={() => setMo(i)}
              aria-label={`Phóng to: ${f.alt}`}
              className="group relative block aspect-3/4 w-full overflow-hidden rounded-xl border border-line bg-surface transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(22,35,63,0.5)]"
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={dong}
        onClick={(e) => {
          // bấm ra ngoài ảnh thì đóng
          if (e.target === dialogRef.current) dong();
        }}
        className="m-auto max-h-[90dvh] w-[min(92vw,32rem)] rounded-2xl bg-transparent p-0 backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
      >
        {mo !== null && (
          <div className="relative flex flex-col gap-3">
            <button
              type="button"
              onClick={dong}
              aria-label="Đóng"
              className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-surface text-ink transition-colors hover:bg-mark"
            >
              <X weight="bold" className="h-5 w-5" />
            </button>
            <Image
              src={anh[mo].src}
              alt={anh[mo].alt}
              width={800}
              height={1067}
              sizes="(max-width: 640px) 92vw, 32rem"
              className="h-auto w-full rounded-2xl bg-surface"
            />
          </div>
        )}
      </dialog>
    </>
  );
}
