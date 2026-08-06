import Link from "next/link";
import type { ReactNode } from "react";
import { CaretDown, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { YouTubeLite } from "./YouTubeLite";
import { AssetPlaceholder } from "./AssetPlaceholder";
import { Button, CTA, Mark, MessengerIcon } from "./ui";
import { CONTACT, MESSENGER_URL, SHOW_REVIEW_PLACEHOLDERS, VIDEO } from "@/lib/site";

/**
 * Hero theo format "lời hứa lớn → hai video → nút". Với dịch vụ coaching cá
 * nhân, video là bằng chứng sớm nhất: khách thấy Bubby nói và dạy thế nào
 * trước khi phải đọc bất cứ thứ gì bên dưới.
 *
 * Hero này CỐ Ý cao hơn một màn hình. Thứ tự lời hứa → video 1 → video 2 →
 * nút là mạch bán hàng của chủ shop, đừng nén lại cho vừa màn hình đầu.
 *
 * Hai video được ĐÁNH SỐ (Bước 1, Bước 2) vì cái số kéo người xem hết video
 * một sang video hai. Nhưng NÚT THÌ KHÔNG ĐÁNH SỐ, cố ý:
 *
 *   - "Bước 3" nói dối về cấu trúc trang. Dưới nút này còn sáu mục nữa;
 *     khách đọc thấy bước cuối rồi không bấm sẽ tưởng mình đi lạc.
 *   - Bước 1 và 2 không tốn gì của khách. Bấm nút thì tốn: họ phải nhắn tin
 *     cho người lạ. Đánh số ba cái như nhau là hứa một đằng đòi một nẻo.
 *
 * Nút vẫn phải nằm ĐÚNG CHỖ NÀY. Xem xong hai video là lúc khách tin nhất
 * trên cả trang; bắt người đã bị thuyết phục cuộn tiếp đi tìm chỗ bấm là
 * mất họ. StickyCta chỉ là lưới đỡ, không thay được nút trong mạch đọc.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 sm:pb-20">
      {/* Hai vệt sáng lệch nhau, không phải một khối đối xứng giữa trang:
          nền có hướng thì cả khối chữ bên trên đỡ bị phẳng. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-44 left-1/2 h-[36rem] w-[58rem] -translate-x-1/2 rounded-full bg-brand-soft/75 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-[8%] h-[22rem] w-[26rem] rounded-full bg-mark-soft/70 blur-[110px]"
      />

      <div className="shell relative flex flex-col items-center pt-10 text-center sm:pt-14">
        {/* Mốc cho StickyCta: sau khi khách đã thấy lời hứa, thanh Messenger
            sẽ xuất hiện trên điện thoại trong lúc họ xem video. */}
        <div id="dau-trang" className="flex max-w-[76rem] flex-col items-center gap-6">
          <span className="eyebrow inline-flex w-fit items-center rounded-full border border-brand/25 bg-brand-soft/60 px-3.5 py-1.5 text-brand">
            Coaching 1-1 · Xây gốc tiếng Anh
          </span>

          {/* Ngắt dòng bằng tay, ở MỌI cỡ màn hình. Thả cho tự xuống dòng thì
              cụm được tô vàng bị cắt làm đôi giữa chừng ("mất" ở cuối dòng
              trên, "gốc tiếng Anh" ở dòng dưới) và vệt bút gãy thành hai
              mẩu — nhìn như lỗi hiển thị. Ngắt ở đây thì cả cụm luôn nằm
              trọn một dòng và ăn đúng một vệt bút. */}
          {/* 2.1rem trên điện thoại là cỡ LỚN NHẤT mà cụm "mất gốc tiếng Anh"
              còn nằm vừa một dòng ở màn 390px. To hơn là nó tụt chữ "Anh"
              xuống dòng riêng và vệt bút vàng gãy làm hai mẩu. */}
          <h1 className="max-w-[20ch] text-[2.1rem] leading-[1.22] text-ink sm:text-[3.3rem] lg:text-[3.9rem]">
            Nơi dành riêng cho các bạn <br />
            <Mark>mất gốc tiếng Anh</Mark>
          </h1>

          {/* MỘT dòng, không phải đoạn văn. Câu tiêu đề ở trên mới chỉ nói
              "chỗ này dành cho ai"; dòng này nói "học xong thì được gì" —
              thiếu nó thì cả nửa trên không hứa hẹn điều gì cả.
              Không nới thành đoạn: traffic quảng cáo không đọc đoạn văn. */}
          <p className="max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-soft sm:text-[1.15rem]">
            Học lại từ gốc, và có Bubby trực tiếp sửa bài cho bạn suốt khóa.
          </p>
        </div>

        <BuocXem so={1}>Vì sao bạn học mãi không hiệu quả?</BuocXem>

        <KhungVideo>
          <YouTubeLite
            id={VIDEO.gioiThieu}
            title="Vì sao bạn học mãi không hiệu quả"
            priority
            hienTieuDe={false}
          />
        </KhungVideo>

        {/* Lối tắt cho người đã bị thuyết phục ngay từ video một. Cố ý để
            dạng link chữ nhỏ chứ không phải nút: nút thứ hai ở đây sẽ tranh
            chỗ với video hai, mà video hai mới là thứ chốt phần lớn khách. */}
        <Link
          href={MESSENGER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 text-sm font-semibold text-brand underline underline-offset-4 decoration-brand/35 transition-colors duration-[160ms] ease [@media(hover:hover)_and_(pointer:fine)]:hover:decoration-brand"
        >
          Thấy đúng chỗ mình đang kẹt rồi? Nhắn Bubby luôn
        </Link>

        <BuocXem so={2}>{CONTACT.pageName} giúp được gì cho bạn?</BuocXem>

        <KhungVideo>
          {SHOW_REVIEW_PLACEHOLDERS ? (
            <AssetPlaceholder
              type="video"
              className="aspect-video rounded-2xl"
              title="Video: English with Bubby giúp được gì cho bạn"
              description="Bubby giải thích khóa học, cách dạy, và lộ trình sẽ giúp học viên như thế nào. Video có phụ đề cháy sẵn."
            />
          ) : (
            <YouTubeLite
              id={VIDEO.giaiPhap}
              title="English with Bubby giúp được gì cho bạn"
              hienTieuDe={false}
            />
          )}
        </KhungVideo>

        {/* id để StickyCta biết đường tự ẩn khi nút này đang hiện trên màn
            hình — hai nút giống hệt nhau chồng lên nhau trông như lỗi. */}
        <div id="cta-dau-trang" className="mt-10 flex flex-col items-center gap-3">
          <Button href={MESSENGER_URL} external className="px-7">
            <MessengerIcon className="h-5 w-5" />
            {CTA.loTrinh}
          </Button>

          {/* Dòng này trả lời nỗi sợ ngay tại giây bấm nút: "nhắn vào có phải
              gặp bot không, có ai rep không". Đừng bỏ, và đừng tách rời nút. */}
          <p className="flex items-center gap-2 text-sm leading-relaxed text-muted">
            <CheckCircle weight="fill" aria-hidden className="h-4 w-4 shrink-0 text-brand" />
            Bubby trực tiếp tư vấn, {CONTACT.gioLamViec}
          </p>

          {/* Nói thẳng là trang còn tiếp, để người chưa sẵn sàng bấm không
              tưởng mình vừa đi tới cuối đường. Link phải trỏ đúng mục feedback:
              trước đây chữ hứa "xem học viên nói gì" mà lại nhảy sang mục kênh. */}
          <Link
            href="#feedback"
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-[160ms] ease [@media(hover:hover)_and_(pointer:fine)]:hover:text-brand"
          >
            Hoặc kéo xuống xem người học nói gì
            <CaretDown weight="bold" aria-hidden className="h-4 w-4 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Mốc "Bước N" trước mỗi video.
 *
 * Trước đây chỗ này là một dòng chữ xanh đậm in đậm Viết Hoa Từng Chữ. Nó
 * hét to ngang câu tiêu đề chính nên cả nửa trên có hai giọng cùng gào, mà
 * lại không chỉ xuống video nào cả.
 *
 * Giờ số nằm trong một chấm tròn, chữ để cỡ vừa màu mực, và có một vạch dọc
 * mờ dần phía trên. Vạch đó làm việc thật: nó nối khối vừa đọc xong xuống
 * video ngay dưới, đúng cái việc mà con số được đặt ra để làm.
 */
function BuocXem({ so, children }: { so: number; children: ReactNode }) {
  return (
    <div className="mt-8 flex flex-col items-center sm:mt-10">
      {/* Vạch dài, bắt đầu từ trong suốt: nó phải đọc ra "nối từ trên xuống",
          không phải "một cái gạch nhỏ lửng lơ". Ngắn quá là thành gạch. */}
      <span
        aria-hidden
        className="h-20 w-px bg-linear-to-b from-transparent to-brand/45 sm:h-24"
      />
      {/* Điện thoại xếp dọc, máy tính xếp ngang. Trên màn hẹp câu nhãn xuống
          hai dòng, mà xếp ngang thì cái chấm số bị canh vào giữa hai dòng đó,
          trôi lửng lơ không dính vào dòng nào. Xếp dọc là hết, và nó nối
          thẳng mạch với cái vạch dọc ngay bên trên. */}
      <span className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:gap-3.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand font-mono text-[0.8rem] font-bold text-white">
          {so}
        </span>
        {/* leading-[1.25] bắt buộc: cụm này hay có dấu chồng hai tầng (hiệu quả). */}
        <span className="font-display text-[1.2rem] leading-[1.3] font-extrabold tracking-tight text-ink sm:text-[1.6rem] sm:leading-[1.25]">
          {children}
        </span>
      </span>
    </div>
  );
}

/**
 * Khung cho video. Bóng đổ ám màu mực (không phải đen thuần) để tấm video
 * nổi khỏi nền giấy xanh — nếu không nó chỉ là một ô chữ nhật dán phẳng.
 */
function KhungVideo({ children }: { children: ReactNode }) {
  return (
    <div className="mt-7 w-full max-w-4xl rounded-2xl shadow-[0_38px_75px_-45px_rgba(22,35,63,0.65)]">
      {children}
    </div>
  );
}
