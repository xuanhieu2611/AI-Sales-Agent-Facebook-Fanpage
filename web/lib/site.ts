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

/** Mở Messenger với sẵn một câu — dùng khi khách chọn bài học thử. */
export function messengerVoiTinNhan(tinNhan: string) {
  return `${MESSENGER_URL}?text=${encodeURIComponent(tinNhan)}`;
}

// Link Fanpage. Khách nào chưa sẵn sàng nhắn tin thì qua đây xem thêm bài
// đăng, video, feedback rồi quay lại sau.
export const FANPAGE_URL = "https://facebook.com/englishwithbubby";

// Kênh video (nơi có sẵn 150+ nội dung miễn phí). Đây là bằng chứng khách
// tự đi kiểm chứng được, mạnh hơn mọi lời quảng cáo trên trang này.
// TODO(chủ shop): dán link kênh thật vào. Để trống thì trang vẫn chạy,
// chỉ là mấy chỗ nhắc tới kênh sẽ không bấm được.
// `: string` là cố ý — không có nó thì TypeScript suy ra kiểu là hằng chuỗi
// rỗng, và mọi chỗ kiểm tra `KENH_URL && ...` bị coi là luôn sai ngay lúc
// biên dịch. Điền link thật vào là hết, nhưng cứ để đó cho chắc.
export const KENH_URL: string = "";

// Zalo của bên mình. Đây là số để khách NHẮN cho mình qua Zalo, không phải
// số thu thập từ khách. Nhập theo dạng 09xxxxxxxx hoặc +849xxxxxxxx.
// TODO(chủ shop): điền số Zalo thật. Để trống thì nút Zalo tự ẩn.
export const ZALO_SO_DIEN_THOAI: string = "0123123123";

const ZALO_SO_MA_HOA = ZALO_SO_DIEN_THOAI.replace(/\D/g, "").replace(
  /^0/,
  "84",
);
export const ZALO_URL = ZALO_SO_MA_HOA
  ? `https://zalo.me/${ZALO_SO_MA_HOA}`
  : "";

export const CONTACT = {
  gioLamViec: "9h tới 21h mỗi ngày",
  pageName: "English with Bubby",
};

// ── ƯU ĐÃI ───────────────────────────────────────────────────────────
// Sửa mỗi khi đổi chương trình. Để trống `nhan` nếu muốn ẩn hết badge ưu đãi.
export const UU_DAI = {
  nhan: "Ưu đãi tháng này",
  moTa: "Hỗ trợ đặt cọc 300k để giá ưu đãi",
};

// ── KHÓA HỌC ─────────────────────────────────────────────────────────
/** Nhóm con trong danh sách "gồm có" — khóa Full dùng để tách phần thêm
 *  (từ vựng, giao tiếp) khỏi hai khóa thành phần. */
export type NhomNoiDung = {
  tieuDe: string;
  muc: string[];
};

