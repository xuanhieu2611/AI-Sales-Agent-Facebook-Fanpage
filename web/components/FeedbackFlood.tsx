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
export function FeedbackFlood({
  children,
  nhan,
  thoiLuongMs = LOOP_DURATION_MS,
}: {
  children: ReactNode;
  /** Nhãn cho trình đọc màn hình - dải ảnh và dải video nói khác nhau. */
  nhan: string;
  /** Thời gian chạy hết một vòng. Thẻ càng to thì cho càng lâu, không thì trôi nhanh như băng chuyền. */
  thoiLuongMs?: number;
}) {
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
  // Phần lẻ dưới 1px của bước trôi, cộng dồn qua các frame. Xem `tick`.
  const leRef = useRef(0);

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
      // Dừng hẳn khi khách đang mở một tấm/một video ra xem. Cờ nằm trên thẻ
      // cha (`data-flood-open`) chứ không phải một class cụ thể, để dải ảnh và
      // dải video dùng chung được cơ chế này.
      const dangXem = el.closest<HTMLElement>("[data-flood-open]") !== null;

      if (
        inViewRef.current &&
        !interactingRef.current &&
        !dangXem &&
        loopWidth > 0
      ) {
        if (el.scrollLeft >= loopWidth) el.scrollLeft -= loopWidth;

        // Chrome làm tròn `scrollLeft` về số nguyên khi đọc lại. Cộng thẳng
        // một bước nhỏ hơn 1px thì frame sau đọc ra vẫn là con số cũ, cộng
        // tiếp lại mất - dải đứng im hoàn toàn chứ không phải trôi chậm.
        // Dải càng ngắn hoặc `thoiLuongMs` càng lớn thì bước càng nhỏ, nên
        // phải giữ phần lẻ lại, đủ một pixel nguyên mới cuộn.
        const buoc = (elapsed * loopWidth) / thoiLuongMs + leRef.current;
        const nguyen = Math.floor(buoc);
        leRef.current = buoc - nguyen;
        if (nguyen > 0) el.scrollLeft += nguyen;
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
  }, [thoiLuongMs]);

  // Kéo bằng chuột nghe theo `window`, KHÔNG dùng `setPointerCapture`.
  //
  // Bắt con trỏ thì mọi pointer event sau đó bị chuyển hướng về đúng phần tử
  // đã bắt - và Chrome cũng bắn luôn `click` vào phần tử đó thay vì vào thẻ
  // nằm dưới chuột. Hệ quả: `onClick` trên từng tấm KHÔNG BAO GIỜ chạy, bấm
  // vào ảnh trên desktop không mở được lightbox (trên điện thoại vẫn mở, vì
  // nhánh touch không bắt con trỏ - nên lỗi này rất dễ lọt).
  //
  // Nghe trên `window` giữ được phần hay của capture (chuột đi ra ngoài khối
  // vẫn kéo tiếp) mà không đụng tới đích của `click`.
  const dungKeoRef = useRef<(() => void) | null>(null);

  const batDauKeo = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    draggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartScrollRef.current = el.scrollLeft;

    const onMove = (e: PointerEvent) => {
      const distance = e.clientX - dragStartXRef.current;
      if (Math.abs(distance) >= DRAG_THRESHOLD_PX) movedRef.current = true;
      el.scrollLeft = dragStartScrollRef.current - distance;
      e.preventDefault();
    };

    const ketThuc = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", ketThuc);
      window.removeEventListener("pointercancel", ketThuc);
      dungKeoRef.current = null;
      draggingRef.current = false;
      if (!hoveringRef.current) setInteracting(false);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", ketThuc);
    window.addEventListener("pointercancel", ketThuc);
    dungKeoRef.current = ketThuc;
  };

  useEffect(() => () => dungKeoRef.current?.(), []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    movedRef.current = false;
    setInteracting(true);

    // Touch cứ để trình duyệt tự cuộn - mượt hơn và có cả quán tính.
    if (event.pointerType === "mouse") batDauKeo(event);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") scheduleTouchResume();
  };

  return (
    <div
      ref={ref}
      className="feedback-flood"
      role="region"
      aria-label={nhan}
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
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onScroll={() => {
        if (
          interactingRef.current &&
          !draggingRef.current &&
          !hoveringRef.current
        ) {
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
