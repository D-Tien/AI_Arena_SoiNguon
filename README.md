# Sắc Việt Remix (Neo-Heritage Gen Z Fashion Stylist)

> **"Mặc truyền thống, sống Gen Z – Đẹp và Đúng"**  
> Dự án tham dự cuộc thi **AI Arena Vietnam 2026** – Hạng mục Ứng dụng AI sáng tạo.

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-orange.svg)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 1. Bối cảnh & Đặt vấn đề

Áo dài, Áo ngũ thân, Áo tứ thân, Áo giao lĩnh hay Áo nhật bình... đang được thế hệ trẻ (Gen Z, Gen Alpha) đón nhận nồng nhiệt. Tuy nhiên, rào cản lớn nhất của các bạn trẻ (16–24 tuổi) khi tiếp cận Việt phục là:
- **Nỗi sợ "mặc sai" / bị chê trách:** Không nắm rõ bối cảnh lịch sử, ý nghĩa hoa văn, phụ kiện tương thích.
- **Thiếu sự gợi ý linh hoạt:** Khó tìm ra phương án kết hợp giữa vẻ đẹp truyền thống và phong cách thường nhật (sneaker, blazer, quần ống rộng, phụ kiện streetwear).
- **Nguy cơ xâm phạm văn hoá (Cultural Appropriation):** Biến tấu thiếu hiểu biết đối với trang phục thiêng liêng, trang phục nghi lễ hoặc di sản của các đồng bào dân tộc thiểu số.

**Sắc Việt Remix** ra đời nhằm giải quyết bài toán: **Làm sao để người trẻ tự tin sáng tạo với cổ phục mà vẫn giữ trọn lòng tôn kính với cội nguồn văn hoá dân tộc.**

---

## ✨ 2. Tính năng nổi bật

### 2.1. Wizard phối đồ thông minh (4 bước)
1. **Bối cảnh & Tình huống:** Chọn sự kiện (Lễ tốt nghiệp, Đi chùa/đền đầu năm, Cà phê phố cổ, Dự tiệc, Đi học...).
2. **Cổ phục chủ đạo:** Áo dài ngũ thân, Áo tứ thân & yếm, Áo Nhật Bình Huế, Áo bà ba Nam Bộ, v.v. (kèm độ an toàn khi remix từ 1–5).
3. **Gu thời trang & Bảng màu:** Minimalist, Streetwear, Y2K/Retro, Cottagecore, Nghệ sĩ; tích hợp bảng màu Ngũ hành (Kim - Mộc - Thủy - Hỏa - Thổ).
4. **Mức độ Remix (Slider):** Tinh chỉnh từ *“Bảo tồn truyền thống (0%)”* đến *“Phá cách Gen Z (100%)”*.