export type Khoa = {
  id: string;
  ten: string;
  tomTat: string;
  giaSale: string;
  giaGoc: string;
  /** Giá quy ra một buổi. "2tr5" nghe to, "80k/buổi" nghe vừa túi — cùng một
   *  số tiền. Nhớ tính lại mỗi lần đổi giá, sai chỗ này là mất uy tín. */
  giaMoiBuoi: string;
  buoi: string;
  coaching: string;
  gomCo: string[];
  /** Dòng dẫn vào `gomCoNhom`, vd. "và thêm:". Chỉ khóa Full dùng. */
  gomCoDan?: string;
  gomCoNhom?: NhomNoiDung[];
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
    giaMoiBuoi: "63k/buổi",
    buoi: "8 buổi",
    coaching: "1 tháng coaching 1-1",
    gomCo: [
      "Hệ thống các âm phổ biến trong tiếng Anh, áp dụng IPA để học và ghi nhớ phát âm",
      "Nhìn ra sự liên quan giữa mặt chữ và phát âm của từ",
      "Hiểu cách tạo ra ngữ điệu tự nhiên và tự luyện giọng mỗi ngày",
      "Nắm những điểm mấu chốt để có giọng tiếng Anh tự nhiên, thoải mái",
      "Hiểu sự khác biệt quan trọng trong cách phát âm của người bản xứ",
      "Biết cách biến giọng nói thành phản xạ",
    ],
    videoId: "KR5BFR5SUwA",
  },
  {
    id: "dich",
    ten: "Khóa Kĩ Năng Dịch + Xây Vốn Từ",
    tomTat: "Phần lõi: xử lý chỗ tiếng Việt và tiếng Anh lệch nhau.",
    giaSale: "1.700.000đ",
    giaGoc: "2.100.000đ",
    giaMoiBuoi: "81k/buổi",
    buoi: "21 buổi",
    coaching: "5 tháng coaching 1-1",
    gomCo: [
      "Xây dựng thói quen học từ vựng mỗi ngày",
      "Biết cách ghi nhớ & tạo phản xạ từ vựng",
      "Đơn giản & hệ thống hóa ngữ pháp nền tảng (Từ - Câu - Thì)",
      "Chiến lược học thông minh để hình thành kĩ năng dịch",
      "Biết cách sắp xếp từ vựng trong câu",
      "Kĩ năng dịch linh hoạt bằng vốn từ sẵn có",
    ],
    videoId: "MMDzjWAL9ao",
  },
  {
    id: "full",
    ten: "Khóa Full: Xây Gốc + Giao Tiếp",
    tomTat:
      "Trọn bộ nền tảng: phát âm, từ vựng, kỹ năng dịch, giao tiếp thực chiến.",
    giaSale: "2.500.000đ",
    giaGoc: "3.200.000đ",
    giaMoiBuoi: "78k/buổi",
    buoi: "32 buổi",
    coaching: "9 tháng coaching 1-1",
    // Không lặp 12 mục của 2 khóa kia — khách đã thấy trên 2 thẻ bên cạnh.
    // Full = cả 2 khóa + phần thêm, chia 2 nhóm đúng như Bubby viết.
    gomCo: [
      "Cả khóa Phát Âm",
      "Cả khóa Kĩ Năng Dịch + Xây Vốn Từ",
    ],
    gomCoDan: "và thêm:",
    gomCoNhom: [
      {
        tieuDe: "Kĩ năng học từ vựng",
        muc: [
          "Xây dựng thói quen học từ vựng mỗi ngày",
          "Cách ghi nhớ & tạo phản xạ",
          "Cách ứng dụng đặt câu & xây vốn từ",
        ],
      },
      {
        tieuDe: "Giao tiếp thực chiến",
        muc: [
          "Các bước luyện giao tiếp",
          "Khai thác nguồn luyện nói",
          "Tự luyện speaking với AI & tự học mỗi ngày",
        ],
      },
    ],
    noiBat: true,
    videoId: "kpnz_RE1bPg",
  },
];

// ── BÀI HỌC THỬ ─────────────────────────────────────────────────────
// Các bài trải nghiệm khi khách đang tìm hiểu khóa. Mỗi mục mở Messenger
// với tin nhắn sẵn — không phải cổng xin email.
export const BAI_HOC_QUA_TANG = {
  tieuDe:
    "Khi tìm hiểu khóa học, bạn có thể chọn 1 trong những bài học thử sau đây để trải nghiệm trước:",
  /** Mẫu tin nhắn gắn vào m.me khi khách bấm một bài. `{ten}` = tên bài. */
  mauTinNhan: "Mình muốn học thử: {ten}",
  danhSach: [
    "Phương Pháp Học Ngữ Pháp Hiệu Quả",
    "Cách Ghi Nhớ Các Âm Trong IPA",
    "Ghi Nhớ 12 Thì Trong 1h",
    "Phương Pháp Học Từ Vựng Hiệu Quả",
  ],
} as const;

