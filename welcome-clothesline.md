# Welcome Screen: Sợi Chỉ Phơi Áo

## 1. Danh sách file sẽ sửa
- `src/App.tsx`: Viết lại hoàn toàn `WelcomeScreen`. Bỏ thanh trượt (slider), nền đỏ nửa màn hình và các nhãn cũ. Thêm layout mới với dây phơi, 3 chiếc áo, logic hover, click, và nút toggle "Truyền thống ⇄ Cách tân".
- `src/components/PaperDoll.tsx`: Bổ sung (hoặc bóc tách) các `path` SVG của 3 áo (áo tứ thân, áo ngũ thân, áo bà ba) để có thể render độc lập dưới dạng "áo treo" (không có đầu, tay chân) nếu cần, hoặc tái sử dụng các layer hiện có bằng cách truyền prop ẩn đi cơ thể.

## 2. Cách vẽ 3 chiếc áo dạng treo bằng SVG
- **Dây phơi:** Dùng một thẻ `<svg>` trải ngang màn hình với một thẻ `<path>` vẽ đường cong bezier (căng hơi chùng xuống ở giữa), stroke màu đỏ son (`#A8231A`), stroke-width 2px.
- **Áo treo:**
  - Tận dụng `PaperDoll.tsx`: Thay vì render toàn bộ `Character`, ta tạo một component `HangingClothes` chỉ render layer `top` hoặc `outer` (tứ thân, ngũ thân, bà ba) và ẩn đi `base` (cơ thể).
  - Áp dụng CSS `transform-origin: top center` và một animation `rotate` qua lại góc nhỏ (vd: -2deg đến 2deg) để tạo cảm giác đung đưa trong gió.
  - Vị trí: Dùng absolute positioning dọc theo đường cong của dây phơi.

## 3. Rủi ro
- **Chuyển đổi Hover (Layout Shift):** Khi hover, việc biến từ chiếc áo phẳng thành nhân vật phồng có tay chân có thể gây giật cục nếu bounding box không khớp nhau.
- **Không gian hạn chế (Mobile):** Trên màn hình hẹp (390px), treo 3 áo ngang có thể bị quá chật, dẫn đến chồng lấp hoặc phải thu nhỏ quá mức khiến mất chi tiết.
- **Che khuất chữ:** Theo ràng buộc `feedback-history.md`, không được để phần tử nào (sợi chỉ, nhân vật) đè lên chữ tiêu đề "Sợi Nguồn". Cần tính toán `z-index` và khoảng không cẩn thận.

## 4. Phương án lùi (Fallback)
Nếu hiệu ứng "phồng áo thành người" quá phức tạp hoặc gây lỗi hiển thị:
- **Fallback:** Khi hover vào một chiếc áo đang treo, chiếc áo chỉ phản hồi nhẹ (phóng to 1.1x, nhích lên trên). Đồng thời, một nhân vật chibi hoàn chỉnh (Character) sẽ mờ dần (fade-in) xuất hiện đứng trên bục elip ở khoảng trống bên dưới dây phơi, kèm theo nhãn tooltip chỉ tên trang phục.

## 5. Ước lượng số bước thực hiện
- **Bước 1:** Dọn dẹp `App.tsx` (xóa code thanh kéo), tạo layout tĩnh cơ bản: Tiêu đề, chữ không đè, bục elip.
- **Bước 2:** Bóc tách SVG và vẽ dây phơi + 3 chiếc áo lơ lửng, đung đưa.
- **Bước 3:** Thêm logic hover (hiện Chibi, hiện nhãn) và click (chuyển thẳng vào Wizard). Thêm toggle Truyền thống/Cách tân.
- **Bước 4:** Tối ưu hóa (Mobile responsive, kiểm tra độ tương phản, xác minh không đè chữ). Nghiệm thu bằng màn hình 1440px và 390px.
