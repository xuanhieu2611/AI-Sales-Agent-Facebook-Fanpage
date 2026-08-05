import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CTA, MessengerIcon } from "./ui";
import { MESSENGER_URL } from "@/lib/site";
import type { AnhFeedback, FeedbackNoiBat } from "@/lib/site";

/**
 * Tường bình luận thật, chụp từ dưới video TikTok/YouTube.
 *
 * Ảnh hiện NGUYÊN TẤM, không cắt tí nào. Ảnh feedback là bình luận — dải
 * NGANG rất dẹt (có tấm 4.5:1). Nhét ảnh dẹt vào ô dọc thì `object-cover`
 * cắt mất gần hết câu chữ, đúng thứ duy nhất đáng giá trong tấm ảnh.
 *
 * XẾP KIỂU MASONRY (`columns-*`), không phải `grid`. Lý do rất cụ thể: mấy
 * tấm này cao thấp khác nhau (bình luận 1 dòng cạnh bình luận 3 dòng). Với
 * `grid`, mọi ô trong cùng một hàng bị kéo cao bằng ô cao nhất, nên tấm
 * ngắn để lại một mảng trắng dưới chân — càng thêm feedback càng nhiều lỗ.
 * `columns` thì tấm sau chèn ngay dưới tấm trước, không chừa lỗ nào, và
 * thêm bao nhiêu ảnh cũng vẫn kín.
 *
 * TỐI ĐA 2 CỘT, cố ý. Ba cột thì mỗi cột chỉ còn ~360px, mà tấm fb-01 rộng
 * 1290px sẽ co lại còn 28% — chữ bé tới mức không đọc nổi. Ảnh feedback mà
 * không đọc được thì bằng không có.
 */
export function FeedbackWall({
  anh,
  cau = [],
}: {
  anh: AnhFeedback[];
  /** Câu feedback đánh máy lại. Trộn xen vào giữa các ảnh, không đứng riêng. */
  cau?: FeedbackNoiBat[];
}) {
  const muc = tron(anh, cau);

  return (
    <div className="columns-1 gap-4 sm:columns-2 sm:gap-5">
      {muc.map((m) => (
        <div key={m.khoa} className="mb-4 break-inside-avoid sm:mb-5">
          {m.loai === "anh" ? <TheAnh anh={m.anh} /> : <TheCau cau={m.cau} />}
        </div>
      ))}

      <div className="mb-4 break-inside-avoid sm:mb-5">
        <TheChot />
      </div>
    </div>
  );
}

type Muc =
  | { loai: "anh"; khoa: string; anh: AnhFeedback }
  | { loai: "cau"; khoa: string; cau: FeedbackNoiBat };

/**
 * Trộn câu đánh máy vào giữa ảnh chụp, cứ 2 ảnh chèn 1 câu.
 *
 * Xếp riêng từng loại thành từng khối (ảnh một chỗ, câu một chỗ) thì đọc ra
 * "đây là hai đợt bằng chứng khác nhau"; trộn vào nhau thì đọc ra "đây là
 * một đống người khác nhau cùng nói", mạnh hơn hẳn. Câu đánh máy cũng chính
 * là chỗ nghỉ mắt giữa một loạt ảnh chụp trắng na ná nhau.
 */
function tron(anh: AnhFeedback[], cau: FeedbackNoiBat[]): Muc[] {
  const ra: Muc[] = [];
  let i = 0;

  anh.forEach((a, viTri) => {
    ra.push({ loai: "anh", khoa: a.src, anh: a });
    if ((viTri + 1) % 2 === 0 && i < cau.length) {
      ra.push({ loai: "cau", khoa: cau[i].cau, cau: cau[i] });
      i += 1;
    }
  });

  // Còn dư câu (ít ảnh hơn câu) thì thả nốt xuống cuối.
  for (; i < cau.length; i += 1) {
    ra.push({ loai: "cau", khoa: cau[i].cau, cau: cau[i] });
  }

  return ra;
}

/**
 * Ảnh chụp bình luận. Nền trắng vì bản thân ảnh chụp cũng nền trắng — thẻ
 * và ảnh liền một khối, đọc ra "mẩu cắt dán" chứ không phải "ảnh nhét trong
 * ô". Bóng đổ ám mực để mẩu cắt nổi khỏi nền giấy xanh của mục.
 */
function TheAnh({ anh: f }: { anh: AnhFeedback }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_14px_34px_-26px_rgba(22,35,63,0.7)]">
      <Image
        src={f.src}
        alt={f.alt}
        width={f.rong}
        height={f.cao}
        sizes="(max-width: 640px) 100vw, 540px"
        /* object-contain là lưới an toàn: lỡ `rong`/`cao` trong site.ts bị
           điền sai thì ảnh chỉ thừa viền trắng, chứ không bị kéo méo. */
        className="h-auto w-full object-contain"
      />
    </figure>
  );
}

/** Nền xoay vòng cho câu đánh máy, để mấy câu liền nhau không giống hệt nhau. */
const NEN = [
  "bg-mark-soft/80 border-mark/45",
  "bg-brand-soft/60 border-brand/20",
  "bg-surface border-line",
];

function TheCau({ cau: f }: { cau: FeedbackNoiBat }) {
  // Chọn nền theo nội dung câu chứ không theo chỉ số vòng lặp: thứ tự trộn
  // đổi thì màu vẫn bám đúng câu đó, không nhảy lung tung.
  const nen = NEN[f.cau.length % NEN.length];

  return (
    <figure
      className={`flex flex-col gap-5 rounded-xl border p-6 sm:p-7 ${nen}`}
    >
      <blockquote className="font-display text-[1.15rem] leading-[1.4] font-bold tracking-tight text-ink sm:text-[1.3rem]">
        “{f.cau}”
      </blockquote>
      <figcaption className="flex flex-col gap-0.5 text-sm">
        <span className="font-semibold text-ink">{f.ten}</span>
        <span className="text-muted">{f.ketQua}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Ô cuối tường: bắt khách ngay lúc vừa đọc xong một loạt người lạ khen. Đây
 * là điểm tin cao nhất của cả mục, để họ cuộn tiếp mới thấy chỗ bấm là phí.
 * Cũng là mảng màu đặc duy nhất trong tường — một loạt ảnh chụp nền trắng
 * cần một chỗ dừng mắt.
 */
function TheChot() {
  return (
    <Link
      href={MESSENGER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-5 rounded-xl bg-brand p-6 text-white transition-colors duration-200 hover:bg-brand-deep sm:p-7"
    >
      <p className="font-display text-[1.15rem] leading-[1.35] font-extrabold tracking-tight sm:text-[1.3rem]">
        Bạn đang kẹt ở đâu? Nhắn Bubby, mình xem rồi nói thật là nên học phần
        nào trước.
      </p>
      {/* Dùng đúng nhãn CTA.loTrinh như đầu trang / thanh dính / khối chốt.
          Đặt tên mới ("Nhắn qua Messenger") cho cùng một hành động là bắt
          khách đọc lướt phải dừng lại đoán xem hai nút này có khác nhau
          không. Xem chú thích khối CTA trong ui.tsx. */}
      <span className="inline-flex items-center gap-2 text-sm font-semibold">
        <MessengerIcon className="h-4 w-4" />
        {CTA.loTrinh}
        <ArrowUpRight
          weight="bold"
          aria-hidden
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
