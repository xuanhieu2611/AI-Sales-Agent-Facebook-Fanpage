import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { AssetPlaceholder } from "./AssetPlaceholder";
import { Reveal } from "./Reveal";
import { Mark } from "./ui";
import { KENH, NEN_TANG } from "@/lib/site";

/**
 * Dải bằng chứng ngay dưới hai video đầu trang.
 *
 * Trước đây chỗ này là bốn con số gõ tay ("70k+ người theo dõi"). Con số
 * nằm trên chính trang bán hàng thì khách không có cách nào kiểm chứng —
 * nó đọc như lời tự khen. Ảnh chụp màn hình kênh thật, bấm vào là sang
 * thẳng kênh đó, mới là thứ khách tự đi soi được.
 *
 * Vì vậy khối này CỐ Ý ÍT CHỮ: khách vừa xem xong hai video, giờ chỉ cần
 * liếc thấy "à, có người thật, có kênh thật" rồi đi tiếp xuống feedback.
 * Đừng thêm đoạn văn vào đây.
 *
 * BỐ CỤC KHÔNG ĐỀU LÀ CỐ Ý. Ba thẻ bằng nhau xếp một hàng thì mắt không
 * biết nhìn đâu trước, mà ba kênh này không hề ngang nhau: TikTok đông gấp
 * bảy lần chỗ còn lại. Nên kênh đầu trong NEN_TANG được dựng thành thẻ lớn,
 * hai kênh sau xếp cột bên cạnh. ĐỔI THỨ TỰ TRONG `NEN_TANG` LÀ ĐỔI LUÔN
 * KÊNH NÀO ĐƯỢC LÀM THẺ LỚN.
 */
