# SỢI NGUỒN: NHIỆM VỤ "STYLIST VĂN HOÁ NÓI CHUYỆN BẰNG LỜI"

> File này dành cho agent (AG Kit / Antigravity). Đặt vào gốc dự án, ví dụ `docs/STYLIST_TASKS.md`.
> Cách dùng: người dùng gõ `/status` rồi chỉ định giai đoạn, ví dụ "Làm GĐ1 trong docs/STYLIST_TASKS.md".
> **Mỗi lượt chỉ làm MỘT giai đoạn. Xong thì `/verify` có ảnh chụp, báo cáo, rồi DỪNG chờ duyệt.**

---

## 0. QUY TẮC BẮT BUỘC (đọc trước khi làm bất cứ việc gì)

Đọc `.agents/memory/` (đặc biệt `feedback-history.md`, `tech-decisions.md`, `user-preferences.md`). Nếu mâu thuẫn với file này thì hỏi lại người dùng, không tự đoán.

**Bối cảnh:** dự án "Sợi Nguồn" dự thi AI Arena Vietnam 2026, đề "Việt phục Remix". Giám khảo chấm sáng tạo, tầm nhìn, khả năng triển khai. Cạnh tranh ~297 đội, chọn 8 đội. Demo phải chạy mượt, không lỗi.

**Phạm vi đã chốt (KHÔNG mở rộng):**
- 3 trang phục chính × 2 giới: tứ thân (nữ) / áo the + khăn xếp (nam) Bắc Bộ; ngũ thân (nữ, nam) Huế; bà ba (nữ, nam) Nam Bộ.
- Ẩn khỏi wizard, không xoá dữ liệu: áo dài, nhật bình, mãng bào, giao lĩnh, áo tấc, trang phục dân tộc thiểu số.
- Hai chế độ tách biệt: **Truyền thống** (kín vai, không món hiện đại) và **Cách tân / Hiện đại** (được khoét vai, crop, bomber, sneaker...).
- Nhân vật xem trước = nhân vật 2D hiện có. KHÔNG vẽ lại nhân vật từ đầu.
- Không database. Dùng localStorage / IndexedDB. Tên model đọc từ MỘT hằng số trong `src/config.ts`. Không ghi cứng API key.

**Phong cách (Zine Đông Hồ):** giấy dó `#F3E9D6`, mực `#1A1410`, đỏ son `#A8231A`, vàng nghệ `#E3A72F`, chàm `#1B2A5C`, lục `#0F5B4A`; viền mực 2px, bóng cứng, sợi chỉ đỏ, tem. Hồng sen / xanh cốm chỉ dùng ở chế độ Cách tân.

**Chuẩn giao diện:**
- Tiếng Việt chuẩn dấu. Chữ thường cho câu phụ và lời văn: `text-transform: none`, `letter-spacing: 0`. (Lỗi đã lặp nhiều lần: nếu thấy chữ vẫn viết hoa giãn chữ thì tìm đúng CSS gây ra và sửa tận gốc.)
- Chữ nội dung ≥ 16px, tương phản ≥ 4.5:1, vùng bấm ≥ 44px, focus ring vàng nghệ, bàn phím dùng được, `prefers-reduced-motion` được tôn trọng.
- Không emoji làm icon. Không thuật ngữ Anh không cần thiết (tránh "Top/Bottom", "Styling tip", "Outfit", "Heritage & Future").

**Lỗi cũ KHÔNG ĐƯỢC LẶP LẠI:**
1. Sợi chỉ đỏ / phần tử trang trí đè lên chữ.
2. Tên bộ phối bị nhân vật che quá 30% hoặc mất dấu tiếng Việt.
3. Ảnh lỗi, chữ alt, placeholder dạng `[COSTUME-...]` hiện ra thay vì fallback đẹp.
4. Trừ lượt "Tạo ảnh thật" khi chưa có ảnh.
5. Cultural Guard / Lookbook nhắc món KHÔNG có trên nhân vật.
6. Nhãn dán trỏ sai món; phần tử chồng lên nhau.
7. Hiển thị trang phục sai ngữ cảnh (nhân vật áo phông + váy ngắn ở bước "đi lễ chùa" và trong cuốn sổ áo).

