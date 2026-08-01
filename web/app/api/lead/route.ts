import type { NextRequest } from "next/server";

/**
 * Nhận số điện thoại từ form landing page rồi đẩy sang Apps Script
 * (ghi vào Google Sheet). Xem apps-script/leads/ để biết cách dựng.
 *
 * Chạy qua route handler chứ không post thẳng từ trình duyệt, để URL
 * Apps Script không lộ ra client và không dính CORS.
 */

const WEBHOOK = process.env.LEAD_WEBHOOK_URL;
const SECRET = process.env.LEAD_WEBHOOK_SECRET ?? "";

function soHopLe(so: string) {
  const sach = so.replace(/[\s.\-()]/g, "");
  return /^(0|\+?84)(3|5|7|8|9)\d{8}$/.test(sach);
}

export async function POST(req: NextRequest) {
  let than: { ten?: string; sdt?: string; khoa?: string };

  try {
    than = await req.json();
  } catch {
    return Response.json({ ok: false, loi: "body-khong-hop-le" }, { status: 400 });
  }

  const ten = (than.ten ?? "").trim().slice(0, 100);
  const sdt = (than.sdt ?? "").trim().slice(0, 30);
  const khoa = (than.khoa ?? "").trim().slice(0, 120);

  if (!ten || !soHopLe(sdt)) {
    return Response.json({ ok: false, loi: "thieu-thong-tin" }, { status: 400 });
  }

  const lead = {
    ten,
    sdt,
    khoa: khoa || "Chưa rõ",
    nguon: req.headers.get("referer") ?? "landing",
    luc: new Date().toISOString(),
  };

  // Chưa cấu hình webhook → vẫn nhận lead, chỉ log ra để test cục bộ.
  if (!WEBHOOK) {
    console.log("[lead] chưa đặt LEAD_WEBHOOK_URL, lead nhận được:", lead);
    return Response.json({ ok: true, luuTru: "log" });
  }

  try {
    const res = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, secret: SECRET }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) throw new Error(`apps-script tra ve ${res.status}`);
  } catch (err) {
    // Không nuốt lỗi im lặng: mất một lead là mất tiền quảng cáo thật.
    console.error("[lead] đẩy sang Apps Script thất bại:", err, lead);
    return Response.json({ ok: false, loi: "khong-luu-duoc" }, { status: 502 });
  }

  return Response.json({ ok: true, luuTru: "sheet" });
}