// ── VIDEO ────────────────────────────────────────────────────────────
// BA VIDEO NÀY LÀ CẢ NỬA TRÊN CỦA TRANG. Khách từ quảng cáo không đọc
// đoạn văn, nên toàn bộ việc thuyết phục ban đầu nằm ở đây.
//
//   `gioiThieu`      → Bước 1: "Vì sao học mãi vẫn không áp dụng được?"
//                      Nói trúng chỗ khách đang kẹt. KHÔNG bán gì ở video này.
//   `giaiPhap`       → Bước 2: "English With Bubby có thể giúp gì cho bạn?"
//                      Bên mình là ai, chữa kiểu gì, lộ trình ra sao.
//   `moHinhCoaching` → Bước 3: "Mô hình coaching 1-1"
//                      Lớp chạy thế nào: bài quay sẵn + chữa 1-1.
//
// Hai yêu cầu bắt buộc cho cả ba:
//   1. DƯỚI 75 GIÂY. Traffic quảng cáo phần lớn rời trang trước giây 30;
//      video hai phút thì gần như không ai xem tới video sau.
//   2. PHỤ ĐỀ CHÁY SẴN TRONG VIDEO. Khách xem trên điện thoại và tắt tiếng
//      - không có phụ đề thì coi như không có video.
export const VIDEO = {
  gioiThieu: "ut6mV8ZPE0U", // Vì Sao Học Mãi Vẫn Không Áp Dụng Được?
  giaiPhap: "9yM4oimQqcM", // English With Bubby Có Thể Giúp Gì Cho Bạn?
  moHinhCoaching: "OGqAs5ifPFc", // Mô Hình Coaching 1-1
};

// ── BUBBY LÀ AI ─────────────────────────────────────────────────────
// Dải ngắn nằm giữa tiêu đề Bước 2 và video giải pháp. Chỉ cần khách biết
// người sắp xuất hiện trong video là ai, có thật, và đã dạy bao lâu — đừng
// viết dài ở đây, bằng chứng kênh nằm ở dải TikTok phía dưới.
//
// TODO(chủ shop): cập nhật `soFollower` mỗi khi tròn mốc mới. Con số phải
// khớp với ảnh chụp TikTok ở BANG_CHUNG_TIKTOK.
export const BUBBY = {
  ten: "Bubby",
  vaiTro: "Giảng viên · coaching 1-1 trực tiếp",
  /** Đoạn giới thiệu kênh — hiện dưới tên Bubby, trước dải số. */
  tomTat:
    "Với hơn 70k follower trên Tiktok, English With Bubby được biết đến là một kênh chuyên về xây gốc tiếng Anh thực chiến với hơn 150 clip chia sẻ phân thành các tập trên 4 danh sách phát để các bạn có thể lần lượt xây lại kiến thức nền tảng từ Ngữ Pháp, Phát Âm, Từ Vựng - Luyện Dịch",
  soFollower: "70k+",
  nhanFollower: "theo dõi TikTok",
  namDay: "10 năm",
  nhanNamDay: "chuyên xây gốc tiếng Anh",
  chungChi: "C1 VSTEP",
  nhanChungChi: "TB 8.5 cả 4 kỹ năng",
  taiKhoan: "@englishwithbubby",
  tiktokUrl: "https://www.tiktok.com/@englishwithbubby",
};

// ── BẰNG CHỨNG TIKTOK ──────────────────────────────────────────────
// Ba ảnh nhỏ nằm giữa dải "Bubby là ai" và video Bước 2 — không tiêu đề,
// chỉ ảnh. Thứ tự: kênh thật → nội dung học thật → phản hồi thật.
// Trên trang bị cắt lấy phần đầu (object-top) vì dải này phải nhỏ; `rong` /
// `cao` vẫn ghi kích thước file gốc để Next biết tỉ lệ.
export type AnhTikTok = {
  nhan: string;
  tieuDe: string;
  src: string;
  alt: string;
  rong: number;
  cao: number;
};

export const BANG_CHUNG_TIKTOK: AnhTikTok[] = [
  {
    nhan: "01 · Kênh TikTok",
    tieuDe: "@englishwithbubby",
    src: "/img/kenh/tiktok.jpg",
    alt: "Trang TikTok Xây Gốc TA Cùng Bubby với hơn 70k người theo dõi",
    rong: 1170,
    cao: 2397,
  },
  {
    nhan: "02 · Playlist học",
    tieuDe: "Ngữ pháp? Dễ hoy",
    src: "/img/kenh/tiktok-playlist.PNG",
    alt: "Playlist TikTok Ngữ Pháp? Dễ hoy với 29 bài học",
    rong: 1170,
    cao: 2532,
  },
  {
    nhan: "03 · Feedback trên TikTok",
    tieuDe: "Người xem nói gì",
    src: "/img/kenh/tiktok-feedback.jpeg",
    alt: "Các bình luận TikTok khen video của Bubby dễ hiểu và thực tế",
    rong: 1289,
    cao: 1656,
  },
];

