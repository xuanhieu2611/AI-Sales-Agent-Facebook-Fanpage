import { CHI_SO } from "@/lib/site";

/**
 * Dải số liệu ngay dưới phần đầu trang. Trước đây nó nằm bên trong khối
 * đầu trang, đẩy nút bấm xuống dưới màn hình. Khách lạ cần thấy nút
 * trước, rồi mới tới lý do tin.
 */
export function Proof() {
  return (
    <section className="border-y border-line bg-paper-2/70 py-10">
      <dl className="shell grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {CHI_SO.map((c) => (
          <div key={c.nhan} className="flex flex-col gap-1.5">
            <dt className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              {c.so}
            </dt>
            <dd className="text-sm leading-snug text-muted">{c.nhan}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
