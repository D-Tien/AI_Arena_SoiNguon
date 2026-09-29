export interface CulturalItem {
    id: string; name: string; region: string; era: string; description: string;
    suitableFor: string[]; unsuitableFor: string[]; traditionalColors: string[];
    pairedWith: string[]; remixSafety: number; // 1 (Rất nhạy cảm) - 5 (Dễ remix)
    keepRule: string; tweakRule: string; sources: string[];
}

export const culturalDb: Record<string, CulturalItem> = {
    ao_dai: {
        id: "ao_dai", name: "Áo Dài Truyền Thống", region: "Toàn quốc", era: "Thập niên 1930",
        description: "Biểu tượng trang phục nữ Việt Nam, tôn vinh nét đẹp kín đáo, thanh lịch.",
        suitableFor: ["Lễ tốt nghiệp", "Cưới hỏi", "Lễ tết", "Chụp ảnh"], unsuitableFor: ["Club"],
        traditionalColors: ["Trắng", "Tím Huế", "Đỏ", "Xanh lơ"], pairedWith: ["Quần lụa", "Nón lá"],
        remixSafety: 4, keepRule: "Giữ form dáng ôm vừa vặn, tà áo dài qua gối.", tweakRule: "Có thể thay đổi chất liệu (denim, organza), phối với sneaker, khoác blazer ngoài.",
        sources: ["Bảo tàng Phụ nữ Việt Nam"]
    },
    ao_tu_than: {
        id: "ao_tu_than", name: "Áo Tứ Thân", region: "Bắc Bộ", era: "Thế kỷ 12 - 20",
        description: "Trang phục dân dã của phụ nữ miền Bắc, gồm 4 vạt, vạt trước buông xoã hoặc buộc lại.",
        suitableFor: ["Hội hè", "Văn nghệ", "Chụp ảnh concept", "Dạo phố nghệ thuật"], unsuitableFor: ["Lễ tang"],
        traditionalColors: ["Nâu non", "Đen", "Hồng cánh sen", "Xanh mạ"], pairedWith: ["Yếm", "Váy đụp", "Nón quai thao"],
        remixSafety: 5, keepRule: "Nên giữ vạt buộc hoặc yếm bên trong để ra chất Bắc Bộ.", tweakRule: "Phối với quần jeans ống rộng, áo croptop thay yếm, giày boots.",
        sources: ["Bảo tàng Dân tộc học Việt Nam"]
    },
    ao_ngu_than: {
        id: "ao_ngu_than", name: "Áo Ngũ Thân (Lập Lĩnh)", region: "Toàn quốc (Gốc Đàng Trong)", era: "Triều Nguyễn",
        description: "Áo 5 thân, cổ đứng, cài khuy, tiền thân của áo dài. Thể hiện triết lý Tứ thân phụ mẫu.",
        suitableFor: ["Đi chùa/đền", "Lễ tết", "Sự kiện văn hoá", "Trang phục dạo phố"], unsuitableFor: ["Quần short ngắn"],
        traditionalColors: ["Xanh dương", "Đen", "Trắng", "Màu trầm"], pairedWith: ["Quần thụng", "Khăn đóng"],
        remixSafety: 3, keepRule: "Giữ nguyên form rộng, cổ đứng (lập lĩnh) chữ V kín đáo.", tweakRule: "Phối với quần âu, giày tây, kính mát retro, túi tote.",
        sources: ["Trung tâm Bảo tồn Di tích Cố đô Huế", "Dự án Vietnam Centre"]
    },
    ao_nhat_binh: {
        id: "ao_nhat_binh", name: "Áo Nhật Bình", region: "Huế", era: "Triều Nguyễn",
        description: "Trang phục thường triều của Hoàng Thái hậu, Hoàng hậu, Công chúa. Phân bậc bằng màu sắc.",
        suitableFor: ["Cưới hỏi (đồ hỷ)", "Chụp ảnh nghệ thuật/cổ phục", "Trình diễn văn hoá"], unsuitableFor: ["Bar/Club", "Đi dạo hàng ngày"],
        traditionalColors: ["Vàng (Hoàng hậu)", "Đỏ (Công chúa)", "Xanh lục/lam"], pairedWith: ["Quần lụa", "Mũ phượng"],
        remixSafety: 1, keepRule: "Giữ nguyên hoa văn ổ trước ngực và dải màu ngũ hành ở tay áo.", tweakRule: "Khoác ngoài váy trơn đơn giản, không cắt xẻ bừa bãi.",
        sources: ["Khâm định Đại Nam hội điển sự lệ", "Bảo tàng Mỹ thuật Cung đình Huế"]
    },
    ao_ba_ba: {
        id: "ao_ba_ba", name: "Áo Bà Ba", region: "Nam Bộ", era: "Thế kỷ 19 - nay",
        description: "Áo cổ tròn/tim, xẻ tà 2 bên, có 2 túi. Đặc trưng của người dân Nam Bộ.",
        suitableFor: ["Dạo phố", "Du lịch sinh thái", "Chụp ảnh đồng quê"], unsuitableFor: ["Lễ nghi trang trọng"],
        traditionalColors: ["Nâu", "Đen", "Trắng", "Hồng phấn"], pairedWith: ["Quần lụa đen", "Khăn rằn"],
        remixSafety: 5, keepRule: "Form áo ngắn, xẻ tà nhẹ.", tweakRule: "Phối với quần jean short, váy tennis, sneaker năng động.",
        sources: ["Bảo tàng Áo dài"]
    }
};
