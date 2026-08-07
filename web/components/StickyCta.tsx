"use client";

import { useEffect, useState } from "react";
import { MESSENGER_URL } from "@/lib/site";
import { CTA, MessengerIcon } from "./ui";

/**
 * Thanh CTA dính đáy màn hình trên điện thoại. Traffic từ quảng cáo phần
 * lớn là điện thoại, không nên bắt khách cuộn ngược lên đầu trang mới
 * nhắn được. Máy tính đã có thanh đầu trang dính sẵn nên ẩn ở lg.
 *
 * Chỉ một nút: thêm nút thứ hai là bắt khách phải chọn, mà mục tiêu của
 * cả trang này chỉ có một là đưa khách qua Messenger.
 *
 * Dùng IntersectionObserver chứ không nghe sự kiện scroll. Nghe scroll thì
 * hàm chạy lại mỗi khung hình và giật trên đúng loại máy khách đang dùng.
 */
export function StickyCta() {
  const [quaDauTrang, setQuaDauTrang] = useState(false);
  const [toiCtaCuoi, setToiCtaCuoi] = useState(false);

  useEffect(() => {
    const dsQuanSat: IntersectionObserver[] = [];

    // Hiện ngay khi câu tiêu đề trôi khỏi màn hình — tức là trong lúc khách
    // đang xem hai video. Đây là lưới đỡ cho người bỏ ngang giữa video.
    const theoDoi = (id: string, dat: (hien: boolean) => void) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(([e]) => dat(e.isIntersecting), {
        threshold: 0,
      });
      o.observe(el);
      dsQuanSat.push(o);
    };

    theoDoi("dau-trang", (hien) => setQuaDauTrang(!hien));
    theoDoi("dang-ky", setToiCtaCuoi);

    return () => dsQuanSat.forEach((o) => o.disconnect());
  }, []);

  // Ẩn khi CTA cuối trang đang hiện trên màn — hai nút giống nhau chồng nhau
  // đọc như trang bị lỗi. Hero không còn nút Messenger riêng.
  const hien = quaDauTrang && !toiCtaCuoi;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/95 p-3 backdrop-blur-md transition-transform duration-[280ms] ease-[var(--ease-drawer)] lg:hidden ${
        hien ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={MESSENGER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-3.5 text-sm font-semibold whitespace-nowrap text-white transition-[transform,background-color] duration-[160ms] ease-[var(--ease-out)] active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-brand-deep"
      >
        <MessengerIcon className="h-4 w-4" />
        {CTA.loTrinh}
      </a>
    </div>
  );
}
