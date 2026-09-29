export interface RuleResult { level: "green" | "yellow" | "red"; message: string; suggestion?: string; block?: boolean; }

export const checkCulturalRules = (event: string, garment: string, style: string, remixLevel: number): RuleResult => {
    const isPagoda = event.includes("Chùa") || event.includes("Đền") || event.includes("Lễ tang");
    const isParty = event.includes("Club") || event.includes("Cà phê") || event.includes("Bar");

    // Luật 1: Nhật Bình (Cung đình) đi dạo phố/Party -> VÀNG
    if (garment === "ao_nhat_binh" && isParty) {
        return { level: "yellow", message: "Áo Nhật Bình là trang phục cung đình tôn nghiêm. Dùng đi chơi có thể gây tranh cãi.", suggestion: "Hãy thử mặc Áo Tứ Thân hoặc Áo Bà Ba sẽ phù hợp và thoải mái hơn." }
    }
    // Luật 2: Đi chùa + Remix mạnh/Streetwear -> ĐỎ
    if (isPagoda && (remixLevel > 70 || style === "Streetwear" || style === "Y2K")) {
        return { level: "red", message: "Đến nơi tôn nghiêm như đình/chùa cần sự kín đáo. Phong cách này quá phá cách.", suggestion: "Hãy giảm mức độ remix hoặc đổi sang phong cách Tối giản/Thanh lịch.", block: false }
    }
    // Luật 3: Trang phục dân tộc thiểu số -> BLOCK REMIX
    if (["h_mong", "e_de", "thai"].includes(garment) && remixLevel > 0) {
        return { level: "red", message: "Trang phục của đồng bào dân tộc thiểu số là di sản thiêng liêng, không nên tự ý cắt xẻ hay remix.", block: true }
    }
    // Luật 4: Áo Ngũ Thân + Đi Chùa -> XANH
    if (garment === "ao_ngu_than" && isPagoda) {
        return { level: "green", message: "Áo Ngũ Thân vô cùng phù hợp cho không gian tôn nghiêm, kín đáo và thanh lịch." }
    }
    // Luật 5: Yếm trần (không áo khoác) + Sự kiện trang trọng -> ĐỎ
    if (garment === "yem" && (isPagoda || event === "Lễ tốt nghiệp") && remixLevel > 50) {
        return { level: "red", message: "Yếm vốn là nội y truyền thống. Mặc đơn lẻ đến nơi trang trọng là không phù hợp.", suggestion: "Nên khoác thêm Áo Tứ Thân hoặc Áo Dài bên ngoài." }
    }

    return { level: "green", message: "Bộ phối của bạn khá an toàn về mặt văn hoá, thoải mái sáng tạo!" };
};
