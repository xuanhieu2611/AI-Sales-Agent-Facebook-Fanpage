import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
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
 *   bao nhiêu tiền / khóa nào → người học xong nói sao → nhắn đi
 *
 * Nửa trên CỐ Ý KHÔNG CÓ CHỮ ĐỂ ĐỌC: hai video rồi tới thông tin khóa.
 * Traffic quảng cáo trên điện thoại không đọc đoạn văn, nên mọi
 * thứ phải thuyết phục được ở dạng xem. Chữ để dành cho nửa dưới, chỗ
 * khách đã quan tâm đủ để muốn biết chi tiết.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* 1 — lời hứa + video vấn đề + video giải pháp + nút */}
        <Hero />
        {/* 2 — thông tin khóa / giá */}
        <Pricing />
        {/* 3 — bằng chứng xã hội */}
        <Feedback />
        {/* 4 — chốt: nhắn Facebook hoặc Zalo */}
        <FinalCta />
      </main>

      <Footer />
      <StickyCta />
    </>
  );
}