**Nguyên tắc nội dung văn hoá:** dùng cách nói thận trọng; gắn nhãn "cần đối chiếu" khi chưa chắc; KHÔNG bịa nguồn hay số liệu; chỉ gợi ý nơi tra cứu (Bảo tàng Phụ nữ Việt Nam, Bảo tàng Dân tộc học Việt Nam, Trung tâm Bảo tồn Di tích Cố đô Huế). Ảnh AI luôn có nhãn "Ảnh do AI tạo".

**Chưa làm lúc này (không đụng):** tab Lookbook, ghép khuôn mặt người dùng, virtual try-on thật, 3D.

---

## 1. Ý TƯỞNG LỚN

Từ "chọn thẻ rồi nhìn nhân vật đổi" thành **"bạn nói bằng lời, Stylist hiểu, nhân vật mặc, rồi giải thích vì sao đúng"**.

Ví dụ người dùng gõ: *"Mình đi đám cưới bạn ở Hà Nội mùa thu, thích màu nhã, không muốn quá cổ."* Gemini trả JSON có cấu trúc; nhân vật tự mặc đúng bộ đó; kèm lời giải thích văn hoá có nhãn độ tin cậy. Thẻ chọn cũ vẫn còn để chỉnh tay.

**Kiến trúc: "AI đề xuất, luật quyết định, nhân vật thể hiện"**

```
Lời người dùng
   ↓
Gemini (structured JSON), CHỈ được chọn id có trong kho trang phục
   ↓
Validator (loại id lạ, ép về giá trị hợp lệ) → Cultural Guard (rule engine, chỉ nhắc, không chặn)
   ↓
Outfit state (DÙNG CHUNG với wizard)
   ↓
Nhân vật 2D mặc đồ → Giải thích văn hoá (Gemini, có confidence)
   ↓
Lưu / Chia sẻ / Tạo ảnh thật (tuỳ chọn)
```

Gemini KHÔNG được vẽ hay bịa trang phục; chỉ chọn trong danh sách id có sẵn.

**Schema trả về (tối thiểu):**

```json
{
  "gender": "female | male",
  "region": "bac | hue | nam",
  "occasion": "string (id dịp trong kho)",
  "top": "tu-than | ao-the | ngu-than | ba-ba",
  "bottom": "id quần/váy trong kho",
  "accessories": ["id phụ kiện trong kho"],
  "shoes": "id giày trong kho",
  "mode": "traditional | modern",
  "palette": { "top": "#hex", "accent": "#hex" },
  "reasoning": "tối đa 2 câu, giọng gần gũi, tiếng Việt",
  "culture_notes": [
    { "item": "id món", "note": "string", "confidence": "high | medium | needs_verification" }
  ],
  "needs_verification": true
}
```

---

## 2. GIAI ĐOẠN

### GĐ1: LỚP NỀN TRUNG TÍNH (làm trước, nhỏ)

**Vấn đề:** nhân vật mặc áo phông có cờ + váy ngắn xuất hiện ở bước chọn dịp và trong cuốn sổ áo (tab Học), phản lại thông điệp "đẹp và đúng".

**Yêu cầu:**
1. Tạo "bộ nền" trung tính, kín đáo: áo bó sát màu kem, quần ngắn trơn màu kem, KHÔNG logo, KHÔNG cờ. Hiển thị nhãn nhỏ "Lớp nền". Chỉ dùng ở bước 1 (giới tính, tóc) khi chưa chọn áo.
2. Từ bước chọn dịp: nếu chưa có áo chính thì tự mặc bộ MẶC ĐỊNH theo dịp, theo bảng cấu hình dễ sửa (ví dụ `src/data/occasionDefaults.ts`): chùa → ngũ thân nữ / bà ba kín đáo; Tết → tứ thân; dạo phố → bà ba; tốt nghiệp → ngũ thân... Người dùng đổi được ở bước chọn áo.
3. Cuốn sổ áo và mọi thẻ trang phục luôn dùng hình mặc ĐÚNG áo đang nói. Không bao giờ dùng bộ nền.
4. Cultural Guard: bộ nền hợp lệ khi chưa chọn áo; chặn nút "Hoàn tất" nếu chưa có áo chính, kèm câu giải thích.
5. Phông bối cảnh khớp dịp (lễ chùa phải là ảnh chùa; nếu chưa có ảnh phù hợp thì dùng duotone + hoạ tiết, không dùng ảnh sai dịp).

