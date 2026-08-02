/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  FILE BẠN CHỈNH SỬA cho trang landing.                            ║
 * ║  Giá, link, ưu đãi, thông tin liên hệ, feedback học viên          ║
 * ║  sửa ở đây, không sửa trong các file giao diện.                   ║
 * ║  Chỗ nào còn [ĐIỀN...] là chỗ cần điền thông tin thật vào.        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

// ── LIÊN HỆ ──────────────────────────────────────────────────────────
// TODO(chủ shop): thay bằng username thật của Page.
// Vào Trang Facebook → Giới thiệu → tên người dùng (vd. facebook.com/englishwithbubby)
// rồi ghép thành https://m.me/englishwithbubby
export const MESSENGER_URL = "https://m.me/englishwithbubby";

// Link Fanpage. Khách nào chưa sẵn sàng nhắn tin thì qua đây xem thêm bài
// đăng, video, feedback rồi quay lại sau.
export const FANPAGE_URL = "https://facebook.com/englishwithbubby";

export const CONTACT = {
  gioLamViec: "9h tới 21h mỗi ngày",
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
      "Hệ thống ký hiệu mặt chữ và số do Bubby tự nghiên cứu",
      "Cách kết hợp âm, nối âm trong tiếng Anh",
      "Luyện ngữ điệu và luyện giọng",
      "Cách nhớ phát âm của từ nhiều âm tiết",
    ],
    videoId: "KR5BFR5SUwA",
  },
  {
    id: "full",
    ten: "Khóa Full: Xây Gốc + Giao Tiếp",
    tomTat:
      "Trọn bộ nền tảng: phát âm, từ vựng, kỹ năng dịch, giao tiếp thực chiến.",
    giaSale: "2.500.000đ",
    giaGoc: "3.200.000đ",
    buoi: "32 buổi",
    coaching: "9 tháng coaching 1-1",
    gomCo: [
      "Cả 4 phần của lộ trình, không thiếu mảng nào",
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
      "Xây dựng vốn từ và phản xạ từ vựng",
      "Quy trình dịch Việt sang Anh đầy đủ các bước",
      "Ngữ pháp theo 3 phân khúc: Từ, Câu, Thì",
      "Tận dụng vốn từ sẵn có thay vì tra từ điển",
    ],
    videoId: "MMDzjWAL9ao",
  },
];

// ── VIDEO ────────────────────────────────────────────────────────────
// `gioiThieu` NẰM NGAY TRONG PHẦN ĐẦU TRANG, ngay dưới câu tiêu đề. Đây
// là thứ quan trọng nhất trên cả trang: khách lạ xem nó để biết bên mình
// là ai và dạy kiểu gì, thay vì phải đọc.
//
// TODO(chủ shop): quay một video giới thiệu riêng, dài 60 tới 90 giây,
// CÓ PHỤ ĐỀ CHÁY SẴN TRONG VIDEO (phần lớn khách xem trên điện thoại và
// tắt tiếng). Xong thì thay ID bên dưới. Tạm thời đang dùng video mô hình
// lớp cho khỏi trống chỗ.
export const VIDEO = {
  gioiThieu: "3D_fUgUmIAk",
  moTaKhoaFull: "kpnz_RE1bPg",
};

