import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  // Repo gốc cũng là một project Node (bot Messenger), nên phải chỉ rõ
  // thư mục này mới là gốc của web, không thì Turbopack chọn nhầm.
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },
  images: {
    remotePatterns: [
      // thumbnail YouTube cho khối video (xem components/YouTubeLite.tsx)
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
