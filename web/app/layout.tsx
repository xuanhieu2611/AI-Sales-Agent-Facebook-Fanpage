import type { Metadata, Viewport } from "next";
import {
  Genos,
  Oswald,
  Be_Vietnam_Pro,
} from "next/font/google";
import "./globals.css";

// Display — Genos on headings. Has Vietnamese (dấu ế ỗ ữ).
const genos = Genos({
  subsets: ["latin", "vietnamese"],
  // Variable so headings can sit between Bold and ExtraBold (weight 738).
  weight: "variable",
  variable: "--font-genos",
  display: "swap",
});

// Subtitles + labels — Oswald. Variable so Regular (400) subtitles,
// Medium (500) eyebrows, and Bold (700) step numbers all work.
const oswald = Oswald({
  subsets: ["latin", "vietnamese"],
  weight: "variable",
  variable: "--font-oswald",
  display: "swap",
});

// Body — a face literally designed for Vietnamese diacritics.
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bevietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "English with Bubby: Xây gốc tiếng Anh, coaching 1-1",
  description:
    "Người Việt nói tiếng Anh bị khựng vì dịch từng chữ một. Lộ trình 32 buổi coaching 1-1 của Bubby xử lý đúng ba chỗ tiếng Việt và tiếng Anh lệch nhau: Từ, Câu, Thì.",
  openGraph: {
    title: "English with Bubby: Xây gốc tiếng Anh, coaching 1-1",
    description:
      "Bạn không dở tiếng Anh. Bạn đang dịch từng chữ một. Lộ trình 32 buổi coaching 1-1 với Bubby.",
    type: "website",
    locale: "vi_VN",
  },
};

export const viewport: Viewport = {
  // Trùng với --color-paper (màu trời fallback). Trang chỉ có một tông
  // sáng duy nhất nên không khai báo biến thể tối ở đây.
  themeColor: "#d2e7f8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`${genos.variable} ${oswald.variable} ${beVietnam.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
