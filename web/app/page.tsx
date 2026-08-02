import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Proof } from "@/components/Proof";
import { Problem } from "@/components/Problem";
import { Method } from "@/components/Method";
import { Curriculum } from "@/components/Curriculum";
import { Coaching } from "@/components/Coaching";
import { Feedback } from "@/components/Feedback";
import { About } from "@/components/About";
import { Pricing } from "@/components/Pricing";
import { Trial } from "@/components/Trial";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";

/**
 * Thứ tự các mục được xếp theo đúng thứ tự câu hỏi trong đầu một khách
 * hoàn toàn chưa biết bên mình là ai:
 *
 *   cái gì đây → có thật không → mình có đúng kiểu này không → dạy sao →
 *   học cái gì → học kiểu gì → ai học rồi → ai dạy → bao nhiêu tiền →
 *   thử trước được không → còn thắc mắc gì → nhắn đi
 *
 * Đừng đảo thứ tự này nếu không có lý do. Đưa giá lên sớm là mất khách,
 * đưa bằng chứng xuống muộn cũng mất khách.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* 1 — một câu tiêu đề rồi tới video, khách lười đọc vẫn nắm được */}
        <Hero />
        {/* 2 — lý do tin, ngay dưới video */}
        <Proof />
        {/* 3 — soi gương + khối dịch thử: đúng cái khách đang gặp */}
        <Problem />
        {/* 4 — chẩn đoán: Từ / Câu / Thì, kèm ví dụ thật */}
        <Method />
        {/* 5 — lộ trình 32 buổi, có tỉ lệ thật */}
        <Curriculum />
        {/* 6 — mô hình lớp + video bên trong khóa */}
        <Coaching />
        {/* 7 — bằng chứng xã hội */}
        <Feedback />
        {/* 8 — người dạy */}
        <About />
        {/* 9 — giá */}
        <Pricing />
        {/* 10 — lối vào cho người còn phân vân */}
        <Trial />
        {/* 11 — gỡ nốt phản đối */}
        <Faq />
        {/* 12 — chốt: Messenger, Fanpage, hoặc để lại SĐT */}
        <FinalCta />
      </main>

      <Footer />
      <StickyCta />
    </>
  );
}
