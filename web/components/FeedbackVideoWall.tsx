"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Play } from "@phosphor-icons/react/dist/ssr";
import { FeedbackFlood } from "./FeedbackFlood";
import type { FeedbackVideo } from "@/lib/site";

const CLOSE_DURATION_MS = 200;
/** Thẻ video rộng gần gấp đôi thẻ điện thoại, cho vòng chạy dài hơn để tốc độ trôi ngang bằng nhau. */
const LOOP_MS = 128_000;

/**
 * Dải video học viên, trôi ngang y như dải ảnh tin nhắn.
 *
 * Bấm vào một thẻ thì mở hẳn ra xem trong lightbox chứ không phát ngay tại
 * chỗ: thẻ đang trôi mà chạy video trong đó thì khách vừa đọc phụ đề vừa bị
 * kéo đi. Mở lightbox cũng là thứ dừng dải trôi lại - `data-flood-open` báo
 * cho `FeedbackFlood` ngưng cuộn, nên lúc xem thì cả khối đứng yên.
 *
 * Iframe chỉ tồn tại khi lightbox mở. Đóng lightbox là nó unmount, tiếng tắt
 * theo - không cần gọi postMessage sang YouTube để dừng.
 */
export function FeedbackVideoWall({ video }: { video: FeedbackVideo[] }) {
  const [dangXem, setDangXem] = useState<number | null>(null);
  const [dangDong, setDangDong] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mo = useCallback((index: number) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setDangXem(index);
  }, []);

  const dong = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open || dangDong) return;

    setDangDong(true);
    closeTimerRef.current = setTimeout(() => dialog.close(), CLOSE_DURATION_MS);
  }, [dangDong]);

  const chuyen = useCallback(
    (buoc: number) => {
      setDangXem((hienTai) => {
        if (hienTai === null) return null;
        return (hienTai + buoc + video.length) % video.length;
      });
    },
    [video.length],
  );

  const dangMo = dangXem !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dangMo && dialog && !dialog.open) dialog.showModal();
  }, [dangMo]);

  useEffect(() => {
    if (!dangMo) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [dangMo]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  if (video.length === 0) return null;

  const viTri = dangXem ?? 0;
  const videoDangXem = dangXem === null ? null : video[viTri];

  return (
    <div className="feedback-clips" data-flood-open={dangMo || undefined}>
      <FeedbackFlood
        nhan="Video cảm nhận của học viên. Vuốt hoặc kéo ngang để xem nhanh, chạm vào một video để phát"
        thoiLuongMs={LOOP_MS}
      >
        <div className="feedback-flood-lane">
          <div className="feedback-marquee-track">
            <LaneSet video={video} onOpen={mo} />
            <LaneSet video={video} onOpen={mo} anDanh />
          </div>
        </div>
      </FeedbackFlood>

      <div className="shell hidden motion-reduce:block">
        <div className="grid gap-5 py-6 sm:grid-cols-2 lg:grid-cols-3">
          {video.map((v, index) => (
            <TheVideo
              key={`tinh-${v.videoId}`}
              video={v}
              onOpen={() => mo(index)}
            />
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="feedback-lightbox"
        data-closing={dangDong || undefined}
        aria-label="Video cảm nhận của học viên"
        onCancel={(event) => {
          event.preventDefault();
          dong();
        }}
        onClose={() => {
          if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
          closeTimerRef.current = null;
          setDangDong(false);
          setDangXem(null);
          requestAnimationFrame(() => openerRef.current?.focus());
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dong();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") chuyen(-1);
          if (event.key === "ArrowRight") chuyen(1);
        }}
      >
        {videoDangXem ? (
          <div className="feedback-lightbox-panel">
            <div className="feedback-lightbox-video">
              <iframe
                // `key` ép React dựng iframe mới khi bấm mũi tên sang video
                // khác. Chỉ đổi `src` thì trình duyệt ghi thêm một mục vào
                // history, bấm Back mấy lần mới thoát được khỏi trang.
                key={videoDangXem.videoId}
                src={`https://www.youtube-nocookie.com/embed/${videoDangXem.videoId}?autoplay=1&rel=0`}
                title={
                  videoDangXem.ketQua ??
                  "Cảm nhận của học viên English With Bubby"
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {videoDangXem.ketQua && (
              <p className="feedback-lightbox-caption">{videoDangXem.ketQua}</p>
            )}

            <div className="feedback-lightbox-count" aria-live="polite">
              {viTri + 1} / {video.length}
            </div>

            <button
              type="button"
              className="feedback-lightbox-close"
              onClick={dong}
              aria-label="Đóng video"
            >
              <CloseIcon />
            </button>

            {video.length > 1 ? (
              <>
                <button
                  type="button"
                  className="feedback-lightbox-nav feedback-lightbox-prev"
                  onClick={() => chuyen(-1)}
                  aria-label="Xem video trước"
                >
                  <ChevronIcon />
                </button>
                <button
                  type="button"
                  className="feedback-lightbox-nav feedback-lightbox-next"
                  onClick={() => chuyen(1)}
                  aria-label="Xem video tiếp theo"
                >
                  <ChevronIcon />
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </div>
  );
}

function LaneSet({
  video,
  onOpen,
  anDanh = false,
}: {
  video: FeedbackVideo[];
  onOpen: (index: number) => void;
  anDanh?: boolean;
}) {
  return (
    <div className="feedback-marquee-set" aria-hidden={anDanh || undefined}>
      {video.map((v, index) => (
        <TheVideo
          key={`${anDanh ? "dup-" : ""}${v.videoId}`}
          video={v}
          onOpen={() => onOpen(index)}
          anDanh={anDanh}
        />
      ))}
    </div>
  );
}

function TheVideo({
  video,
  onOpen,
  anDanh = false,
}: {
  video: FeedbackVideo;
  onOpen: () => void;
  anDanh?: boolean;
}) {
  const nhan = video.ketQua ?? "Cảm nhận của học viên English With Bubby";

  return (
    <button
      type="button"
      className="feedback-phone feedback-clip"
      onClick={onOpen}
      tabIndex={anDanh ? -1 : undefined}
      aria-label={`Phát video: ${nhan}`}
    >
      <span className="feedback-phone-tilt">
        <span className="feedback-phone-screen">
          <Image
            src={`https://i.ytimg.com/vi/${video.videoId}/sddefault.jpg`}
            alt=""
            fill
            sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 360px"
            loading="lazy"
            draggable={false}
            className="object-cover"
          />
          <span className="feedback-clip-scrim" />
          <span className="feedback-clip-play">
            <Play weight="fill" aria-hidden />
          </span>
          {video.ketQua && (
            <span className="feedback-clip-caption">{video.ketQua}</span>
          )}
        </span>
      </span>
    </button>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
