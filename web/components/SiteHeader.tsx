import Link from "next/link";
import { Button, CTA, MessengerIcon } from "./ui";
import { CONTACT, MESSENGER_URL } from "@/lib/site";

/**
 * Bốn mục thôi. Trang này là một mạch đọc từ trên xuống, thanh điều hướng
 * chỉ để khách đã xem rồi quay lại tìm đúng chỗ — không phải mục lục đầy đủ.
 * Liệt kê hết mọi mục là mời khách nhảy thẳng xuống giá trước khi kịp thấy
 * lý do vì sao đáng tiền.
 */
const DE_MUC = [
  { nhan: "Lộ trình", href: "#lo-trinh" },
  { nhan: "Feedback", href: "#feedback" },
  { nhan: "Học phí", href: "#hoc-phi" },
];

/**
 * Thanh đầu trang, dính theo khi cuộn. Trước đây nút nhắn tin chỉ nằm ở
 * đầu trang rồi trôi mất, nên khách trên máy tính đọc tới giữa trang là
 * không còn chỗ nào để bấm. Trên điện thoại thì StickyCta lo việc đó.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4">
        {/* whitespace-nowrap: trên màn 390px, nút nhắn tin ăn hết ~175px nên
            tên page bị bẻ thành hai dòng ("English with" / "Bubby") và đội
            thanh đầu trang cao lên. Tên thương hiệu xuống dòng giữa chừng
            đọc như trang vỡ layout. */}
        <span className="font-display text-[0.95rem] font-extrabold tracking-tight whitespace-nowrap text-ink sm:text-lg">
          {CONTACT.pageName}
        </span>

        {/* Ẩn dưới lg: trên điện thoại chỗ đâu mà để, và khách điện thoại
            cuộn chứ không dùng menu. */}
        <nav className="hidden items-center gap-8 lg:flex">
          {DE_MUC.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="text-sm font-medium text-muted transition-colors hover:text-brand"
            >
              {m.nhan}
            </Link>
          ))}
        </nav>

        <Button
          href={MESSENGER_URL}
          external
          className="px-5 py-2.5 text-sm"
        >
          <MessengerIcon className="h-4 w-4" />
          {CTA.loTrinhNgan}
        </Button>
      </div>
    </header>
  );
}
