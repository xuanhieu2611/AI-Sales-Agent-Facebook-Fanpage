import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Be_Vietnam_Pro,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

// Display — characterful grotesque, used big and tight. Has Vietnamese.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "vietnamese"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

// Body — a face literally designed for Vietnamese diacritics.
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bevietnam",
  display: "swap",
});

// Notation — the machine-literal voice in the translate demo, plus labels.
const jetbrains = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-jetbrains",
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
  // Trùng với --color-paper. Trang chỉ có một tông sáng duy nhất nên
  // không khai báo biến thể tối ở đây.
  themeColor: "#eef2f9",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${beVietnam.variable} ${jetbrains.variable}`}
    >
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