// ── ẢNH ─────────────────────────────────────────────────────────────
// Bỏ file ảnh thật vào web/public/img/ rồi sửa đường dẫn ở đây.
// Xem web/public/img/README.md.
export const ANH = {
  bubby: "/img/bubby.jpeg", // chân dung vuông, crop tròn trong Hero
};

/**
 * ÉP cả trang hiện khung brief thay cho ảnh thật, kể cả những ô đã có ảnh.
 * Chỉ bật khi muốn rà lại xem còn thiếu asset nào.
 *
 * Bình thường KHÔNG CẦN ĐỤNG TỚI: từng ô tự biết mình đã có ảnh thật hay
 * chưa dựa vào đuôi file (`.svg` = ảnh giữ chỗ). Thả ảnh thật vào
 * `public/img/` rồi sửa đường dẫn là ô đó tự đổi.
 */
export const SHOW_REVIEW_PLACEHOLDERS = false;

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

/**
 * Ảnh chụp tin nhắn học viên (Messenger / Zalo). Đặt trong
 * web/public/img/feedback/ — xem web/public/img/README.md.
 *
 * `rong` / `cao` là kích thước pixel THẬT của tấm ảnh. Bắt buộc phải đúng:
 * trang dùng nó để chừa sẵn chỗ nên ảnh tải xong không làm giật cả trang.
 *
 * Ảnh hiện NGUYÊN TẤM, không bị cắt. File gốc là ảnh chụp điện thoại dọc —
 * giữ tỉ lệ đó, đừng crop ngang. Trang cho chúng trôi ngang thành hai dải.
 */
export type AnhFeedback = {
  src: string;
  alt: string;
  rong: number;
  cao: number;
  /** Xem `TrichDan`. Chỉ tấm được ghim đầu mục mới cần. */
  trichDan?: TrichDan;
};

/**
 * Bản đánh máy lại của CHÍNH bình luận trong ảnh, dùng cho tấm ghim đứng đầu
 * mục feedback: chữ to đọc được ngay, còn tấm ảnh nằm ngay bên cạnh là bằng
 * chứng là câu đó có thật.
 *
 * KHÔNG được viết lại cho hay hơn. Phải trùng nguyên văn với ảnh, giữ cả chữ
 * viết tắt và lỗi chính tả — sai một chữ là khách đối chiếu ra ngay, mà cả
 * mục này sống bằng việc khách tin.
 *
 * Ảnh nào có `trichDan` thì ảnh đó được ghim. Muốn đổi tấm ghim thì chuyển
 * khối này sang ảnh khác.
 */
export type TrichDan = {
  /** Nguyên văn bình luận. */
  cau: string;
  /** Cụm được tô bút vàng. PHẢI là một đoạn con của `cau`, không thì bỏ trống. */
  toSang?: string;
  /** Tên người bình luận, đúng như hiện trong ảnh. */
  ten: string;
  /** Nơi và ngày, vd. "Bình luận TikTok · 28.9.2025". */
  nguon: string;
};

