import Link from "next/link";
import { CONTACT, FANPAGE_URL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-brand-deep py-10">
      <div className="shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-base font-extrabold tracking-tight text-white">
          {CONTACT.pageName}
        </span>

        <div className="flex flex-col gap-2 sm:items-end">
          <Link
            href={FANPAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white underline-offset-4 hover:underline"
          >
            Fanpage English with Bubby
          </Link>
          <p className="font-mono text-xs text-white/60">
            Xây gốc tiếng Anh · Coaching 1-1 · {CONTACT.gioLamViec}
          </p>
        </div>
      </div>
    </footer>
  );
}