### 2.2. Cultural Guard – Lưới lọc Văn hoá Tất định (Deterministic Rule Engine)
Điểm nhấn kỹ thuật cốt lõi giúp phân biệt Sắc Việt Remix với các ứng dụng AI tạo sinh thông thường:
- **Chạy TRƯỚC khi gọi AI:** 12+ quy tắc nghiêm ngặt ngăn chặn lỗi phản cảm ngay từ đầu vào.
- **3 cấp độ cảnh báo:**
  - 🟢 **Xanh (Hài hoà):** Phối đồ an toàn, văn minh.
  - 🟡 **Vàng (Lưu ý bối cảnh):** Áo cung đình (Nhật Bình) đi dạo phố, khuyến nghị bối cảnh trang trọng hơn.
  - 🔴 **Đỏ (Vi phạm/Cấm remix):** Đồ hở hang khi đi lễ chùa; hoặc cố tình biến đổi, cosplay trang phục dân tộc thiểu số (H'Mông, Ê Đê...). Hệ thống sẽ khóa remix và tự động chuyển sang chế độ **"Tìm hiểu Di sản"**.
- **Triết lý:** *"Hiểu để phối, không phải để cấm"* – kèm nút gợi ý *"Sửa giúp tôi"* và lý giải lịch sử cặn kẽ.

### 2.3. AI Stylist & Đánh giá Đa chiều (Gemini 2.5 Flash)
- Sinh 3 phương án phối đồ tương ứng: **Safe (An toàn) - Balanced (Cân bằng) - Bold (Phá cách)**.
- **Cultural Respect Score (0 - 100):** Đánh giá mức độ bảo tồn tinh thần nguyên bản.
- **Color Harmony Score (0 - 100):** Phân tích bánh xe màu HSL và ý nghĩa ngũ hành dân gian.
- **Styling Tips:** Gợi ý kiểu tóc, trang điểm, phụ kiện và tư thế (pose) chụp ảnh kỷ yếu/street style.

### 2.4. Dự phòng ngoại tuyến (Offline Fallback & Cache)
Nếu kết nối mạng chập chờn hoặc hết hạn mức API, hệ thống kích hoạt chế độ **Offline Mock Layer**, đảm bảo trải nghiệm người dùng và buổi thuyết trình demo không bao giờ bị gián đoạn.

---

## 🏛️ 3. Cơ sở Dữ liệu & Nguồn gốc Văn hoá

Dữ liệu Việt phục trong ứng dụng được biên soạn dựa trên các tư liệu khảo cứu lịch sử uy tín:
- **Bảo tàng Phụ nữ Việt Nam**
- **Bảo tàng Dân tộc học Việt Nam**
- **Trung tâm Bảo tồn Di tích Cố đô Huế** & *Khâm định Đại Nam hội điển sự lệ*
- Các dự án phục dựng cổ phục độc lập tại Việt Nam (Vietnam Centre, Ỷ Vân Hiên, Đại Việt Cổ Phong)

> **Cam kết AI có trách nhiệm:** Mọi dữ liệu cổ phục đều có ghi chú nguồn rõ ràng. Các thông tin chưa thống nhất trong giới nghiên cứu đều được gắn cờ `needs_verification` để tránh ngộ nhận lịch sử.

---

## 🏗️ 4. Kiến trúc Hệ thống

```text
┌─────────────────────────────────────────────────────────────┐
│                 Client (React + TypeScript)                 │
│  - Neo-Heritage UI / Tailwind CSS                           │
│  - Zustand Global Store                                     │
│  - Framer Motion Animations                                 │
└──────────────┬──────────────────────────────────────────────┘
               │ (1) User Input
               ▼
┌─────────────────────────────────────────────────────────────┐
│             Cultural Guard (Rule Engine)                    │
│  - 12+ Deterministic Heritage Rules                          │
│  - Context-aware Sanitizer                                  │
└──────────────┬──────────────────────────────────────────────┘
               │ (2) Passed / Warning Accepted
               ▼
┌─────────────────────────────────────────────────────────────┐
│          Backend Proxy / Gemini Service Layer               │
│  - Inject Knowledge Base + System Instruction               │
│  - Schema Enforcement (JSON Schema)                         │
│  - Open-Meteo Weather API Integration                       │
│  - In-memory / LocalStorage Hash Cache                      │
└──────────────┬──────────────────────────────────────────────┘
               │ (3) Structured Output
               ▼
┌─────────────────────────────────────────────────────────────┐
│       UI Rendering & Lookbook Generation (Canvas/Export)     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 5. Cấu trúc thư mục (Project Structure)

```plaintext
sac-viet-remix/
├── public/                  # Assets tĩnh, font chữ thư pháp & hoa văn
├── src/
│   ├── assets/              # SVG biểu tượng dân gian, hoa văn trống đồng, gấm vóc
│   ├── components/
│   │   ├── Header.tsx       # Thanh điều hướng mang phong cách Neo-Heritage
│   │   ├── Wizard.tsx       # Bộ điều khiển 4 bước chọn phong cách
│   │   ├── OutfitResult.tsx # Render 3 phương án phối đồ (Safe / Balanced / Bold)
│   │   ├── CulturalGuard.tsx# Modal cảnh báo tôn trọng văn hoá
│   │   ├── BottomSheet.tsx  # Thẻ khám phá kiến thức lịch sử chi tiết
│   │   └── LookbookCard.tsx # Thẻ ảnh 1080x1350 xuất ra để chia sẻ Story/FB
│   ├── data/
│   │   └── culturalDb.ts    # Dữ liệu chuẩn hoá 12+ bộ trang phục truyền thống
│   ├── rules/
│   │   └── culturalGuard.ts # Engine 12 luật tất định kiểm duyệt bối cảnh
│   ├── services/
│   │   ├── aiService.ts     # Tích hợp Gemini 2.5 Flash + Fallback Mock Layer
│   │   └── weatherService.ts# Tích hợp Open-Meteo gợi ý chất liệu theo thời tiết
│   ├── store/
│   │   └── useAppStore.ts   # Quản lý State bằng Zustand
│   ├── styles/
│   │   └── globals.css      # Cấu hình Tailwind, biến màu Neo-Heritage
│   ├── App.tsx              # Component tổng & điều phối màn hình
│   └── main.tsx             # Entry point
├── .env.example             # File mẫu biến môi trường
├── package.json
├── tailwind.config.js       # Hệ màu di sản: Kem (#FBF6EE), Đỏ son (#B3261E), Chàm (#1F2A5A)...
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 6. Bảng màu Neo-Heritage

| Mã màu | Tên gọi dân tộc | Ý nghĩa văn hoá |
| :--- | :--- | :--- |
| `#FBF6EE` | **Màu Giấy Dó (Kem ấm)** | Màu nền chủ đạo, mang hơi thở mộc mạc của tranh Đông Hồ |
| `#B3261E` | **Màu Đỏ Son** | Sắc màu lễ hội, cung đình, hỷ sự và nhiệt huyết trẻ |
| `#E0A526` | **Màu Vàng Nghệ** | Sự phồn vinh, sắc lụa tơ tằm truyền thống |
| `#0F6B5A` | **Xanh Ngọc Lục Bảo** | Nét trầm mặc của sông hương, núi ngự và men gốm cổ |
| `#1F2A5A` | **Xanh Chàm Đàng Trong** | Đại diện cho sắc áo ngũ thân, sự điềm tĩnh và lịch lãm |
| `#2B2118` | **Nâu Đen Mực Nho** | Màu chữ chuẩn, tạo độ tương phản cao và dễ đọc |

---

## 🚀 7. Cài đặt & Khởi chạy (Quick Start)

### Yêu cầu tiên quyết
- **Node.js** >= 18.x
- Trình quản lý gói `npm` hoặc `pnpm` / `yarn`

### Các bước thực hiện

1. **Clone repository:**
   ```bash
   git clone https://github.com/your-username/sac-viet-remix.git
   cd sac-viet-remix
   ```

2. **Cài đặt thư viện dependencies:**
   ```bash
   npm install
   ```

3. **Cấu hình biến môi trường:**
   Tạo file `.env` tại thư mục gốc:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
   *(Lưu ý: Nếu không điền API Key, ứng dụng sẽ tự động chuyển sang chế độ Demo Ngoại tuyến với bộ Mock Data tích hợp sẵn).*

4. **Chạy máy chủ phát triển (Development Server):**
   ```bash
   npm run dev
   ```
   Mở trình duyệt tại địa chỉ `http://localhost:5173` để trải nghiệm.

---

## 🧪 8. Kịch bản Demo bấm nhanh (One-Click Scenarios)

Dành cho Ban Giám Khảo trải nghiệm nhanh các tình huống thực tế:
1. **Lễ tốt nghiệp trang nhã:** Áo dài cách tân nữ phối Blazer mỏng & Sneaker trắng.
2. **Đi chùa mùng 1 Tết:** Áo ngũ thân nam lập lĩnh + quần âu + guốc mộc/giày lười (Kích hoạt luật xanh).
3. **Thử nghiệm Cultural Guard (Cảnh báo Đỏ):** Chọn bối cảnh *"Đi chùa/Nơi tôn nghiêm"* nhưng chọn phong cách *"Streetwear/Y2K"* với mức Remix > 75%. Hệ thống sẽ lập tức can thiệp và giải thích lý do tôn nghiêm.

---

## 🛣️ 9. Lộ trình phát triển (Phase 2 Roadmap)

- [ ] **Virtual AR Try-on:** Tích hợp Google MediaPipe để nhận diện dáng người và ướm trang phục trực tiếp qua camera điện thoại theo thời gian thực.
- [ ] **AI Advisor Chatbot:** Trợ lý ảo thời trang tương tác bằng giọng nói/văn bản với ngôn ngữ Gen Z thân thiện.
- [ ] **Bản đồ Di sản Làng nghề:** Định vị và giới thiệu các làng nghề dệt lụa Vạn Phúc, thổ cẩm Mai Châu, lụa Nha Xá trực tiếp đến người dùng có nhu cầu đặt may.

---

## 📄 10. Giấy phép (License) & Tuyên bố miễn trừ

- Mã nguồn được phân phối dưới giấy phép **MIT License**.
- Toàn bộ hoa văn minh hoạ và dữ liệu văn hoá đều phục vụ mục đích giáo dục, tôn vinh di sản phi thương mại.