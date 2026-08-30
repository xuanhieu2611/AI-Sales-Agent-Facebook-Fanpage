"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  META_PIXEL_ID,
  REF_NGAN_CACH,
  banSuKien,
  docCookie,
} from "@/lib/tracking";

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  KHỐI ĐO LƯỜNG. Đặt một lần trong app/layout.tsx.                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Không có `NEXT_PUBLIC_META_PIXEL_ID` thì cả khối này biến mất - trang
 * chạy y hệt, không tải thêm script nào. Chạy `npm run dev` ở máy mà
 * không đặt biến thì cũng không bắn sự kiện rác vào tài khoản quảng cáo.
 *
 * CÁCH BẮT SỰ KIỆN: một trình nghe click duy nhất đặt trên `document`,
 * không phải `onClick` trên từng nút. Cố ý:
 *
 *   - Các nút CTA nằm rải trong Server Component (thẻ giá, khối chốt).
 *     Gắn `onClick` là phải kéo cả đám sang Client Component, tự nhiên
 *     nặng thêm một mớ JS trên đúng loại máy khách 4G đang dùng.
 *   - Thêm nút mới sau này chỉ cần nhớ đặt `data-cta`, không phải nhớ
 *     bọc thêm gì. Quên `data-cta` thì vẫn bắn, chỉ là vào nhóm "khac".
 */
export function MetaPixel() {
  useEffect(() => {
    if (!META_PIXEL_ID) return;

    // ── Nút CTA ──────────────────────────────────────────────────────
    const khiBam = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const a = el?.closest?.("a");
      if (!a) return;

      const href = a.getAttribute("href") ?? "";
      const kenh = href.includes("m.me")
        ? "messenger"
        : href.includes("zalo.me")
          ? "zalo"
          : "";
      if (!kenh) return;

      const viTri = a.dataset.cta || "khac";

      // Gắn hai cookie của Meta vào `ref` NGAY LÚC BẤM. Không làm sớm hơn
      // được: server không thấy cookie, mà lúc trang vừa tải thì Pixel có
      // thể chưa kịp đặt `_fbp`. Đây là mẩu dữ liệu cho phép bot nối cuộc
      // trò chuyện ngược về đúng quảng cáo - xem lib/tracking.ts.
      // `daGan` chặn việc cộng dồn: khách bấm hụt rồi bấm lại thì `ref` sẽ
      // dài gấp đôi và bot đọc không ra.
      if (kenh === "messenger" && !a.dataset.daGan) {
        // Sửa thẳng trên chuỗi, KHÔNG qua URL/URLSearchParams - chúng mã
        // hoá dấu hai chấm thành `%3A`. Xem `messengerCta` trong lib/site.ts.
        // Giá trị `_fbc` / `_fbp` chỉ gồm [A-Za-z0-9._-] nên dán thẳng
        // vào query là an toàn.
        const them = [docCookie("_fbc"), docCookie("_fbp")].join(REF_NGAN_CACH);
        const hrefMoi = href.replace(
          /([?&]ref=[^&]*)/,
          `$1${REF_NGAN_CACH}${them}`,
        );
        if (hrefMoi !== href) {
          a.setAttribute("href", hrefMoi);
          a.dataset.daGan = "1";
        }
      }

      banSuKien("Contact", { content_name: viTri, kenh });
    };

    // `capture` để chạy trước khi có gì đó nuốt mất sự kiện, và bắt cả
    // click chuột giữa / mở tab mới.
    document.addEventListener("click", khiBam, { capture: true });
    document.addEventListener("auxclick", khiBam, { capture: true });

    // ── Xem tới học phí ──────────────────────────────────────────────
    // Tín hiệu giữa phễu: khách cuộn tới bảng giá là đã qua ba video.
    // Nhiều hơn hẳn số người bấm nút, nên dùng để tối ưu quảng cáo lúc
    // ngân sách còn nhỏ, trong khi `Contact` chưa đủ số.
    let quanSat: IntersectionObserver | undefined;
    const giaEl = document.getElementById("hoc-phi");
    if (giaEl) {
      quanSat = new IntersectionObserver(
        ([mucTieu]) => {
          if (!mucTieu.isIntersecting) return;
          banSuKien("ViewContent", { content_name: "hoc_phi" });
          quanSat?.disconnect(); // một lần một phiên là đủ
        },
        // ĐỪNG đặt `threshold` theo tỉ lệ ở đây. Mục học phí CAO HƠN màn
        // hình điện thoại, nên tỉ lệ nhìn thấy được nhiều nhất chỉ khoảng
        // 0.28 - đặt ngưỡng 0.3 là sự kiện KHÔNG BAO GIỜ bắn trên điện
        // thoại, tức là mù đúng loại khách chiếm phần lớn traffic quảng cáo.
        //
        // Thay bằng một dải ngang giữa màn hình: co vùng quan sát còn 30%
        // ở giữa, rồi bắn khi mục chạm vào dải đó. Cách này không phụ thuộc
        // mục cao bao nhiêu, và vẫn giữ đúng ý "khách đã cuộn TỚI bảng giá"
        // chứ không phải "mép trên vừa ló ra".
        { threshold: 0, rootMargin: "-35% 0px -35% 0px" },
      );
      quanSat.observe(giaEl);
    }

    return () => {
      document.removeEventListener("click", khiBam, { capture: true });
      document.removeEventListener("auxclick", khiBam, { capture: true });
      quanSat?.disconnect();
    };
  }, []);

  if (!META_PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      {/* Ảnh dự phòng cho trình duyệt chặn JS. Meta yêu cầu có, và nó là
          thứ duy nhất còn đếm được khi khách bật chặn quảng cáo. */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
