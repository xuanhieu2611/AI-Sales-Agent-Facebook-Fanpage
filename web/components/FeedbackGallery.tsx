"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FeedbackFlood } from "./FeedbackFlood";
import type { AnhFeedback } from "@/lib/site";

const CLOSE_DURATION_MS = 200;

export function FeedbackGallery({ anh }: { anh: AnhFeedback[] }) {
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
        return (hienTai + buoc + anh.length) % anh.length;
      });
    },
    [anh.length],
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

  const viTriDangXem = dangXem ?? 0;
  const feedbackDangXem = dangXem === null ? null : anh[viTriDangXem];

  return (
    <div className="feedback-gallery" data-open={dangXem !== null || undefined}>
      <FeedbackFlood>
        <Lane anh={anh} onOpen={mo} />
      </FeedbackFlood>

      <div className="shell hidden motion-reduce:block">
        <div className="flex gap-5 overflow-x-auto px-1 py-6 sm:gap-6">
          {anh.map((feedback, index) => (
            <TheAnh
              key={`tinh-${feedback.src}`}
              anh={feedback}
              sizes="256px"
              onOpen={() => mo(index)}
            />
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="feedback-lightbox"
        data-closing={dangDong || undefined}
        aria-label="Ảnh phản hồi đầy đủ của học viên"
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
        {feedbackDangXem ? (
          <div className="feedback-lightbox-panel">
            <Image
              src={feedbackDangXem.src}
              alt={feedbackDangXem.alt}
              width={feedbackDangXem.rong}
              height={feedbackDangXem.cao}
              sizes="(max-width: 640px) 94vw, 720px"
              className="feedback-lightbox-image"
              priority
            />

            <div className="feedback-lightbox-count" aria-live="polite">
              {viTriDangXem + 1} / {anh.length}
            </div>

            <button
              type="button"
              className="feedback-lightbox-close"
              onClick={dong}
              aria-label="Đóng ảnh"
            >
              <CloseIcon />
            </button>

            {anh.length > 1 ? (
              <>
                <button
                  type="button"
                  className="feedback-lightbox-nav feedback-lightbox-prev"
                  onClick={() => chuyen(-1)}
                  aria-label="Xem phản hồi trước"
                >
                  <ChevronIcon />
                </button>
                <button
                  type="button"
                  className="feedback-lightbox-nav feedback-lightbox-next"
                  onClick={() => chuyen(1)}
                  aria-label="Xem phản hồi tiếp theo"
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

function Lane({
  anh,
  onOpen,
}: {
  anh: AnhFeedback[];
  onOpen: (index: number) => void;
}) {
  return (
    <div className="feedback-flood-lane">
      <div className="feedback-marquee-track" style={{ animationDuration: "96s" }}>
        <LaneSet anh={anh} onOpen={onOpen} />
        <LaneSet anh={anh} onOpen={onOpen} anDanh />
      </div>
    </div>
  );
}

function LaneSet({
  anh,
  onOpen,
  anDanh = false,
}: {
  anh: AnhFeedback[];
  onOpen: (index: number) => void;
  anDanh?: boolean;
}) {
  return (
    <div className="feedback-marquee-set" aria-hidden={anDanh || undefined}>
      {anh.map((feedback, index) => (
        <TheAnh
          key={`${anDanh ? "dup-" : ""}${feedback.src}-${index}`}
          anh={feedback}
          sizes="(max-width: 640px) 212px, (max-width: 1024px) 256px, 280px"
          onOpen={() => onOpen(index)}
          anDanh={anDanh}
        />
      ))}
    </div>
  );
}

function TheAnh({
  anh,
  sizes,
  onOpen,
  anDanh = false,
}: {
  anh: AnhFeedback;
  sizes: string;
  onOpen: () => void;
  anDanh?: boolean;
}) {
  return (
    <button
      type="button"
      className="feedback-phone"
      onClick={onOpen}
      tabIndex={anDanh ? -1 : undefined}
      aria-label={`Xem đầy đủ: ${anh.alt}`}
    >
      <span className="feedback-phone-tilt">
        <span className="feedback-phone-screen">
          <Image
            src={anh.src}
            alt={anh.alt}
            fill
            sizes={sizes}
            loading="lazy"
            draggable={false}
            className="object-cover object-top"
          />
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
