/**
 * Nội dung cho khối "Dịch thử" ở đầu trang.
 *
 * Mỗi ví dụ là một lỗi có thật mà người Việt hay mắc khi dịch từng chữ một.
 * `literal` được cắt thành từng token; token nào `bad: true` sẽ được gạch
 * chân bằng nét sửa màu cam.
 */

export type Token = { t: string; bad?: boolean };

export type ViDu = {
  vi: string;
  literal: Token[];
  dung: string;
  loai: "TỪ" | "CÂU" | "THÌ";
  giaiThich: string;
};

export const VI_DU: ViDu[] = [
  {
    vi: "Tôi làm ở đây ba năm rồi.",
    literal: [
      { t: "I" },
      { t: "work", bad: true },
      { t: "here" },
      { t: "three years", bad: true },
      { t: "already", bad: true },
      { t: "." },
    ],
    dung: "I've been working here for three years.",
    loai: "THÌ",
    giaiThich:
      "Tiếng Việt không chia thì — chữ “rồi” gánh hết nghĩa hoàn thành. Tiếng Anh bắt buộc phải đổi hình thức động từ, và cần “for” trước khoảng thời gian.",
  },
  {
    vi: "Hôm qua tôi rất vui.",
    literal: [
      { t: "Yesterday" },
      { t: "I" },
      { t: "very", bad: true },
      { t: "happy", bad: true },
      { t: "." },
    ],
    dung: "I was really happy yesterday.",
    loai: "CÂU",
    giaiThich:
      "Tiếng Việt nói thẳng “tôi vui”, không cần động từ. Tiếng Anh thì tính từ phải đi sau “to be” — và “to be” đó còn phải chia quá khứ.",
  },
  {
    vi: "Tôi không biết anh ấy đang ở đâu.",
    literal: [
      { t: "I" },
      { t: "don't know" },
      { t: "he is where", bad: true },
      { t: "." },
    ],
    dung: "I don't know where he is.",
    loai: "CÂU",
    giaiThich:
      "Câu hỏi nằm bên trong một câu khác thì tiếng Anh đảo lại trật tự. Dịch thẳng theo tiếng Việt là ra sai ngay.",
  },
  {
    vi: "Cái áo này bao nhiêu tiền?",
    literal: [
      { t: "This shirt" },
      { t: "how much", bad: true },
      { t: "money", bad: true },
      { t: "?" },
    ],
    dung: "How much is this shirt?",
    loai: "TỪ",
    giaiThich:
      "“Tiền” trong tiếng Việt không dịch sang tiếng Anh — nó đã nằm sẵn trong “how much”. Dịch đủ chữ là thừa chữ.",
  },
];
