"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Viewport cho tường bình luận cuộn.
 *
 * Chỉ chạy animation khi thật sự nhìn thấy (IntersectionObserver) và tab
 * đang hiện (visibilitychange). Không pause khi hover — flood tồn tại để
 * bán volume, dừng giữa chừng thì mất đúng việc đó.
 *
 * Reduced-motion: khối này bị ẩn trong globals.css (`prefers-reduced-motion`),
 * không phải bằng utility `motion-reduce:hidden` — xem lời giải thích ở đó.
 * Không cần JS tắt thêm.
 */
export function FeedbackFlood({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sync = (inView: boolean) => {
      // Chỉ “đang xem” khi vừa trong viewport vừa tab đang hiện.
      el.classList.toggle("is-in-view", inView && !document.hidden);
    };

    let inView = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false;
        sync(inView);
      },
      { rootMargin: "80px 0px", threshold: 0.05 },
    );
    io.observe(el);

    const onVis = () => sync(inView);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="feedback-flood"
      role="region"
      aria-label="Bình luận người xem đang cuộn"
    >
      {children}
    </div>
  );
}
