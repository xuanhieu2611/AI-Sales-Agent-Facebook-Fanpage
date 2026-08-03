import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";
import { AssetPlaceholder } from "./AssetPlaceholder";
import { YouTubeLite } from "./YouTubeLite";
import { SHOW_REVIEW_PLACEHOLDERS, VIDEO } from "@/lib/site";

const CACH_VAN_HANH = [
  {
    ten: "Bài giảng quay sẵn",
    moTa: "Học theo giờ rảnh, xem lại chỗ chưa hiểu bao nhiêu lần cũng được.",
  },
  {
    ten: "Bubby sửa bài 1-1",
    moTa: "Mọi bài tập đều do Bubby sửa chi tiết. Không có chuyện làm xong để đó không ai xem.",
  },
  {
    ten: "Hỏi đáp trực tiếp",
    moTa: "Vướng chỗ nào nhắn thẳng Bubby, 9h tới 21h. Không qua trợ giảng, không chờ buổi sau.",
  },
  {
    ten: "Theo sát tiến độ",
    moTa: "Có hệ thống nhắc để bạn không bỏ ngang giữa chừng như những lần trước.",
  },
];

export function Coaching() {
  return (
    <section id="mo-hinh" className="bg-paper-2/60 py-24 sm:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-8">
            <Reveal>
              <SectionHead
                title="Coaching 1-1. Không có lớp đông."
                lead="Bên mình chỉ có mô hình này, vì đây là cách duy nhất theo sát được từng người."
              />
            </Reveal>

            <dl className="flex flex-col">
              {CACH_VAN_HANH.map((c) => (
                <Reveal key={c.ten}>
                  <div className="flex flex-col gap-1.5 border-t border-line py-5">
                    <dt className="font-display text-lg font-bold tracking-tight text-ink">
                      {c.ten}
                    </dt>
                    <dd className="max-w-[52ch] text-[0.95rem] leading-relaxed text-muted">
                      {c.moTa}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal>
            {SHOW_REVIEW_PLACEHOLDERS ? (
              <AssetPlaceholder
                type="video"
                className="aspect-video rounded-2xl"
                title="Video 60–90 giây: Bên trong buổi coaching"
                description="Dùng thumbnail lấy từ video thật: Bubby đang chữa một câu / nhận xét bài học viên trên màn hình. Video có phụ đề cháy sẵn; 5 giây đầu nói ngay người mất gốc được giải quyết gì."
              />
            ) : (
              <YouTubeLite
                id={VIDEO.moTaKhoaFull}
                title="Bên trong khóa 32 buổi Xây Gốc và Giao Tiếp"
              />
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