**Nghiệm thu:** `/verify` ảnh chụp 1440×900: (a) bước 1, (b) bước dịp = "đi lễ chùa", (c) trang đầu cuốn sổ áo, (d) bấm "Hoàn tất" khi chưa chọn áo. Không lỗi console. Dừng chờ duyệt.

---

### GĐ2: LÕI AI (`/orchestrate`, có bước duyệt kế hoạch)

Lập kế hoạch và xin duyệt TRƯỚC khi giao việc.

1. **`src/services/stylistService.ts`**
   - Nhận: câu mô tả tự do + giới tính hiện tại.
   - Gọi Gemini: tên model đọc từ `src/config.ts`; `responseMimeType: application/json` + `responseSchema` theo schema ở mục 1.
   - Gọi qua lớp service (hoặc proxy mỏng `/api/stylist` nếu đã có backend), KHÔNG để lộ API key trong bundle.
2. **System instruction:** chỉ chọn id trong danh sách truyền vào (lấy từ `src/data/coreCostumes.ts` và các bảng quần/phụ kiện/giày); không chắc thì `confidence = needs_verification`; không bịa nguồn; giọng gần gũi; luôn tiếng Việt; tôn trọng quy tắc 2 chế độ (traditional không chứa món hiện đại).
3. **Validator:** loại mọi id không có trong kho và thay bằng giá trị mặc định hợp lệ; JSON hỏng thì thử lại 1 lần.
4. **DỰ PHÒNG (bắt buộc):** nếu API lỗi / timeout 20s / hết hạn mức thì dùng bộ luật từ khoá (chùa, đám cưới, Tết, cà phê, tốt nghiệp, màu nhã, màu rực...) để chọn outfit; hiện banner nhẹ "Đang dùng chế độ ngoại tuyến". Không bao giờ để màn trắng.
5. **UI:** ô nhập ở đầu luồng thử đồ ("Bạn muốn mặc đi đâu? Kể bằng lời của bạn"), 3 câu gợi ý bấm nhanh, nút gửi, trạng thái "Stylist đang phối đồ" (kim chỉ khâu). Kết quả cập nhật CÙNG state với wizard để đổi bằng thẻ vẫn hoạt động; nhân vật mặc tức thì kèm hiệu ứng.
6. Quyền riêng tư: không lưu câu người dùng nhập, không gửi dữ liệu cá nhân.

**Nghiệm thu:**
- `/test`: validator (id lạ, JSON hỏng) và dự phòng từ khoá.
- `/verify`: ảnh chụp 5 câu mẫu: "đám cưới bạn ở Hà Nội mùa thu", "đi chùa mùng một", "cà phê cuối tuần", "chụp ảnh Tết", và một câu vô nghĩa. Chạy cả khi có và khi tắt mạng.

---

### GĐ3: GIẢI THÍCH VĂN HOÁ + CULTURAL GUARD

