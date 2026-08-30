"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

const LOOP_DURATION_MS = 96_000;
const DRAG_THRESHOLD_PX = 5;

/**
 * Viewport cho hàng điện thoại trôi ngang.
 *
 * Track dùng scrollLeft thay vì CSS transform để khách có thể vuốt trên touch
 * hoặc giữ chuột và kéo. Hai set ảnh giống nhau tạo thành một vòng lặp liền
 * mạch; autoplay chỉ chạy khi khối đang hiện và người dùng không tương tác.
 */
export function FeedbackFlood({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const intersectingRef = useRef(false);
  const inViewRef = useRef(false);
  const interactingRef = useRef(false);
  const hoveringRef = useRef(false);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setInteracting = useCallback((interacting: boolean) => {
    interactingRef.current = interacting;
    ref.current?.classList.toggle("is-interacting", interacting);
  }, []);

  const scheduleTouchResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    // Để native momentum kết thúc trước khi autoplay tiếp tục.
    resumeTimerRef.current = setTimeout(() => setInteracting(false), 1_000);
  }, [setInteracting]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const syncVisibility = () => {
      inViewRef.current = intersectingRef.current && !document.hidden;
      el.classList.toggle("is-in-view", inViewRef.current);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        intersectingRef.current = entry?.isIntersecting ?? false;
        syncVisibility();
      },
      { rootMargin: "80px 0px", threshold: 0.05 },
    );
    io.observe(el);

    const onVisibilityChange = () => syncVisibility();
    document.addEventListener("visibilitychange", onVisibilityChange);

    let frame = 0;
    let previousTime = performance.now();
    const tick = (time: number) => {
      const elapsed = Math.min(time - previousTime, 64);
      previousTime = time;

      const track = el.querySelector<HTMLElement>(".feedback-marquee-track");
      const loopWidth = track ? track.scrollWidth / 2 : 0;
      const galleryOpen = el.closest<HTMLElement>(".feedback-gallery")?.dataset.open === "true";

      if (inViewRef.current && !interactingRef.current && !galleryOpen && loopWidth > 0) {
        if (el.scrollLeft >= loopWidth) el.scrollLeft -= loopWidth;
        el.scrollLeft += (elapsed * loopWidth) / LOOP_DURATION_MS;
      }

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(frame);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    movedRef.current = false;
    draggingRef.current = event.pointerType === "mouse";
    dragStartXRef.current = event.clientX;
    dragStartScrollRef.current = event.currentTarget.scrollLeft;
    setInteracting(true);

    if (draggingRef.current) event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;

    const distance = event.clientX - dragStartXRef.current;
    if (Math.abs(distance) >= DRAG_THRESHOLD_PX) movedRef.current = true;
    event.currentTarget.scrollLeft = dragStartScrollRef.current - distance;
    event.preventDefault();
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (draggingRef.current && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    draggingRef.current = false;

    if (event.pointerType === "touch") scheduleTouchResume();
    else if (!hoveringRef.current) setInteracting(false);
  };

  return (
    <div
      ref={ref}
      className="feedback-flood"
      role="region"
      aria-label="Tin nhắn học viên. Vuốt hoặc kéo ngang để xem nhanh, chạm vào ảnh để xem đầy đủ"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          hoveringRef.current = true;
          setInteracting(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          hoveringRef.current = false;
          if (!draggingRef.current) setInteracting(false);
        }
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finishPointer}
      onPointerCancel={finishPointer}
      onScroll={() => {
        if (interactingRef.current && !draggingRef.current && !hoveringRef.current) {
          scheduleTouchResume();
        }
      }}
      onClickCapture={(event) => {
        if (!movedRef.current) return;
        event.preventDefault();
        event.stopPropagation();
        movedRef.current = false;
      }}
    >
      {children}
    </div>
  );
}
