"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { VI_DU } from "@/lib/translations";

const DUONG = 7000; // ms mỗi ví dụ

/**
 * Khối "Dịch thử" — thứ duy nhất trên trang được phép ồn ào.
 *
 * Cho khách thấy đúng cái lỗi họ đang mắc, trong 3 giây, trước khi trang
 * kịp nói bất cứ điều gì về khóa học.
 */
export function TranslateDemo() {
  const [i, setI] = useState(0);
  const [chay, setChay] = useState(true);
  const [tinh, setTinh] = useState(false); // prefers-reduced-motion
  const vungRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const doc = () => setTinh(mq.matches);
    doc();
    mq.addEventListener("change", doc);
    return () => mq.removeEventListener("change", doc);
  }, []);

  useEffect(() => {
    if (!chay || tinh) return;
    const t = setTimeout(() => setI((n) => (n + 1) % VI_DU.length), DUONG);
    return () => clearTimeout(t);
  }, [i, chay, tinh]);

  const chon = useCallback((n: number) => {
    setI(n);
    setChay(false);
  }, []);

  const vd = VI_DU[i];

  return (
    <div
      ref={vungRef}
      onMouseEnter={() => setChay(false)}
      onFocusCapture={() => setChay(false)}
      className="relative overflow-hidden rounded-3xl border border-line-ink bg-ink-2 p-6 sm:p-9"
    >
      {/* ánh sáng nền rất nhẹ, để card không phẳng lì */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 -right-16 h-64 w-64 rounded-full bg-brand/25 blur-[90px]"
      />

      <div className="relative flex flex-col gap-7">
        <div className="flex items-start justify-between gap-4">
          <span className="eyebrow text-muted-ink">Dịch thử</span>
          <span className="eyebrow rounded-full border border-flag/40 bg-flag/10 px-3 py-1 text-flag">
            lệch ở {vd.loai}
          </span>
        </div>

        {/* key làm cả khối chạy lại hiệu ứng khi đổi ví dụ */}
        <div key={i} className="flex flex-col gap-7">
          {/* 1 — câu tiếng Việt */}
          <div className="flex flex-col gap-2.5">
            <span className="eyebrow text-muted-ink/70">Bạn nghĩ trong đầu</span>
            <p className="font-display text-2xl leading-[1.25] font-bold tracking-tight text-white sm:text-[2rem]">
              {vd.vi}
            </p>
          </div>

          <div className="h-px w-full bg-line-ink" />

          {/* 2 — bản dịch từng chữ, có nét sửa */}
          <div
            className="flex flex-col gap-2.5 motion-safe:animate-[fadeUp_0.5s_ease-out_both]"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="eyebrow text-muted-ink/70">
              Bạn sẽ dịch thành
            </span>
            <p className="flex flex-wrap items-end gap-x-2 gap-y-3 font-mono text-lg text-muted-ink sm:text-xl">
              {vd.literal.map((tok, n) => (
                <span key={n} className={tok.bad ? "squiggle text-flag" : ""}>
                  {tok.t}
                </span>
              ))}
            </p>
          </div>

          {/* 3 — câu đúng */}
          <div
            className="flex flex-col gap-2.5 motion-safe:animate-[fadeUp_0.5s_ease-out_both]"
            style={{ animationDelay: "0.35s" }}
          >
            <span className="eyebrow text-brand-soft/80">Thực ra là</span>
            <p className="font-display text-2xl leading-[1.25] font-bold tracking-tight text-white sm:text-[2rem]">
              {vd.dung}
            </p>
          </div>

          {/* 4 — vì sao */}
          <p
            className="max-w-[58ch] border-l-2 border-brand/60 pl-4 text-[0.95rem] leading-relaxed text-muted-ink motion-safe:animate-[fadeUp_0.5s_ease-out_both]"
            style={{ animationDelay: "0.55s" }}
          >
            {vd.giaiThich}
          </p>
        </div>

        {/* điều hướng */}
        <div className="flex items-center gap-3 pt-1">
          {VI_DU.map((v, n) => (
            <button
              key={n}
              onClick={() => chon(n)}
              aria-label={`Ví dụ ${n + 1}: ${v.vi}`}
              aria-current={n === i}
              className="group h-6 rounded-full py-2.5"
            >
              <span
                className={`block h-1 rounded-full transition-all duration-300 ${
                  n === i
                    ? "w-10 bg-white"
                    : "w-5 bg-white/25 group-hover:bg-white/50"
                }`}
              />
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-muted-ink/60">
            {String(i + 1).padStart(2, "0")} / {String(VI_DU.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
