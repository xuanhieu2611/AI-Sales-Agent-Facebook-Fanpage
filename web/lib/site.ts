/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  FILE BẠN CHỈNH SỬA cho trang landing.                            ║
 * ║  Giá, link, ưu đãi, thông tin liên hệ — sửa ở đây, không sửa      ║
 * ║  trong các file giao diện.                                        ║
 * ║  Chỗ nào còn [ĐIỀN...] là chỗ cần điền thông tin thật vào.        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

// ── LIÊN HỆ ──────────────────────────────────────────────────────────
// TODO(chủ shop): thay bằng username thật của Page.
// Vào Trang Facebook → Giới thiệu → tên người dùng (vd. facebook.com/englishwithbubby)
// rồi ghép thành https://m.me/englishwithbubby
export const MESSENGER_URL = "https://m.me/englishwithbubby";

export const CONTACT = {
  gioLamViec: "9h – 21h mỗi ngày",
  pageName: "English with Bubby",
};

// ── ƯU ĐÃI ───────────────────────────────────────────────────────────
// Sửa mỗi khi đổi chương trình. Để trống `nhan` nếu muốn ẩn hết badge ưu đãi.
export const UU_DAI = {
  nhan: "Ưu đãi tháng này",
  moTa: "Giữ giá ưu đãi bằng cọc 300k nếu bạn chưa sắp xếp kịp học phí.",
};

// ── KHÓA HỌC ─────────────────────────────────────────────────────────
export type Khoa = {
  id: string;
  ten: string;
  tomTat: string;
  giaSale: string;
  giaGoc: string;
  buoi: string;
  coaching: string;
  gomCo: string[];
  noiBat?: boolean;
  videoId?: string;
};

export const KHOA_HOC: Khoa[] = [
  {
    id: "phat-am",
    ten: "Khóa Phát Âm",
    tomTat: "Sửa gốc phát âm để người ta nghe ra bạn đang nói gì.",
    giaSale: "500.000đ",
    giaGoc: "800.000đ",
    buoi: "8 buổi",
    coaching: "1 tháng coaching 1-1",
    gomCo: [
      "Hệ thống ký hiệu mặt chữ – số do Bubby tự nghiên cứu",
      "Cách kết hợp âm, nối âm trong tiếng Anh",
      "Luyện ngữ điệu và luyện giọng",
      "Cách nhớ phát âm của từ nhiều âm tiết",
    ],
    videoId: "KR5BFR5SUwA",
  },
  {
    id: "full",
    ten: "Khóa Full — Xây Gốc + Giao Tiếp",
    tomTat:
      "Trọn bộ nền tảng: phát âm, từ vựng, kỹ năng dịch, giao tiếp thực chiến.",
    giaSale: "2.500.000đ",
    giaGoc: "3.200.000đ",
    buoi: "32 buổi",
    coaching: "9 tháng coaching 1-1",
    gomCo: [
      "Cả 4 phần của lộ trình — không thiếu mảng nào",
      "Bubby sửa bài 1-1 chi tiết suốt khóa",
      "Hỗ trợ cọc 300k giữ giá ưu đãi",
      "Học linh hoạt theo giờ rảnh của bạn",
    ],
    noiBat: true,
    videoId: "kpnz_RE1bPg",
  },
  {
    id: "dich",
    ten: "Khóa Kỹ Năng Dịch",
    tomTat: "Phần lõi: xử lý chỗ tiếng Việt và tiếng Anh lệch nhau.",
    giaSale: "1.700.000đ",
    giaGoc: "2.100.000đ",
    buoi: "21 buổi",
    coaching: "5 tháng coaching 1-1",
    gomCo: [
      "Xây dựng vốn từ + phản xạ từ vựng",
      "Quy trình dịch Việt → Anh đầy đủ các bước",
      "Ngữ pháp theo 3 phân khúc: Từ – Câu – Thì",
      "Tận dụng vốn từ sẵn có thay vì tra từ điển",
    ],
    videoId: "MMDzjWAL9ao",
  },
];

// ── VIDEO ────────────────────────────────────────────────────────────
export const VIDEO = {
  moHinhCoaching: "3D_fUgUmIAk",
  moTaKhoaFull: "kpnz_RE1bPg",
};

// ── LỘ TRÌNH 32 BUỔI ────────────────────────────────────────────────
export const LO_TRINH = [
  {
    ten: "Phát âm",
    buoi: 8,
    moTa: "Ghi nhớ và phát âm đúng bằng hệ thống ký hiệu mặt chữ – số riêng của Bubby, liên kết được với IPA. Kèm 2 buổi luyện ngữ điệu và luyện giọng.",
  },
  {
    ten: "Kỹ năng học từ vựng",
    buoi: 2,
    moTa: "Một routine tự học từ vựng mỗi ngày: xây vốn từ thực chiến, ghi nhớ, đặt câu, tạo phản xạ, và lọc – quản lý từ đã học.",
  },
  {
    ten: "Kỹ năng dịch Việt → Anh",
    buoi: 18,
    moTa: "Phần lõi của giáo án. Xử lý các điểm khác biệt quan trọng giữa hai ngôn ngữ trong ba phân khúc Từ – Câu – Thì, cho tới khi bạn dịch được bất kỳ câu nào.",
  },
  {
    ten: "Giao tiếp thực chiến",
    buoi: 4,
    moTa: "Đưa kỹ năng dịch vào nói trực tiếp: xử lý thông tin trong thời gian ngắn, quy trình luyện nói, tự sửa sai và luyện lại cho đúng.",
  },
];

