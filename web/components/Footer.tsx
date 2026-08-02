import Link from "next/link";
import {
  CONTACT,
  FANPAGE_URL,
  KENH_URL,
  SO_DIEN_THOAI,
  ZALO_URL,
} from "@/lib/site";

/** Chỉ giữ lại những link đã điền — link rỗng ở chân trang là lỗi lộ ra ngoài. */
const LIEN_KET = [
  { nhan: "Fanpage English with Bubby", href: FANPAGE_URL },
  { nhan: "Kênh English with Bubby", href: KENH_URL },
  { nhan: "Zalo", href: ZALO_URL },
  SO_DIEN_THOAI
    ? {
        nhan: SO_DIEN_THOAI,
        href: `tel:${SO_DIEN_THOAI.replace(/[^\d+]/g, "")}`,
      }
    : { nhan: "", href: "" },
].filter((l) => l.href);

export function Footer() {
  return (
    <footer className="bg-brand-deep py-10">
      <div className="shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-base font-extrabold tracking-tight text-white">
          {CONTACT.pageName}
        </span>

        <div className="flex flex-col gap-2 sm:items-end">
          <div className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
            {LIEN_KET.map((l) => (
              <Link
                key={l.nhan}
                href={l.href}
                target={l.href.startsWith("tel:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                {l.nhan}
              </Link>
            ))}
          </div>
          <p className="font-mono text-xs text-white/60">
            Xây gốc tiếng Anh · Coaching 1-1 · {CONTACT.gioLamViec}
          </p>
        </div>
      </div>
    </footer>
  );
}