export function TrustStrip() {
  const [chinh, ...phu] = NEN_TANG;

  return (
    <section
      id="kenh"
      className="relative z-10 border-y border-line bg-surface py-16 sm:py-24"
    >
      <div className="shell">
        <Reveal>
          {/* Ngắt dòng bằng tay vì lý do y hệt câu tiêu đề đầu trang: thả tự
              do thì trên điện thoại chữ "Mở" bị bỏ lại cuối dòng trên và vệt
              bút vàng gãy làm hai. Trên máy tính câu này vốn cũng đã xuống
              dòng đúng chỗ đó, nên thêm <br /> không đổi gì ở màn rộng. */}
          <h2 className="max-w-[20ch] text-[2rem] leading-[1.24] text-ink sm:text-[2.6rem] lg:text-[3rem]">
            Không cần tin lời bên mình. <br />
            <Mark>Mở kênh ra xem thử.</Mark>
          </h2>
        </Reveal>

        {/* 3 mục → đúng 3 ô, không ô nào trống: một hàng lớn nằm ngang, rồi
            một hàng hai ô.
            KHÔNG dựng thành hình chữ L (thẻ lớn 2 cột × 2 hàng, hai thẻ nhỏ
            chồng lên nhau ở cột cuối) — đã thử và hỏng: cột hẹp đó ép ảnh
            chụp YouTube xuống còn ~145px, không ai đọc nổi dòng "476
            subscribers · 59 videos". Mà cả dải này sống bằng đúng việc khách
            đọc được con số trong ảnh rồi đối chiếu với con số bên cạnh. */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
          <Reveal className="h-full sm:col-span-2">
            <TheKenhLon nenTang={chinh} />
          </Reveal>

          {phu.map((n) => (
            <Reveal key={n.id} className="h-full">
              <TheKenhNho nenTang={n} />
            </Reveal>
          ))}
        </div>

        {/* Bằng chứng "bên này cho đi thật". Trước đây nhãn của khối này là
            chữ mono IN HOA — tiếng Việt in hoa cỡ 11px giãn chữ 0.18em thì
            dấu dính vào nhau, đọc rất mệt. Giờ để thành một câu bình thường. */}
        <Reveal>
          <div className="mt-10 rounded-2xl border border-line bg-paper-2/55 p-6 sm:mt-12 sm:p-8">
            <p className="max-w-[34ch] font-display text-[1.15rem] leading-[1.3] font-extrabold tracking-tight text-ink sm:text-[1.4rem]">
              {KENH.quaTang.length} bài học chuyên sâu đang để công khai trên kênh,
              không cần để lại email.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {KENH.quaTang.map((q) => (
                <li
                  key={q}
                  className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm leading-snug text-ink-soft"
                >
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const KHUNG =
  "group flex h-full flex-col rounded-2xl border border-line bg-paper-2/45 p-5 transition-all duration-200";
const KHUNG_BAM =
  "hover:border-brand/40 hover:bg-paper-2/80 hover:shadow-[0_20px_50px_-34px_rgba(22,35,63,0.75)]";

/**
 * Cả thẻ là một link, không phải mỗi chữ "Xem kênh" — trên điện thoại ngón
 * tay nhắm vào ảnh chứ không nhắm vào dòng chữ nhỏ dưới cùng.
 *
 * Chưa điền `url` thì thẻ tự chuyển sang dạng không bấm được, thay vì trỏ
 * vào `href=""` (bấm vào là tải lại trang — trông y như trang lỗi).
 */
function Boc({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  if (!url) return <div className={KHUNG}>{children}</div>;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${KHUNG} ${KHUNG_BAM}`}
    >
      {children}
    </Link>
  );
}

function XemKenh({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm font-semibold text-brand underline-offset-4 group-hover:underline ${className}`}
    >
      Xem kênh
      <ArrowUpRight weight="bold" aria-hidden className="h-4 w-4" />
    </span>
  );
}

/** Nhãn nền tảng + @tài khoản. Cùng một cụm ở cả hai cỡ thẻ. */
function NhanKenh({ nenTang: n }: { nenTang: (typeof NEN_TANG)[number] }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
      <span className="font-display text-sm font-bold tracking-tight text-brand">
        {n.ten}
      </span>
      <span className="font-mono text-xs break-all text-muted">{n.taiKhoan}</span>
    </div>
  );
}

/**
 * Thẻ lớn. Ảnh đứng một bên, CON SỐ được phóng to hẳn ở bên kia — con số
 * mới là thứ khách nhớ, còn ảnh chụp là thứ chứng minh con số có thật. Thẻ
 * nhỏ không đủ chỗ để làm chuyện đó nên mới cần một thẻ lớn.
 */
function TheKenhLon({ nenTang: n }: { nenTang: (typeof NEN_TANG)[number] }) {
  return (
    <Boc url={n.url}>
      <div className="grid h-full gap-5 sm:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] sm:gap-8">
        {/* 4:5 dọc, CỐ ĐỊNH ở mọi cỡ — không cho căng theo chiều cao thẻ. Ảnh
            chụp TikTok là ảnh màn hình điện thoại (1170×2397): khung dọc vừa
            đủ giữ avatar, tên kênh, dòng 70.6K Followers và nút Follow. Cho
            nó căng ra là lòi luôn cả lưới video bên dưới, đọc thành bức ảnh
            màn hình vứt vào. Khung ngang thì cắt mất gần hết.
            THAY ẢNH LÀ SOI LẠI CHỖ NÀY. */}
        <AssetPlaceholder
          className="aspect-4/5 w-full rounded-xl"
          title={`Ảnh chụp kênh ${n.ten}`}
          description={n.brief}
          src={n.anh}
          alt={`Kênh ${n.ten} của ${n.taiKhoan}`}
          viTriAnh={n.viTriAnh}
          sizes="(max-width: 640px) 100vw, 400px"
        />

        {/* items-center từ sm: cả cụm chữ (nhãn, con số, dòng chú, link) được
            canh vào GIỮA nửa phải thẻ, chữ bên trong vẫn canh trái. Dồn hết
            sang mép trái nửa phải thì bên phải con số hở ra một mảng trống to
            và ô đọc ra "bị hụt nội dung". */}
        <div className="flex flex-col justify-center gap-5 sm:items-center">
          <NhanKenh nenTang={n} />

          {/* Con số để CỰC TO là cố ý. Thẻ này rộng gần trọn bề ngang trang,
              nên nếu con số chỉ nhỉnh hơn thẻ nhỏ một chút thì nửa phải thẻ
              trống hoác và cả ô đọc ra "bị hụt nội dung". Để nó to hẳn thì ô
              này thành một tấm poster: ảnh thật bên trái, con số bên phải. */}
          <div className="flex flex-col gap-1">
            <span className="font-display text-[3.6rem] leading-[1.05] font-extrabold tracking-tight text-ink sm:text-[5.5rem] lg:text-[6.5rem]">
              {n.soLieu}
            </span>
            <span className="text-[0.95rem] leading-snug text-muted">{n.nhan}</span>
          </div>

          {n.url && <XemKenh />}
        </div>
      </div>
    </Boc>
  );
}

/** Thẻ nhỏ: ảnh nằm trên hết bề ngang thẻ, con số nằm dưới. */
function TheKenhNho({ nenTang: n }: { nenTang: (typeof NEN_TANG)[number] }) {
  return (
    <Boc url={n.url}>
      {/* 16:10 = 8:5, đúng tỉ lệ mà `viTriAnh` của hai thẻ này đã được canh
          theo. Đổi tỉ lệ là phải canh lại `viTriAnh` trong site.ts. */}
      <AssetPlaceholder
        className="aspect-16/10 w-full rounded-xl"
        title={`Ảnh chụp kênh ${n.ten}`}
        description={n.brief}
        src={n.anh}
        alt={`Kênh ${n.ten} của ${n.taiKhoan}`}
        viTriAnh={n.viTriAnh}
        sizes="(max-width: 640px) 100vw, 540px"
      />

      <div className="mt-5 flex flex-1 flex-col gap-3">
        <NhanKenh nenTang={n} />

        <div className="flex items-baseline gap-3">
          <span className="font-display text-[2.4rem] leading-[1.1] font-extrabold tracking-tight text-ink">
            {n.soLieu}
          </span>
          <span className="text-[0.95rem] leading-snug text-muted">{n.nhan}</span>
        </div>

        {n.url && <XemKenh className="mt-auto pt-2" />}
      </div>
    </Boc>
  );
}
