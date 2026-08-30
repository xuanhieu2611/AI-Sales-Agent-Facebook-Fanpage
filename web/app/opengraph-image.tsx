import { ImageResponse } from "next/og";
import { BUBBY, CONTACT } from "@/lib/site";

export const alt =
  "English with Bubby - xây gốc tiếng Anh, coaching 1-1";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Ảnh xem trước khi ai đó DÁN link này lên Facebook, Zalo, Messenger.
 *
 * Không liên quan tới ảnh của quảng cáo - quảng cáo dùng creative của
 * Bubby. Cái này lo lúc link được chia sẻ tự nhiên: đăng lên fanpage,
 * khách gửi cho bạn bè. Không có nó thì link hiện ra một ô xám trống.
 *
 * Font phải tải về chứ không dùng font mặc định: font mặc định của
 * ImageResponse không có dấu tiếng Việt, "Xây gốc" sẽ ra "X y g c".
 * Tải hỏng thì bỏ font tuỳ chỉnh chứ không cho build gãy - một tấm ảnh
 * xem trước xấu vẫn hơn là không deploy được.
 */
async function taiFont(weight: number) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@${weight}&subset=vietnamese`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const [dam, thuong] = await Promise.all([taiFont(700), taiFont(400)]);
  const fonts = [
    dam && { name: "BVP", data: dam, weight: 700 as const, style: "normal" as const },
    thuong && { name: "BVP", data: thuong, weight: 400 as const, style: "normal" as const },
  ].filter((f) => f !== null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          padding: "0 88px",
          background: "linear-gradient(140deg, #d2e7f8 0%, #ffffff 55%, #d2e7f8 100%)",
          fontFamily: fonts.length ? "BVP" : "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 400,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#2a5fd9",
          }}
        >
          {CONTACT.pageName}
        </div>

        <div
          style={{
            fontSize: 74,
            fontWeight: 700,
            // Tiếng Việt chồng hai tầng dấu - dưới ~1.2 là dấu bị cắt.
            lineHeight: 1.24,
            color: "#12203a",
            maxWidth: 940,
          }}
        >
          Nơi dành riêng cho các bạn mất gốc tiếng Anh
        </div>

        {/* Satori (bộ dựng ảnh) bắt buộc div nhiều con phải có display:flex.
            Ở đây gộp thành một chuỗi để khỏi phải nghĩ tới chuyện đó. */}
        <div style={{ fontSize: 32, fontWeight: 400, color: "#4a5a75" }}>
          {`Coaching 1-1 · ${BUBBY.namDay} xây gốc · ${BUBBY.soFollower} ${BUBBY.nhanFollower}`}
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
