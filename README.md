<div align="center">

# 🏮 Sắc Việt Remix

**Mặc truyền thống, sống Gen Z – Đẹp và Đúng**

[![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Oxlint](https://img.shields.io/badge/Linter-Oxlint-brightgreen)](https://oxc.rs/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<p align="center">
  Ứng dụng khám phá và phối trang phục truyền thống Việt Nam theo phong cách hiện đại, tích hợp bộ lọc văn hoá <strong>Cultural Guard</strong> và trợ lý thông minh.
</p>

[Khám phá Tính năng](#-tính-năng-chính) •
[Cài đặt & Khởi chạy](#-bắt-đầu-nhanh) •
[Cấu trúc Dự án](#-cấu-trúc-thư-mục) •
[Cấu hình Công cụ](#-cấu-hình--tối-ưu)

</div>

## Demo Image Generation

Chức năng tạo ảnh hiện chạy ở DEMO MODE, chỉ tải ảnh local, không gọi API tạo ảnh và không cần API key.

1. Thêm ảnh vào `public/demo-generated/`, ví dụ `ao-dai-1.webp`, `tu-than-streetwear.webp`, `nhat-binh-red.webp`.
2. Đăng ký ảnh trong `src/data/demoGeneratedImages.ts`: mỗi ảnh có `id`, `src` và các tag tùy chọn `garments`, `styles`, `occasions`, `colors`, `keywords`.
3. App chuẩn hóa chữ thường, bỏ dấu tiếng Việt và dấu câu. Trang phục, style, dịp và màu ghi rõ trong prompt được ưu tiên hơn lựa chọn trên giao diện; trường nào không được nhận diện trong prompt sẽ dùng lựa chọn trên giao diện. Trang phục được ưu tiên khi chấm điểm; style, dịp, màu và keyword giúp chọn ảnh cụ thể hơn. Nếu không có trang phục, app dùng keyword trong prompt. Chỉ những ảnh tải được mới được chọn; các ảnh cùng mức khớp được chọn ngẫu nhiên, tránh lặp ảnh trước khi có lựa chọn khác.
4. Đặt ảnh mặc định tại `public/demo-generated/default.webp`, hoặc đổi `src` của mục `id: 'default'` trong mapping. Khi ảnh này thiếu, app dùng `/hero/hero-tu-than.webp` có sẵn.
5. Ảnh có tag `gender: 'male' | 'female'`. Giới tính ghi rõ trong prompt được ưu tiên; nếu không có, app dùng lựa chọn Nam/Nữ trên giao diện. Ảnh nam mặc định dùng mục `id: 'default-male'`. Ví dụ prompt nam: `Nam mặc áo ngũ thân xanh chàm truyền thống tại Đại Nội Huế`, `Nam mặc áo bà ba nâu mộc mạc bên sông miền Tây`, `Nam mặc áo dài xanh lá thanh lịch bên nhà cổ`. Prompt chỉ chọn trong các ảnh demo đã đăng ký; mô tả khác nhau cần khớp tag trang phục, màu hoặc bối cảnh để trả ảnh khác nhau.

Ví dụ thêm vào mapping:

```ts
{ id: 'nhat-binh-red', src: '/demo-generated/nhat-binh-red.webp',
  garments: ['nhat binh'], colors: ['do', 'red', '#A8231A'],
  occasions: ['hue', 'su kien'], keywords: ['cung dinh'] }
```

Service mock: `src/services/image/demoImageService.ts`. Modal gọi interface chung trong `src/services/image/ImageGenerationProvider.ts` qua `imageGenerationService.ts` (`IMAGE_GENERATION_MODE = 'demo'`). Sau này thay provider tại file này để giữ nguyên UI; API mode chưa được triển khai. Mỗi lượt chờ khoảng 2 giây, vẫn dùng giới hạn 5 lượt hiện tại.

---

## ✨ Tính năng chính

- 👘 **Smart Styling Wizard**: Phối đồ 4 bước theo bối cảnh, sự kiện, tông màu ngũ hành và mức độ remix.
- 🛡️ **Cultural Guard**: Rule engine tất định kiểm tra tính chuẩn mực văn hoá trước khi gợi ý phối đồ.
- 🎨 **Neo-Heritage Design**: Giao diện Mobile-first mang bảng màu cung đình và dân gian đặc trưng.
- ⚡ **Ultra Fast DX**: Khởi động tức thì với Vite, tối ưu kiểm tra mã nguồn bằng Oxlint.

---

## 🚀 Bắt đầu nhanh

### Yêu cầu tiên quyết
- **Node.js**: Phiên bản `18.x` trở lên
- Trình quản lý gói: `npm`, `pnpm`, hoặc `yarn`

### Cài đặt

```bash
# 1. Clone repository
git clone [https://github.com/](https://github.com/)<your-username>/sac-viet-remix.git
cd sac-viet-remix

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Tạo file .env.local và thêm API key (không cần tiền tố VITE_)
echo GEMINI_API_KEY=your_api_key_here > .env.local

# 4. Khởi chạy môi trường phát triển
npm run dev
```

### ⚠️ Lưu ý khi Deploy Production
Hiện tại dự án đang sử dụng Vite Proxy để gọi Gemini API trong môi trường dev nhằm bảo mật API key. 
Khi deploy lên production (Vercel, Netlify...), bạn **BẮT BUỘC** phải thay thế Proxy bằng một hàm Serverless (ví dụ: Vercel Functions hoặc Cloudflare Workers) để ẩn API key, vì Vite Proxy sẽ không hoạt động ở build production.