1. Thay đoạn "Góc nhìn trẻ" viết sẵn bằng thẻ **"Stylist giải thích"**: hiển thị `reasoning` và `culture_notes` kèm nhãn confidence ("cần đối chiếu" khi chưa chắc) và nút "Báo sai chi tiết" (lưu cục bộ, hiện "Cảm ơn bạn").
2. Khi API lỗi: dùng nội dung từ knowledge base (`coreCostumes.ts`), không để thẻ trống.
3. **Cultural Guard** (rule engine tất định) chạy trên outfit do AI chọn hoặc người dùng chọn:
   - Chỉ đánh giá món ĐANG có trên nhân vật.
   - 8–10 luật cụ thể (mỗi luật: `rule_id`, lý do 2–3 câu cụ thể, phương án thay thế). Ví dụ: tứ thân phối phụ kiện miền khác; áo the / khăn xếp dùng như "costume"; ở chế độ Truyền thống mà thêm món hiện đại thì gợi ý chuyển sang Cách tân; bỏ cả yếm và vạt buộc thì nhắc "không còn nét tứ thân"; trang phục quá hở cho dịp đi chùa.
   - Chỉ nhắc, không chặn (trừ chặn "Hoàn tất" khi chưa có áo chính).
   - Nút "Sửa giúp tôi" áp dụng thật lên nhân vật; nút "Tôi hiểu, vẫn giữ" không tràn khỏi modal; focus trap, Esc đóng.
   - Không luật nào kích hoạt: hiện con dấu xanh "Hài hoà" kèm một câu cụ thể.
4. Chữ thường, không uppercase giãn chữ.

**Nghiệm thu:** `/test` mỗi luật ≥ 1 ca kích hoạt và 1 ca không; `/verify` ảnh chụp thẻ giải thích và một cảnh báo thật.

---

### GĐ4: KHÉP VÒNG

1. **Lịch → thử đồ:** ở tab Lịch trình, mỗi sự kiện có nút "Gợi ý outfit cho sự kiện này": điền sẵn dịp và bối cảnh, mở wizard với câu mô tả soạn sẵn gửi vào `stylistService`.
2. **Chia sẻ:** màn kết quả có nút "Chia sẻ" xuất thẻ 1080×1350 (nhân vật, tên bộ phối, palette 5 chấm, một câu văn hoá, nhãn Truyền thống/Cách tân, nhãn "Ảnh do AI tạo" nếu có) bằng `html-to-image`, kèm tải về.
3. **Hành động chính luôn thấy, không cần cuộn** ở màn kết quả: Lưu, Chia sẻ, Tạo ảnh thật.
4. Tên bộ phối đồng nhất theo chế độ (Truyền thống / Cách tân) ở poster, thẻ chia sẻ và prompt ảnh.

**Nghiệm thu:** `/verify`: bấm sự kiện ở Lịch → vào wizard đã điền sẵn → có kết quả → xuất được thẻ chia sẻ.

---

## 3. THỨ TỰ ƯU TIÊN NẾU THIẾU THỜI GIAN / TOKEN

GĐ1 → GĐ2 → GĐ4 (mục 1, 3) → GĐ3 → GĐ4 (mục 2, 4).

## 4. TIÊU CHÍ CHUNG ĐỂ COI LÀ XONG

- [ ] Không còn nhân vật áo phông / váy ngắn ở bất kỳ màn nói về trang phục truyền thống.
- [ ] Gõ một câu tự do → nhân vật mặc đúng bộ trong ≤ 5 giây (hoặc dự phòng tức thì).
- [ ] Tắt mạng: vẫn có kết quả (chế độ ngoại tuyến), không màn trắng, không ảnh lỗi.
- [ ] Cultural Guard chỉ nhắc món đang mặc, lý do cụ thể.
- [ ] Mọi thông tin văn hoá có nhãn độ tin cậy; không bịa nguồn.
- [ ] Không lỗi console; 1440×900 và 390px đều gọn.
- [ ] Tên model chỉ xuất hiện ở `src/config.ts`; trang "Về giải pháp" đọc từ đó và mô tả đúng những gì app thật sự làm.

## 5. LƯU Ý CHO AGENT

- Làm đúng một giai đoạn mỗi lượt; không làm trước giai đoạn sau.
- Không viết lại phần đã ổn (nhân vật, wizard, phong thư trang chào, cuốn sổ áo) trừ khi giai đoạn yêu cầu.
- Mỗi thay đổi phải hoàn tác được; không xoá dữ liệu trang phục đã ẩn.
- Cuối mỗi giai đoạn báo: đã sửa gì (file), chưa làm gì, chỗ nào cần con người kiểm chứng (đặc biệt: độ chính xác trang phục, ảnh bối cảnh).
- Nếu một thay đổi làm giao diện xấu đi, hoàn tác và báo người dùng thay vì cố vá.