export const TONG_BUOI = LO_TRINH.reduce((sum, phan) => sum + phan.buoi, 0);

// ── ẢNH ─────────────────────────────────────────────────────────────
// Bỏ file ảnh thật vào web/public/img/ rồi sửa đường dẫn ở đây.
// Hiện đang dùng ảnh giữ chỗ. Xem web/public/img/README.md.
export const ANH = {
  bubby: "/img/bubby.svg", // ảnh dọc, tỉ lệ 4:5
};

// ── FEEDBACK HỌC VIÊN ───────────────────────────────────────────────
// Ảnh đặt trong web/public/img/feedback/ — xem web/public/img/README.md
// để biết cách thay ảnh thật. Thêm/bớt dòng thoải mái.
export const FEEDBACK = [
  { src: "/img/feedback/fb-01.svg", alt: "Feedback học viên về khóa phát âm" },
  { src: "/img/feedback/fb-02.svg", alt: "Feedback học viên về kỹ năng dịch" },
  { src: "/img/feedback/fb-03.svg", alt: "Feedback học viên về mô hình coaching 1-1" },
  { src: "/img/feedback/fb-04.svg", alt: "Feedback học viên sau khi học xong lộ trình" },
  { src: "/img/feedback/fb-05.svg", alt: "Feedback học viên về cách Bubby sửa bài" },
  { src: "/img/feedback/fb-06.svg", alt: "Feedback học viên về buổi học thử 12 thì" },
  { src: "/img/feedback/fb-07.svg", alt: "Feedback học viên về tiến bộ giao tiếp" },
  { src: "/img/feedback/fb-08.svg", alt: "Feedback học viên giới thiệu bạn bè" },
];

// ── CÂU HỎI THƯỜNG GẶP ──────────────────────────────────────────────
export const FAQ = [
  {
    hoi: "Mất gốc hoàn toàn thì học được không?",
    dap: "Được — giáo án này thiết kế riêng cho người bắt đầu và người mất gốc. Bubby dạy trực diện vào các kiến thức nền tảng cốt lõi, không giả định bạn đã biết gì trước đó.",
  },
  {
    hoi: "Coaching 1-1 là học kiểu gì? Online hay offline?",
    dap: "Online, và bên mình chỉ có duy nhất mô hình này. Phần giảng lý thuyết đã được quay sẵn nên bạn học theo giờ rảnh, xem đi xem lại chỗ chưa hiểu. Phần chăm sóc thì Bubby làm trực tiếp 1-1: giải đáp thắc mắc, sửa từng bài tập, theo sát tiến độ của bạn.",
  },
  {
    hoi: "Một tuần học mấy buổi?",
    dap: "Bạn học linh hoạt theo thời gian rảnh của mình, không cố định lịch. Trong quá trình học, bất cứ khi nào thắc mắc hay cần sửa bài thì nhắn trực tiếp cho Bubby trong khung giờ 9h – 21h mỗi ngày.",
  },
  {
    hoi: "Bên mình có dạy TOEIC / IELTS không?",
    dap: "Không. Bên mình dạy nền tảng gốc. Nhưng học viên có gốc chắc rồi thì vào luyện thi TOEIC/IELTS sau này sẽ nhanh và nhẹ hơn nhiều.",
  },
  {
    hoi: "Học phí đóng một lần hay chia được?",
    dap: "Bạn chuyển khoản học phí. Nếu chưa sắp xếp kịp, bên mình hỗ trợ cọc 300k để giữ giá ưu đãi cho bạn. Nhắn tin để Bubby trao đổi cụ thể nha.",
  },
  {
    hoi: "Học xong mà không hiệu quả thì sao?",
    dap: "Bubby theo sát 1-1 nên hầu như không có chuyện bạn học lệch mà không ai biết — mọi bài tập đều được sửa chi tiết và có hệ thống nhắc nhở theo tiến độ. Nếu bạn còn phân vân, học thử một buổi trước rồi quyết định cũng được.",
  },
];

// ── THÔNG SỐ TIN CẬY ────────────────────────────────────────────────
export const CHI_SO = [
  { so: "10 năm", nhan: "kinh nghiệm xây gốc tiếng Anh" },
  { so: "VSTEP C1", nhan: "trung bình 8.5 / 4 kỹ năng" },
  { so: "1-1", nhan: "Bubby trực tiếp sửa từng bài" },
  { so: `${TONG_BUOI} buổi`, nhan: "giáo án tự nghiên cứu, không đi mượn" },
];
