export const OUTFIT_SCHEMA = {
    type: "object",
    properties: {
        outfits: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    tier: { type: "string", enum: ["safe", "balanced", "bold"] },
                    name: { type: "string" },
                    items: { type: "array", items: { type: "object", properties: { slot: { type: "string" }, name: { type: "string" }, color: { type: "string" }, note: { type: "string" } } } },
                    palette: { type: "array", items: { type: "string" } },
                    reasoning: { type: "string" },
                    culturalScore: { type: "number" },
                    harmonyScore: { type: "number" },
                    cultureNotes: { type: "array", items: { type: "string" } }
                }
            }
        }
    }
};

export const generateOutfit = async (event: string, garment: string, style: string, remixLevel: number, weather: any) => {
    // Trong môi trường thật, đây là lệnh fetch POST tới Backend Proxy để gọi Gemini
    // --- FALLBACK MOCK DATA (Dùng ngay để Demo nếu hết API quota) ---
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                outfits: [{
                    tier: "balanced",
                    name: "Lãng Khách Thành Thị",
                    items: [
                        { slot: "Áo", name: "Áo Ngũ Thân lụa đũi", color: "#1F2A5A", note: "Giữ form, đổi chất liệu" },
                        { slot: "Quần", name: "Quần ống rộng (Culottes)", color: "#FBF6EE", note: "Thoải mái di chuyển" },
                        { slot: "Giày", name: "Sneaker cổ thấp trắng", color: "#FFFFFF", note: "Năng động" },
                        { slot: "Phụ kiện", name: "Dây chuyền ngọc trai hạt nhỏ", color: "#E0A526", note: "Điểm nhấn Y2K" }
                    ],
                    palette: ["#1F2A5A", "#FBF6EE", "#E0A526"],
                    reasoning: "Cân bằng giữa nét đĩnh đạc của ngũ thân và sự phóng khoáng hiện đại.",
                    culturalScore: 90, harmonyScore: 85,
                    cultureNotes: ["Áo Ngũ thân tượng trưng cho Tứ thân phụ mẫu và bản thân mình."]
                }]
            });
        }, 2000);
    });
};
