"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Viewport cho hàng điện thoại trôi ngang.
 *
 * Chỉ chạy animation khi thật sự nhìn thấy (IntersectionObserver) và tab
 * đang hiện. Hover thì pause - ảnh là chữ thật, khách phải đọc được nếu
 * muốn dừng lại.
 *
 * Reduced-motion: khối này bị ẩn trong globals.css, không phải bằng
 * utility `motion-reduce:hidden`.
 */
export function FeedbackFlood({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sync = (inView: boolean) => {
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
      aria-label="Tin nhắn học viên đang trôi ngang"
    >
      {children}
    </div>
  );
}
