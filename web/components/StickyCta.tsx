"use client";

import { useEffect, useState } from "react";
import { MESSENGER_URL } from "@/lib/site";
import { MessengerIcon } from "./ui";

/**
 * Thanh CTA dính đáy màn hình trên mobile. Traffic từ quảng cáo phần lớn là
 * điện thoại — không nên bắt khách cuộn ngược lên đầu trang mới nhắn được.
 * Ẩn khi khách đã cuộn tới khối đăng ký (lúc đó form đã hiện sẵn).
 */
export function StickyCta() {
  const [hien, setHien] = useState(false);

  useEffect(() => {
    const dich = document.getElementById("dang-ky");

    const doc = () => {
      const quaHero = window.scrollY > window.innerHeight * 0.8;
      const toiForm = dich
        ? dich.getBoundingClientRect().top < window.innerHeight
        : false;
      setHien(quaHero && !toiForm);
    };

    doc();
    window.addEventListener("scroll", doc, { passive: true });
    return () => window.removeEventListener("scroll", doc);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line-ink bg-ink/95 p-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        hien ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <a
          href={MESSENGER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white active:scale-[0.98]"
        >
          <MessengerIcon className="h-4 w-4" />
          Nhắn tin tư vấn
        </a>
        <a
          href="#dang-ky"
          className="flex items-center justify-center rounded-full border border-white/25 px-4 py-3 text-sm font-semibold whitespace-nowrap text-white active:scale-[0.98]"
        >
          Để lại SĐT
        </a>
      </div>
    </div>
  );
}
