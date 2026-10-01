export interface CostumeInfo {
  id: string;
  name: string;
  region: string;
  origin: string;
  recognition: string[];
  keep: string;
  creative: string;
  didYouKnow: string;
  confidence: string;
  references: string;
}

export const coreCostumes: CostumeInfo[] = [
  {
    id: "tu-than",
    name: "Tứ Thân",
    region: "Bắc Bộ",
    origin: "Tứ thân có nguồn gốc từ vùng đồng bằng Bắc Bộ, là trang phục lao động và sinh hoạt thường ngày của phụ nữ nông thôn xưa. Áo gồm bốn thân vải ghép lại, tượng trưng cho tứ thân phụ mẫu.",
    recognition: [
      "Áo không có khuy cài, hai vạt trước buộc túm lại ở giữa.",
      "Lưng áo xẻ làm hai mảng, nối với nhau ở sống lưng.",
      "Bên trong mặc yếm đào hoặc yếm trắng.",
      "Thường kết hợp với dải lụa thắt ngang lưng.",
      "Mặc cùng váy đĩnh đen và nón quai thao."
    ],
    keep: "Phom dáng vạt áo buộc túm, cấu trúc lưng xẻ.",
    creative: "Màu sắc hiện đại, chất liệu ren/voan, phối cùng phụ kiện (sneakers, túi xách mini).",
    didYouKnow: "Nhiều người lầm tưởng áo tứ thân luôn rực rỡ, nhưng xưa kia người nông dân thường nhuộm màu nâu, đen để dễ làm đồng.",
    confidence: "Mức độ chính xác lịch sử cao, thiết kế đã được giản lược để dễ minh họa.",
    references: "Ngàn Năm Áo Mũ (Trần Quang Đức), Bảo tàng Phụ nữ Việt Nam."
  },
  {
    id: "ao-the",
    name: "Áo The",
    region: "Bắc Bộ",
    origin: "Áo the là một biến thể của áo ngũ thân nam, được may bằng loại lụa mỏng, thưa gọi là 'the'. Đây là trang phục trang trọng dành cho phái nam trong các dịp lễ Tết, hội hè.",
    recognition: [
      "Chất liệu mỏng, nhìn xuyên thấu nhẹ lớp áo lót mầu trắng bên trong.",
      "Cổ đứng (cổ xây), cài khuy bên phải.",
      "Tay áo thụng rộng.",
      "Thường mặc cùng quần trắng.",
      "Đi kèm khăn xếp trên đầu."
    ],
    keep: "Chất liệu xuyên thấu đặc trưng, dáng cổ đứng.",
    creative: "Họa tiết in chìm đương đại, phối cùng kính râm hoặc áo phông bên trong.",
    didYouKnow: "Áo the thâm (màu đen) là loại phổ biến nhất, thể hiện sự chín chắn và trang nhã của người đàn ông Bắc Bộ xưa.",
    confidence: "Cần đối chiếu thêm với tài liệu về form dáng chuẩn.",
    references: "Đại Việt Cổ Phong, Đình làng Việt."
  },
  {
    id: "ngu-than-nu",
    name: "Ngũ Thân Nữ",
    region: "Huế",
    origin: "Được chúa Nguyễn Phúc Khoát định hình vào giữa thế kỷ 18, áo ngũ thân (lập lĩnh tay chẽn) là trang phục thường ngày, đặt nền móng cho áo dài hiện đại.",
    recognition: [
      "Áo có 5 thân: 2 trước, 2 sau và 1 thân con ẩn bên trong vạt phải.",
      "Cổ áo đứng, ôm sát, viền tròn.",
      "Áo có 5 khuy (thường làm bằng đồng, xương, hoặc ngọc).",
      "Form áo dáng chữ A, rộng rãi không chít eo.",
      "Tay áo may hẹp (tay chẽn) để dễ vận động."
    ],
    keep: "Cấu trúc 5 thân, 5 khuy, form dáng rộng không chít eo.",
    creative: "Độ dài vạt áo (có thể cắt ngắn), tay áo loe nhẹ.",
    didYouKnow: "5 nút áo ngũ thân tượng trưng cho Đạo làm người: Nhân, Lễ, Nghĩa, Trí, Tín.",
    confidence: "Chính xác cao về cấu trúc.",
    references: "Dệt Nên Triều Đại (Vietnam Centre)."
  },
  {
    id: "ngu-than-nam",
    name: "Ngũ Thân Nam",
    region: "Huế",
    origin: "Cùng xuất xứ với ngũ thân nữ, nhưng áo ngũ thân nam có form dáng nam tính, vuông vức hơn và thường được may với các chất liệu dày dặn, tối màu cho nam giới trưởng thành.",
    recognition: [
      "Cấu trúc 5 thân, 5 khuy tương tự ngũ thân nữ.",
      "Vạt áo nam thường dài hơn và form thẳng hơn.",
      "Cổ áo nam có bản to cứng cáp hơn.",
      "Ống tay rộng vừa phải, đường may sắc nét.",
      "Luôn mặc cùng quần lụa thụng."
    ],
    keep: "Đường may thẳng, cổ áo cứng cáp, 5 khuy cài.",
    creative: "Mặc phanh nút, khoác ngoài như áo khoác blazer, chất liệu denim.",
    didYouKnow: "Áo ngũ thân từng bị coi là lạc hậu vào đầu thế kỷ 20, nhưng nay đang dần trở thành lễ phục được giới trẻ nam đặc biệt yêu thích.",
    confidence: "Chuẩn xác.",
    references: "Hội Quán Di Sản."
  },
  {
    id: "ba-ba-nu",
    name: "Bà Ba Nữ",
    region: "Nam Bộ",
    origin: "Áo bà ba xuất hiện vào khoảng nửa cuối thế kỷ 19 ở Nam Bộ. Nó được xẻ tà ở hông và không có cổ áo, rất phù hợp với khí hậu nóng bức miền Nam.",
    recognition: [
      "Áo không có cổ (cổ tròn hoặc cổ tim).",
      "Thân áo xẻ tà hai bên hông.",
      "Áo cài khuy dọc từ trên xuống dưới ở giữa ngực.",
      "Phía trước thường có 2 túi vuông to ở vạt dưới.",
      "Tay áo suông, không quá chật."
    ],
    keep: "Cổ không viền, hàng khuy giữa, 2 túi đặc trưng.",
    creative: "Màu sắc pastel, khuy áo to bản phá cách, chất liệu voan thêu nổi.",
    didYouKnow: "Trước kia áo bà ba thường được nhuộm bằng mủ rễ cây dưa, vú sứ sắn để có màu nâu đen chống bẩn khi làm ruộng.",
    confidence: "Các chi tiết đã được xác thực.",
    references: "Bảo tàng áo dài, Tư liệu văn hóa Nam Bộ."
  },
  {
    id: "ba-ba-nam",
    name: "Bà Ba Nam",
    region: "Nam Bộ",
    origin: "Tương tự bà ba nữ nhưng áo bà ba nam có form dáng rộng hơn, đường may thẳng cứng cáp hơn, và thường có 2 túi to ở dưới cùng 1 túi nhỏ ở ngực trái.",
    recognition: [
      "Thiết kế xẻ tà hai bên, cổ tròn.",
      "Hàng khuy thẳng ở giữa ngực.",
      "Có 2 túi to ở vạt dưới và thường có 1 túi nhỏ ngực trái (để đựng tẩu thuốc hoặc đồng hồ quả quýt).",
      "Dáng áo rộng rãi, thoải mái.",
      "Thường nhuộm màu nâu, đen hoặc xám."
    ],
    keep: "Cấu trúc 3 túi, hàng khuy giữa thẳng.",
    creative: "Sử dụng như áo sơ mi, phối hợp với quần ống rộng streetwear.",
    didYouKnow: "Trang phục này gắn liền với hình ảnh những người nông dân hiền lành, chất phác vùng sông nước Cửu Long.",
    confidence: "Đã kiểm chứng thông tin qua các tài liệu dân gian.",
    references: "Tạp chí Văn hóa dân gian."
  }
];
