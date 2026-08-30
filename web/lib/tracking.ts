/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  ĐO LƯỜNG QUẢNG CÁO - Meta Pixel + bàn giao dữ liệu cho bot.      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * VẤN ĐỀ CỦA TRANG NÀY: khách không "chuyển đổi" trên web. Họ bấm nút
 * rồi nhảy sang Messenger hoặc Zalo, và Pixel không nhìn thấy gì sau đó.
 * Nên ở đây có hai lớp đo, mạnh yếu khác nhau, đừng nhầm lẫn:
 *
 *   1. `Contact` (Pixel, trong trình duyệt) - bắn lúc khách BẤM nút.
 *      Chỉ là tín hiệu thay thế. Meta tối ưu theo cái này sẽ đi tìm
 *      người hay bấm, không phải người thật sự nhắn tin.
 *
 *   2. `Lead` (CAPI, từ bot bắn về) - bắn khi CUỘC TRÒ CHUYỆN có thật
 *      bắt đầu. Đây mới là sự thật. Muốn có nó thì bot phải đọc được
 *      tham số `ref` mà trang này gắn vào link m.me - xem `REF_*` bên dưới.
 */

/** Lấy từ Events Manager → Data sources. Trống thì mọi thứ ở đây tự tắt. */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

/**
 * Tên vị trí của từng nút CTA trên trang. Đây là thứ trả lời câu hỏi
 * "khách nhắn tin sau khi xem tới đâu?" - nút ở đầu trang nghĩa là khách
 * tin ngay từ video 1, nút ở thẻ giá nghĩa là họ đã cân nhắc học phí.
 * Hai loại khách đó chốt khác nhau, nên đừng gộp chung một tên.
 *
 * CHỈ DÙNG [a-z0-9_]. Giá trị này đi vào tham số `ref` của link m.me, và
 * Meta chỉ cho phép một tập ký tự hẹp ở đó.
 */
export const VI_TRI = {
  thanhDauTrang: "header",
  thanhDinhDay: "sticky",
  theGia: "gia",
  baiHocThu: "hoc_thu",
  duoiFeedback: "feedback",
  chotCuoiTrang: "chot",
} as const;

export type ViTri = (typeof VI_TRI)[keyof typeof VI_TRI];

/**
 * Định dạng của tham số `ref` gắn vào link m.me.
 *
 *     lp:<viTri>:<fbc>:<fbp>
 *
 * `fbc` và `fbp` là hai cookie do chính Pixel đặt ra. Chúng là thứ Meta
 * dùng để nối cuộc trò chuyện trong Messenger ngược về đúng cái quảng cáo
 * đã trả tiền. Không có chúng thì sự kiện `Lead` bot bắn về gần như không
 * được quy cho quảng cáo nào cả.
 *
 * PHÍA BOT (repo gốc) cần làm: tách chuỗi này ở webhook `messaging_referrals`
 * (khách đã từng nhắn) và `messaging_postbacks` (khách nhắn lần đầu, ref
 * nằm trong postback của nút Get Started), rồi gửi CAPI `Lead` kèm
 * `fbc` / `fbp` vừa đọc được.
 *
 * Server render sẵn phần `lp:<viTri>`, phần cookie do trình duyệt gắn thêm
 * ngay lúc bấm - xem `MetaPixel.tsx`. Server không đọc được cookie của Meta.
 */
export const REF_TIEN_TO = "lp";
export const REF_NGAN_CACH = ":";

/** Ghép phần `ref` mà server dựng được. Phần cookie thêm ở phía trình duyệt. */
export function refCoBan(viTri: ViTri) {
  return `${REF_TIEN_TO}${REF_NGAN_CACH}${viTri}`;
}

/* ── Phía trình duyệt ────────────────────────────────────────────── */

type FbqSuKien = "PageView" | "ViewContent" | "Contact" | "Lead";

declare global {
  interface Window {
    fbq?: {
      (...args: unknown[]): void;
      queue?: unknown[];
      loaded?: boolean;
      callMethod?: (...args: unknown[]) => void;
    };
    _fbq?: unknown;
  }
}

/**
 * Bắn một sự kiện chuẩn của Meta.
 *
 * `eventID` là bắt buộc chứ không phải tuỳ chọn: sau này bot bắn CAPI về
 * cùng một sự kiện, Meta dựa vào ID này để biết đó là MỘT lần chứ không
 * phải hai. Thiếu nó thì mọi con số bị đếm đôi.
 */
export function banSuKien(suKien: FbqSuKien, thamSo?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", suKien, thamSo ?? {}, { eventID: taoId() });
}

function taoId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Đọc một cookie. Trả về chuỗi rỗng nếu không có - không trả `undefined`
 *  để chỗ ghép `ref` khỏi phải kiểm tra thêm một lần nữa. */
export function docCookie(ten: string) {
  if (typeof document === "undefined") return "";
  const khop = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${ten}=([^;]*)`),
  );
  return khop ? decodeURIComponent(khop[1]) : "";
}
