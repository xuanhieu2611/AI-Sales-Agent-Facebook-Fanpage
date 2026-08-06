import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Curriculum } from "@/components/Curriculum";
import { Feedback } from "@/components/Feedback";
import { Pricing } from "@/components/Pricing";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";

/**
 * Thứ tự các mục được xếp theo đúng thứ tự câu hỏi trong đầu một khách
 * hoàn toàn chưa biết bên mình là ai:
 *
 *   mình đang sai chỗ nào → bên này chữa kiểu gì → có thật không →
 *   người học xong nói sao → học cái gì →
 *   bao nhiêu tiền → nhắn đi
 *
 * Nửa trên CỐ Ý KHÔNG CÓ CHỮ ĐỂ ĐỌC: hai video rồi tới feedback. Traffic
 * quảng cáo trên điện thoại không đọc đoạn văn, nên mọi
 * thứ phải thuyết phục được ở dạng xem. Chữ để dành cho nửa dưới, chỗ
 * khách đã quan tâm đủ để muốn biết chi tiết.
 *
 * Đừng đảo thứ tự này nếu không có lý do. Đưa giá lên sớm là mất khách,
 * đưa bằng chứng xuống muộn cũng mất khách.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* 1 — lời hứa + video vấn đề + video giải pháp + nút */}
        <Hero />
        {/* 2 — bằng chứng xã hội */}
        <Feedback />
        {/* 3 — lộ trình 32 buổi, có tỉ lệ thật */}
        <Curriculum />
        {/* 4 — giá */}
        <Pricing />
        {/* 5 — chốt: Messenger, Fanpage, hoặc để lại SĐT */}
        <FinalCta />
      </main>

      <Footer />
      <StickyCta />
    </>
  );
}