export const FEEDBACK: AnhFeedback[] = [
  {
    src: "/img/feedback/hv-01.webp",
    alt: "Tin nhắn học viên Phú: sau 3 tháng tự tin giao tiếp với người nước ngoài hơn, phát âm hết kẹt",
    rong: 720,
    cao: 1384,
  },
  {
    src: "/img/feedback/hv-02.webp",
    alt: "Tin nhắn nhóm Khu vườn ngoại ngữ: Hồng Minn và Ngọc Trâm cảm ơn thầy sau khóa học",
    rong: 720,
    cao: 1561,
  },
  {
    src: "/img/feedback/hv-03.webp",
    alt: "Ảnh chụp tin nhắn học viên cảm ơn Bubby sau khóa học",
    rong: 720,
    cao: 1561,
  },
  {
    src: "/img/feedback/hv-04.webp",
    alt: "Tin nhắn học viên Larue: hết sợ nói tiếng Anh, tự tin giao tiếp, muốn học lớp nâng cao",
    rong: 720,
    cao: 1561,
  },
  {
    src: "/img/feedback/hv-05.webp",
    alt: "Tin nhắn học viên: lần đầu kiên trì học hết khóa, mở được phát âm và cách học từ với ChatGPT",
    rong: 720,
    cao: 1223,
  },
  {
    src: "/img/feedback/hv-06.webp",
    alt: "Tin nhắn học viên: kiến thức thông suốt, đơn giản dễ hiểu, một cột mốc mới khi học tiếng Anh",
    rong: 720,
    cao: 1240,
  },
  {
    src: "/img/feedback/hv-07.webp",
    alt: "Tin nhắn học viên Xuân Vàng: phương pháp đặc biệt, tự tin nói trên lớp dù gốc yếu",
    rong: 720,
    cao: 1257,
  },
  {
    src: "/img/feedback/hv-08.webp",
    alt: "Tin nhắn học viên: khóa 3 tháng 10/10, hết sợ tiếng Anh, lớp vui và thoải mái",
    rong: 720,
    cao: 1292,
  },
  {
    src: "/img/feedback/hv-09.webp",
    alt: "Ảnh chụp tin nhắn học viên cảm ơn Bubby sau khóa học",
    rong: 720,
    cao: 1238,
  },
  {
    src: "/img/feedback/hv-10.webp",
    alt: "Tin nhắn học viên biết Bubby từ TikTok: sửa gốc, giao tiếp đơn giản, đồng hành 3 tháng",
    rong: 720,
    cao: 1231,
  },
  {
    src: "/img/feedback/hv-11.webp",
    alt: "Ảnh chụp tin nhắn học viên cảm ơn Bubby sau khóa học",
    rong: 720,
    cao: 1257,
  },
  {
    src: "/img/feedback/hv-12.webp",
    alt: "Ảnh chụp tin nhắn học viên cảm ơn Bubby sau khóa học",
    rong: 720,
    cao: 1254,
  },
  {
    src: "/img/feedback/hv-13.webp",
    alt: "Ảnh chụp tin nhắn học viên cảm ơn Bubby sau khóa học",
    rong: 720,
    cao: 1254,
  },
  {
    src: "/img/feedback/hv-14.webp",
    alt: "Tin nhắn học viên: 12 năm học gói gọn trong 3 tháng, thực hành nói nhiều, tự học được sau khóa",
    rong: 720,
    cao: 1246,
  },
  {
    src: "/img/feedback/hv-15.webp",
    alt: "Ảnh chụp tin nhắn học viên cảm ơn Bubby sau khóa học",
    rong: 720,
    cao: 1254,
  },
  {
    src: "/img/feedback/hv-16.webp",
    alt: "Ảnh chụp tin nhắn học viên cảm ơn Bubby sau khóa học",
    rong: 720,
    cao: 1250,
  },
  {
    src: "/img/feedback/hv-17.webp",
    alt: "Ảnh chụp tin nhắn học viên cảm ơn Bubby sau khóa học",
    rong: 720,
    cao: 1227,
  },
  {
    src: "/img/feedback/hv-18.webp",
    alt: "Ảnh chụp tin nhắn học viên cảm ơn Bubby sau khóa học",
    rong: 720,
    cao: 1244,
  },
  {
    src: "/img/feedback/hv-19.webp",
    alt: "Tin nhắn học viên: cải thiện từ vựng, dịch, hết ngại nói sau khóa 3 tháng",
    rong: 720,
    cao: 1561,
  },
  {
    src: "/img/feedback/hv-20.webp",
    alt: "Tin nhắn học viên: đổi cách nghĩ về tiếng Anh, viết được nhật ký, nhận feedback từ khách nước ngoài",
    rong: 720,
    cao: 735,
  },
  {
    src: "/img/feedback/hv-21.webp",
    alt: "Ảnh chụp tin nhắn học viên cảm ơn Bubby sau khóa học",
    rong: 720,
    cao: 1265,
  },
  {
    src: "/img/feedback/hv-22.webp",
    alt: "Ảnh chụp tin nhắn học viên cảm ơn Bubby sau khóa học",
    rong: 720,
    cao: 1274,
  },
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
