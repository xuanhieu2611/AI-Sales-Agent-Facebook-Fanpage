"use client";

import { useState } from "react";
import { KHOA_HOC } from "@/lib/site";

type TrangThai = "cho" | "dang-gui" | "xong" | "loi";

/** Số VN: 10 chữ số bắt đầu bằng 0, hoặc +84 / 84. */
function soHopLe(so: string) {
  const sach = so.replace(/[\s.\-()]/g, "");
  return /^(0|\+?84)(3|5|7|8|9)\d{8}$/.test(sach);
}

export function LeadForm() {
  const [ten, setTen] = useState("");
  const [sdt, setSdt] = useState("");
  const [khoa, setKhoa] = useState("");
  const [trangThai, setTrangThai] = useState<TrangThai>("cho");
  const [loi, setLoi] = useState("");

  async function guiDi(e: React.FormEvent) {
    e.preventDefault();

    if (!ten.trim()) {
      setLoi("Bạn cho mình xin tên nha.");
      return;
    }
    if (!soHopLe(sdt)) {
      setLoi("Số điện thoại chưa đúng. Bạn kiểm tra lại giúp mình nha.");
      return;
    }

    setLoi("");
    setTrangThai("dang-gui");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ten: ten.trim(), sdt: sdt.trim(), khoa }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setTrangThai("xong");
    } catch {
      setTrangThai("loi");
      setLoi(
        "Gửi không được rồi. Bạn thử lại, hoặc nhắn thẳng qua Messenger cho nhanh nha.",
      );
    }
  }

  if (trangThai === "xong") {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-brand/25 bg-brand-soft/50 p-6">
        <p className="font-display text-xl font-extrabold tracking-tight text-ink">
          Cảm ơn {ten.split(" ").slice(-1)[0]} nha!
        </p>
        <p className="text-[0.95rem] leading-relaxed text-muted">
          Bubby sẽ gọi lại cho bạn trong khung 9h tới 21h. Nếu bạn muốn được tư
          vấn ngay bây giờ thì cứ nhắn qua Messenger nha.
        </p>
      </div>
    );
  }

  const dangGui = trangThai === "dang-gui";
  const oInput =
    "w-full rounded-xl border border-line bg-paper/60 px-4 py-3.5 text-ink placeholder:text-muted transition-[border-color,background-color] duration-[160ms] ease focus:border-brand focus:bg-surface focus:outline-none";

  return (
    <form onSubmit={guiDi} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="ten" className="eyebrow text-muted">
          Tên của bạn
        </label>
        <input
          id="ten"
          name="ten"
          value={ten}
          onChange={(e) => setTen(e.target.value)}
          autoComplete="name"
          placeholder="Nguyễn Thị A"
          className={oInput}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="sdt" className="eyebrow text-muted">
          Số điện thoại
        </label>
        <input
          id="sdt"
          name="sdt"
          value={sdt}
          onChange={(e) => setSdt(e.target.value)}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="09xx xxx xxx"
          className={oInput}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="khoa" className="eyebrow text-muted">
          Khóa quan tâm <span className="normal-case">(không bắt buộc)</span>
        </label>
        <select
          id="khoa"
          name="khoa"
          value={khoa}
          onChange={(e) => setKhoa(e.target.value)}
          className={`${oInput} appearance-none`}
        >
          <option value="">Chưa rõ, nhờ Bubby tư vấn</option>
          {KHOA_HOC.map((k) => (
            <option key={k.id} value={k.ten}>
              {k.ten}
            </option>
          ))}
        </select>
      </div>

      {loi && (
        <p role="alert" className="text-sm text-flag">
          {loi}
        </p>
      )}

      <button
        type="submit"
        disabled={dangGui}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-semibold whitespace-nowrap text-white transition-[transform,background-color,opacity] duration-[160ms] ease-[var(--ease-out)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-brand-deep"
      >
        {dangGui ? "Đang gửi…" : "Gửi số cho Bubby gọi lại"}
      </button>

      <p className="font-mono text-xs leading-relaxed text-muted">
        Số của bạn chỉ dùng để tư vấn khóa học. Không gửi cho bên thứ ba.
      </p>
    </form>
  );
}
