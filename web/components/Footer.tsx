import { CONTACT } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line-ink bg-ink py-10">
      <div className="shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-base font-extrabold tracking-tight text-white">
          {CONTACT.pageName}
        </span>
        <p className="font-mono text-xs text-muted-ink/60">
          Xây gốc tiếng Anh · Coaching 1-1 · {CONTACT.gioLamViec}
        </p>
      </div>
    </footer>
  );
}
