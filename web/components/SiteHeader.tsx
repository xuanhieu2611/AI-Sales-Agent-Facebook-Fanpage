import { Button, CTA, MessengerIcon } from "./ui";
import { CONTACT, MESSENGER_URL } from "@/lib/site";

/**
 * Thanh đầu trang, dính theo khi cuộn. Trước đây nút nhắn tin chỉ nằm ở
 * đầu trang rồi trôi mất, nên khách trên máy tính đọc tới giữa trang là
 * không còn chỗ nào để bấm. Trên điện thoại thì StickyCta lo việc đó.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <span className="font-display text-base font-extrabold tracking-tight text-ink sm:text-lg">
          {CONTACT.pageName}
        </span>

        <Button
          href={MESSENGER_URL}
          external
          className="px-5 py-2.5 text-sm"
        >
          <MessengerIcon className="h-4 w-4" />
          {CTA.nhanTin}
        </Button>
      </div>
    </header>
  );
}
