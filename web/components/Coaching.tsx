import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";
import { YouTubeLite } from "./YouTubeLite";
import { VIDEO } from "@/lib/site";

const CACH_VAN_HANH = [
  {
    ten: "Bài giảng quay sẵn",
    moTa: "Bạn học theo giờ rảnh của mình, xem đi xem lại chỗ chưa hiểu, đi theo tốc độ hiểu bài của bạn chứ không phải tốc độ của lớp.",
  },
  {
    ten: "Bubby sửa bài 1-1",
    moTa: "Mọi bài tập đều do Bubby sửa chi tiết cho riêng bạn. Không có chuyện làm xong rồi để đó không ai xem.",
  },
  {
    ten: "Hỏi đáp trực tiếp",
    moTa: "Vướng chỗ nào thì nhắn thẳng cho Bubby trong khung 9h–21h mỗi ngày. Không qua trợ giảng, không chờ tới buổi sau.",
  },
  {
    ten: "Theo sát tiến độ",
    moTa: "Có hệ thống nhắc nhở và bám tiến độ của từng người, để bạn không bỏ ngang giữa chừng như những lần trước.",
  },
];

export function Coaching() {
  return (
    <section id="mo-hinh" className="bg-ink py-24 sm:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-8">
            <Reveal>
              <SectionHead
                onInk
                eyebrow="Mô hình lớp"
                title="Coaching 1-1. Không có lớp đông."
                lead="Bên mình chỉ có duy nhất mô hình này — tất cả lớp đã chuyển sang coaching 1-1 vì đây là cách duy nhất theo sát được từng người."
              />
            </Reveal>

            <dl className="flex flex-col">
              {CACH_VAN_HANH.map((c) => (
                <Reveal key={c.ten}>
                  <div className="flex flex-col gap-1.5 border-t border-line-ink py-5">
                    <dt className="font-display text-lg font-bold tracking-tight text-white">
                      {c.ten}
                    </dt>
                    <dd className="max-w-[52ch] text-[0.95rem] leading-relaxed text-muted-ink">
                      {c.moTa}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal className="flex flex-col gap-4">
            <YouTubeLite
              id={VIDEO.moHinhCoaching}
              title="Mô hình lớp Coaching 1-1 hoạt động thế nào"
            />
            <YouTubeLite
              id={VIDEO.moTaKhoaFull}
              title="Bên trong khóa 32 buổi Xây Gốc + Giao Tiếp"
            />
            <p className="font-mono text-xs text-muted-ink/70">
              Bấm để xem — video mở ngay trên trang.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
