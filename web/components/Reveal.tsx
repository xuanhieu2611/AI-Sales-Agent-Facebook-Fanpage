import type { ReactNode } from "react";

/**
 * Hiệu ứng hiện dần khi cuộn tới — làm bằng CSS scroll-driven animation
 * (xem `@utility reveal` trong globals.css), không dùng JavaScript.
 *
 * Quan trọng: trình duyệt nào không hỗ trợ thì nội dung hiện bình thường
 * ngay từ đầu. Không bao giờ được để khách vào trang mà thấy trang trắng
 * vì JS chưa chạy kịp — traffic quảng cáo phần lớn là 4G.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
