import { Hero } from "@/components/Hero";
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

export default function Home() {
  return (
    <main>
      {/* 1 — luận điểm + chứng minh ngay lập tức */}
      <Hero />
      {/* 2 — soi gương: đúng cái khách đang gặp */}
      <Problem />
      {/* 3 — chẩn đoán: Từ / Câu / Thì */}
      <Method />
      {/* 4 — lộ trình 32 buổi, có tỉ lệ thật */}
      <Curriculum />
      {/* 5 — xem thử: video mô hình lớp + nội dung khóa */}
      <Coaching />
      {/* 6 — bằng chứng xã hội */}
      <Feedback />
      {/* 7 — người dạy */}
      <About />
      {/* 8 — giá */}
      <Pricing />
      {/* 9 — lối vào cho người còn phân vân */}
      <Trial />
      {/* 10 — gỡ nốt phản đối */}
      <Faq />
      {/* 11 — chốt: Messenger hoặc để lại SĐT */}
      <FinalCta />
      <Footer />

      <StickyCta />
    </main>
  );
}
