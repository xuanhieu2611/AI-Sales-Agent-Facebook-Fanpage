import { CHI_SO } from "@/lib/site";

/**
 * Dải số liệu ngay dưới phần đầu trang. Trước đây nó nằm bên trong khối
 * đầu trang, đẩy nút bấm xuống dưới màn hình. Khách lạ cần thấy nút
 * trước, rồi mới tới lý do tin.
 */
export function Proof() {
  return (
    <section className="relative z-10 border-b border-line bg-surface py-9 shadow-[0_16px_40px_-38px_rgba(22,35,63,0.7)]">
      <dl className="shell grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4">
        {CHI_SO.map((c) => (
          <div key={c.nhan} className="flex flex-col gap-1.5 border-brand/15 lg:border-r lg:pr-6 lg:last:border-r-0">
            <dt className="font-display text-2xl font-extrabold tracking-tight text-brand sm:text-3xl">
              {c.so}
            </dt>
            <dd className="text-sm leading-snug text-muted">{c.nhan}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
