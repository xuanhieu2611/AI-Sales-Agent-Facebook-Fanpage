"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button, CTA, MessengerIcon } from "./ui";
import { CONTACT, MESSENGER_URL } from "@/lib/site";

/**
 * Hai mục thôi. Trang này là một mạch đọc từ trên xuống, thanh điều hướng
 * chỉ để khách đã xem rồi quay lại tìm đúng chỗ — không phải mục lục đầy đủ.
 */
const DE_MUC = [
  { nhan: "Thông tin Khóa Học", href: "#hoc-phi" },
  { nhan: "Feedback", href: "#feedback" },
];

/**
 * Đầu trang: chữ và nút nằm trực tiếp trên trời, không có viên kính.
 * Cuộn xuống: viên kính nổi hiện ra quanh cùng layout đó.
 *
 * IntersectionObserver chứ không nghe scroll — cùng lý do với StickyCta.
 */
export function SiteHeader() {
  const moc = useRef<HTMLDivElement>(null);
  const [daCuon, setDaCuon] = useState(false);

  useEffect(() => {
    const el = moc.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => setDaCuon(!e.isIntersecting), {
      threshold: 0,
    });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <>
      <div
        ref={moc}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-10 w-full"
      />
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
        <div className="shell pt-[var(--header-pad-top)]">
          <div
            data-scrolled={daCuon ? "true" : "false"}
            /* Nền mờ PHẢI là utility Tailwind, không được viết backdrop-filter
               trong globals.css — Lightning CSS xóa mất thuộc tính chuẩn ở đó.
               Xem ghi chú dài trong globals.css chỗ .liquid-glass. */
            className="liquid-glass pointer-events-auto flex h-14 items-center justify-between gap-3 pl-4 pr-1 sm:pl-5 data-[scrolled=true]:bg-white/85 data-[scrolled=true]:backdrop-blur-2xl data-[scrolled=true]:backdrop-saturate-150 data-[scrolled=true]:backdrop-brightness-105"
          >
            <div className="liquid-glass-fill" aria-hidden />
            {/* whitespace-nowrap: trên màn 390px, nút nhắn tin ăn hết ~175px nên
                tên page bị bẻ thành hai dòng ("English with" / "Bubby") và đội
                viên kính cao lên. Tên thương hiệu xuống dòng giữa chừng
                đọc như trang vỡ layout. */}
            <span className="font-display text-[0.95rem] font-heading tracking-tight whitespace-nowrap text-ink sm:text-lg">
              {CONTACT.pageName}
            </span>

            {/* Ẩn dưới lg: trên điện thoại chỗ đâu mà để, và khách điện thoại
                cuộn chứ không dùng menu. */}
            <nav className="hidden items-center gap-8 lg:flex">
              {DE_MUC.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="text-sm font-medium text-muted transition-colors duration-[160ms] ease [@media(hover:hover)_and_(pointer:fine)]:hover:text-brand"
                >
                  {m.nhan}
                </Link>
              ))}
            </nav>

            <Button
              href={MESSENGER_URL}
              external
              className="h-11 px-4 py-2.5 text-sm sm:px-5"
            >
              <MessengerIcon className="h-4 w-4" />
              {CTA.loTrinhNgan}
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