// ── LỘ TRÌNH 32 BUỔI ────────────────────────────────────────────────
export const LO_TRINH = [
  {
    ten: "Phát âm",
    buoi: 8,
    moTa: "Hệ thống ký hiệu mặt chữ và số riêng của Bubby, liên kết được với IPA. Kèm 2 buổi luyện ngữ điệu.",
  },
  {
    ten: "Kỹ năng học từ vựng",
    buoi: 2,
    moTa: "Một routine tự học mỗi ngày: xây vốn từ, ghi nhớ, đặt câu, tạo phản xạ.",
  },
  {
    ten: "Kỹ năng dịch Việt sang Anh",
    buoi: 18,
    moTa: "Phần lõi. Xử lý ba chỗ hai ngôn ngữ lệch nhau, cho tới khi bạn dịch được bất kỳ câu nào.",
  },
  {
    ten: "Giao tiếp thực chiến",
    buoi: 4,
    moTa: "Đưa kỹ năng dịch vào nói thật: xử lý nhanh, luyện nói, tự sửa sai.",
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
//
// Có 3 kiểu feedback, dùng cả 3 thì thuyết phục nhất:
//
//   1. FEEDBACK_NOI_BAT  → câu nói được đánh máy lại, chữ to, đọc được ngay
//   2. FEEDBACK          → ảnh chụp màn hình thật, để khách tin là có thật
//   3. FEEDBACK_VIDEO    → học viên nói trên camera, thuyết phục nhất
//
// Kiểu 1 và 3 đang để trống nên trang tạm thời chỉ hiện ảnh chụp. Điền vào
// là các khối kia tự hiện ra, không cần sửa code.

/** Câu feedback tiêu biểu, đánh máy lại cho dễ đọc. Lấy 3 câu là đủ. */
export type FeedbackNoiBat = {
  /** Trích nguyên văn, ngắn thôi, tối đa 3 dòng. */
  cau: string;
  /** Tên học viên. Nhớ xin phép trước khi đăng tên thật. */
  ten: string;
  /** Kết quả cụ thể, vd. "học xong khóa Full" hoặc "sau 4 tháng". */
  ketQua: string;
};

// TODO(chủ shop): chép 3 câu feedback thật vào đây. Mẫu:
//   { cau: "Lần đầu em nói với khách nước ngoài mà không phải dịch trong đầu.",
//     ten: "Ngọc Ánh", ketQua: "học xong khóa Full" },
export const FEEDBACK_NOI_BAT: FeedbackNoiBat[] = [];

/** Video học viên tự quay. 2 tới 3 cái là đủ, đừng nhiều hơn. */
export type FeedbackVideo = {
  /** ID video YouTube (phần sau v= trong link). */
  videoId: string;
  /** Một dòng nói kết quả, hiện dưới video. */
  ketQua: string;
};

// TODO(chủ shop): up video feedback lên YouTube (để chế độ "không công khai"
// cũng được, vẫn nhúng được), rồi dán ID vào đây. Mẫu:
//   { videoId: "abc123xyz", ketQua: "Minh Thư, đi phỏng vấn bằng tiếng Anh sau 5 tháng" },
export const FEEDBACK_VIDEO: FeedbackVideo[] = [];

// Ảnh chụp màn hình. Đặt trong web/public/img/feedback/
// Xem web/public/img/README.md để biết cách thay ảnh thật.
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
    dap: "Được. Giáo án viết riêng cho người mất gốc, không giả định bạn đã biết gì trước đó.",
  },
  {
    hoi: "Coaching 1-1 là học kiểu gì? Online hay offline?",
    dap: "Online, và bên mình chỉ có mô hình này. Lý thuyết quay sẵn để bạn học theo giờ rảnh. Phần sửa bài và giải đáp thì Bubby làm trực tiếp 1-1.",
  },
  {
    hoi: "Một tuần học mấy buổi?",
    dap: "Không cố định lịch, bạn học theo giờ rảnh. Cần sửa bài hay thắc mắc thì nhắn Bubby trong khung 9h tới 21h.",
  },
  {
    hoi: "Bên mình có dạy TOEIC hay IELTS không?",
    dap: "Không, bên mình dạy nền tảng gốc. Có gốc chắc rồi thì luyện thi sau này nhanh và nhẹ hơn nhiều.",
  },
  {
    hoi: "Học phí đóng một lần hay chia được?",
    dap: "Bạn chuyển khoản học phí. Chưa sắp xếp kịp thì cọc 300k giữ giá ưu đãi. Nhắn tin để Bubby trao đổi cụ thể nha.",
  },
  {
    hoi: "Học xong mà không hiệu quả thì sao?",
    dap: "Bubby theo sát 1-1 nên không có chuyện bạn học lệch mà không ai biết. Còn phân vân thì học thử một buổi rồi quyết định.",
  },
];

// ── THÔNG SỐ TIN CẬY ────────────────────────────────────────────────
export const CHI_SO = [
  { so: "10 năm", nhan: "kinh nghiệm xây gốc tiếng Anh" },
  { so: "VSTEP C1", nhan: "trung bình 8.5 cả 4 kỹ năng" },
  { so: "1-1", nhan: "Bubby trực tiếp sửa từng bài" },
  { so: `${TONG_BUOI} buổi`, nhan: "giáo án tự nghiên cứu, không đi mượn" },
];
