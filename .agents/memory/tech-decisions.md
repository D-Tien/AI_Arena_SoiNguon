---
type: project
created: 2026-07-18
updated: 2026-07-18
---

# Technical Decisions

- Component metadata uses SemVer while the toolkit release keeps CalVer.
- `manifest.json` and `manifest.lock.json` must remain synchronized with component frontmatter.
- Phạm vi CHỐT: chỉ 3 trang phục chính × 2 giới: tứ thân (nữ)/áo the+khăn xếp (nam) Bắc Bộ; ngũ thân Huế; bà ba Nam Bộ. Ẩn (không xoá dữ liệu): áo dài, nhật bình, mãng bào, giao lĩnh, áo tấc, dân tộc thiểu số.
- Hai chế độ tách biệt: "Truyền thống" (kín vai, không món modern) | "Cách tân" (được khoét vai, crop, bomber, sneaker...). Slider remix chỉ hoạt động ở Cách tân. Tên bộ phối đổi theo chế độ.
- Nhân vật xem trước = SVG chibi 2D (nữ, nam). Ảnh AI thật chỉ ở bước cuối "Tạo ảnh thật" + 6 ảnh demo dựng sẵn (public/demo-results/{bac|hue|nam}-{nu|nam}.webp).
- Không database. localStorage/IndexedDB. Backend mỏng (proxy) chỉ để giữ API key. Tên model đọc từ một hằng số src/config.ts.
- Cultural Guard: rule engine tất định, chỉ nhắc món ĐANG mặc, nêu lý do cụ thể, chỉ nhắc không chặn.
- Ảnh: không hotlink, không dùng ảnh không rõ giấy phép; ảnh AI phải có nhãn "Ảnh do AI tạo".
