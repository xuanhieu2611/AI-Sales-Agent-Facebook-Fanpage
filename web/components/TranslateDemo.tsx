"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { VI_DU } from "@/lib/translations";

const DUONG = 7000; // ms mỗi ví dụ

/**
 * Khối "Dịch thử" — thứ duy nhất trên trang được phép ồn ào.
 *
 * Cho khách thấy đúng cái lỗi họ đang mắc, trong 3 giây, trước khi trang
 * kịp nói bất cứ điều gì về khóa học. Không cần bấm, không cần tải video.
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
      className="relative rounded-2xl border border-line bg-surface p-6 shadow-[0_24px_60px_-32px_rgba(22,35,63,0.35)] sm:p-9"
    >
      <div className="flex flex-col gap-7">
        <div className="flex items-start justify-between gap-4">
          <span className="eyebrow text-muted">Dịch thử</span>
          <span className="eyebrow rounded-full border border-flag/30 bg-flag/8 px-3 py-1 text-flag">
            lệch ở {vd.loai}
          </span>
        </div>

        {/* key làm cả khối chạy lại hiệu ứng khi đổi ví dụ */}
        <div key={i} className="flex flex-col gap-7">
          {/* 1 — câu tiếng Việt */}
          <div className="flex flex-col gap-2.5">
            <span className="eyebrow text-muted/70">Bạn nghĩ trong đầu</span>
            <p className="font-display text-2xl leading-[1.25] font-bold tracking-tight text-ink sm:text-[1.9rem]">
              {vd.vi}
            </p>
          </div>

          <div className="h-px w-full bg-line" />

          {/* 2 — bản dịch từng chữ, có nét sửa đỏ */}
          <div
            className="flex flex-col gap-2.5 motion-safe:animate-[fadeUp_0.5s_ease-out_both]"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="eyebrow text-muted/70">Bạn sẽ dịch thành</span>
            <p className="flex flex-wrap items-end gap-x-2 gap-y-3 font-mono text-lg text-muted sm:text-xl">
              {vd.literal.map((tok, n) => {
                // dấu câu phải dính vào chữ trước nó, nếu không thì ra
                // "already ." trông như lỗi gõ chứ không phải câu dịch sai
                const dauCau = /^[.,?!]+$/.test(tok.t);
                return (
                  <span
                    key={n}
                    className={`${tok.bad ? "squiggle text-flag" : ""} ${
                      dauCau ? "-ml-2" : ""
                    }`}
                  >
                    {tok.t}
                  </span>
                );
              })}
            </p>
          </div>

          {/* 3 — câu đúng */}
          <div
            className="flex flex-col gap-2.5 motion-safe:animate-[fadeUp_0.5s_ease-out_both]"
            style={{ animationDelay: "0.35s" }}
          >
            <span className="eyebrow text-brand">Thực ra là</span>
            <p className="font-display text-2xl leading-[1.25] font-bold tracking-tight text-ink sm:text-[1.9rem]">
              {vd.dung}
            </p>
          </div>

          {/* 4 — vì sao */}
          <p
            className="max-w-[58ch] border-l-2 border-brand/50 pl-4 text-[0.95rem] leading-relaxed text-muted motion-safe:animate-[fadeUp_0.5s_ease-out_both]"
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
                    ? "w-10 bg-brand"
                    : "w-5 bg-ink/15 group-hover:bg-ink/35"
                }`}
              />
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-muted/60">
            {String(i + 1).padStart(2, "0")} / {String(VI_DU.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
