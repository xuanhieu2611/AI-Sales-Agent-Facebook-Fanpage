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
  const [toiForm, setToiForm] = useState(false);

  useEffect(() => {
    const dauTrang = document.getElementById("dau-trang");
    const form = document.getElementById("dang-ky");
    const dsQuanSat: IntersectionObserver[] = [];

    if (dauTrang) {
      const o = new IntersectionObserver(
        ([e]) => setQuaDauTrang(!e.isIntersecting),
        { threshold: 0 },
      );
      o.observe(dauTrang);
      dsQuanSat.push(o);
    }

    if (form) {
      const o = new IntersectionObserver(([e]) => setToiForm(e.isIntersecting), {
        threshold: 0,
      });
      o.observe(form);
      dsQuanSat.push(o);
    }

    return () => dsQuanSat.forEach((o) => o.disconnect());
  }, []);

  const hien = quaDauTrang && !toiForm;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/95 p-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        hien ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={MESSENGER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-3.5 text-sm font-semibold whitespace-nowrap text-white active:scale-[0.98]"
      >
        <MessengerIcon className="h-4 w-4" />
        {CTA.nhanTin}
      </a>
    </div>
  );
}
