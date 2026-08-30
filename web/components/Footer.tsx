import Link from "next/link";
import {
  CONTACT,
  FANPAGE_URL,
  KENH_URL,
  ZALO_SO_DIEN_THOAI,
  ZALO_URL,
} from "@/lib/site";

/** Chỉ giữ lại những link đã điền — link rỗng ở chân trang là lỗi lộ ra ngoài. */
const LIEN_KET = [
  { nhan: "Fanpage English with Bubby", href: FANPAGE_URL },
  { nhan: "Kênh English with Bubby", href: KENH_URL },
  { nhan: ZALO_URL ? `Zalo: ${ZALO_SO_DIEN_THOAI}` : "Zalo", href: ZALO_URL },
  // Meta duyệt quảng cáo có tìm link này trên trang đích. Đừng bỏ.
  { nhan: "Chính sách bảo mật", href: "/chinh-sach" },
].filter((l) => l.href);

export function Footer() {
  return (
    <footer className="bg-brand-deep py-10">
      <div className="shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-base font-heading tracking-tight text-white">
          {CONTACT.pageName}
        </span>

        <div className="flex flex-col gap-2 sm:items-end">
          <div className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
            {LIEN_KET.map((l) => (
              <Link
                key={l.nhan}
                href={l.href}
                /* Link nội bộ mở tab mới đọc như trang bị lỗi. */
                {...(l.href.startsWith("/")
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                {l.nhan}
              </Link>
            ))}
          </div>
          <p className="font-subtitle text-xs text-white/60">
            Xây gốc tiếng Anh · Coaching 1-1 · {CONTACT.gioLamViec}
          </p>
        </div>
      </div>
    </footer>
  );
}
