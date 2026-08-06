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

// Kênh video (nơi có sẵn 150+ nội dung miễn phí). Đây là bằng chứng khách
// tự đi kiểm chứng được, mạnh hơn mọi lời quảng cáo trên trang này.
// TODO(chủ shop): dán link kênh thật vào. Để trống thì trang vẫn chạy,
// chỉ là mấy chỗ nhắc tới kênh sẽ không bấm được.
// `: string` là cố ý — không có nó thì TypeScript suy ra kiểu là hằng chuỗi
// rỗng, và mọi chỗ kiểm tra `KENH_URL && ...` bị coi là luôn sai ngay lúc
// biên dịch. Điền link thật vào là hết, nhưng cứ để đó cho chắc.
export const KENH_URL: string = "";

// Zalo và số điện thoại. Để trống cái nào thì cái đó tự ẩn khỏi trang —
// đừng để link rỗng, khách bấm vào không ra gì là mất tin ngay.
// TODO(chủ shop): điền số thật. Link Zalo có dạng https://zalo.me/84xxxxxxxxx
export const ZALO_URL: string = "";
export const SO_DIEN_THOAI: string = "";

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
  /** Giá quy ra một buổi. "2tr5" nghe to, "80k/buổi" nghe vừa túi — cùng một
   *  số tiền. Nhớ tính lại mỗi lần đổi giá, sai chỗ này là mất uy tín. */
  giaMoiBuoi: string;
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
    giaMoiBuoi: "63k/buổi",
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
    giaMoiBuoi: "78k/buổi",
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
    ten: "Khóa Kỹ Năng Dịch & Xây Vốn Từ",
    tomTat: "Phần lõi: xử lý chỗ tiếng Việt và tiếng Anh lệch nhau.",
    giaSale: "1.700.000đ",
    giaGoc: "2.100.000đ",
    giaMoiBuoi: "81k/buổi",
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
// HAI VIDEO NÀY LÀ CẢ NỬA TRÊN CỦA TRANG. Khách từ quảng cáo không đọc
// đoạn văn, nên toàn bộ việc thuyết phục ban đầu nằm ở đây.
//
//   `gioiThieu`  → Bước 1: "Vì sao bạn học mãi không hiệu quả?"
//                  Nói trúng chỗ khách đang kẹt. KHÔNG bán gì ở video này.
//   `giaiPhap`   → Bước 2: "EnglishWithBubby giúp được gì cho bạn?"
//                  Bên mình là ai, chữa kiểu gì, mô hình bài quay sẵn +
//                  coaching 1-1 chạy ra sao.
//
// Hai yêu cầu bắt buộc cho cả hai:
//   1. DƯỚI 75 GIÂY. Traffic quảng cáo phần lớn rời trang trước giây 30;
//      video hai phút thì gần như không ai xem tới video sau.
//   2. PHỤ ĐỀ CHÁY SẴN TRONG VIDEO. Khách xem trên điện thoại và tắt tiếng
//      — không có phụ đề thì coi như không có video.
//
// TODO(chủ shop): cả hai đang mượn tạm video cũ cho khỏi trống chỗ. Quay
// video riêng cho từng bước rồi thay ID vào đây.
export const VIDEO = {
  gioiThieu: "3D_fUgUmIAk",
  giaiPhap: "kpnz_RE1bPg",
};

// ── BẰNG CHỨNG TIKTOK ──────────────────────────────────────────────
// Ba ảnh này nằm ngay sau video Bước 2. Chúng kể theo đúng thứ tự khách cần
// kiểm chứng: có kênh thật → có nội dung học thật → có người xem phản hồi.
// Giữ ảnh nguyên tấm, không crop: chữ trong screenshot phải đọc được thì mới
// có sức thuyết phục. Đổi ảnh thì cập nhật luôn `rong` / `cao` bên dưới.
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
    alt: "Trang TikTok Xây Gốc TA Cùng Bubby với 70.6K người theo dõi",
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
 * Ảnh chụp bình luận thật dưới video TikTok/YouTube. Đặt trong
 * web/public/img/feedback/ — xem web/public/img/README.md.
 *
 * `rong` / `cao` là kích thước pixel THẬT của tấm ảnh. Bắt buộc phải đúng:
 * trang dùng nó để chừa sẵn chỗ nên ảnh tải xong không làm giật cả trang.
 * Lấy số bằng cách bấm chuột phải > Get Info trên máy Mac, hoặc chạy:
 *
 *     sips -g pixelWidth -g pixelHeight web/public/img/feedback/fb-01.jpeg
 *
 * Ảnh hiện NGUYÊN TẤM theo chiều ngang, không bị cắt — nên cứ crop sát vào
 * đúng một bình luận là đẹp nhất. Crop rộng lấy cả màn hình thì chữ bé lại
 * và không ai đọc.
 *
 * Dải ảnh cuộn rộng gần trọn bề ngang màn hình, mỗi cột tối đa ~760px, nên
 * ảnh crop rộng khoảng 700–1300px là vừa đẹp, không bị nở mờ.
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
    src: "/img/feedback/fb-01.jpeg",
    alt: "Bình luận: “hay lắm luôn, dễ hiểu, tui xem xog là áp dụng đc luôn, đến đứa tiếp thu chậm như t còn hiểu”",
    rong: 1290,
    cao: 391,
    trichDan: {
      cau: "hay lắm luôn, dễ hiểu, tui xem xog là áp dụng đc luôn, đến đứa tiếp thu chậm như t còn hiểu :) từ ghét môn anh g thấy nó cũng dễ",
      toSang: "từ ghét môn anh g thấy nó cũng dễ",
      ten: "Bá chủ bò",
      nguon: "Bình luận TikTok · 28.9.2025",
    },
  },
  {
    src: "/img/feedback/fb-02.png",
    alt: "Bình luận: “vid của a dạy hay, dễ hiểu lắm ạ”",
    rong: 774,
    cao: 172,
  },
  {
    src: "/img/feedback/fb-03.png",
    alt: "Bình luận: “video anh dạy siu dễ hiểu và thực tế lắm luôn ạ”",
    rong: 782,
    cao: 180,
  },
  {
    src: "/img/feedback/fb-04.png",
    alt: "Bình luận: “úi anh này giảng hay lắm luôn á cực dễ hiểu”",
    rong: 770,
    cao: 166,
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
