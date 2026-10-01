# Kế hoạch Thiết kế lại luồng Thử đồ (Wardrobe Wizard)

Kế hoạch này tập trung thay đổi luồng trải nghiệm thử đồ thành 6 bước.
Theo ghi chú từ hệ thống, phong cách thiết kế bám sát "Zine Đông Hồ" (tối giản, giấy dó, chỉ đỏ) và luôn tuân thủ nguyên tắc "nhắc, không chặn" của Cultural Guard.

## (1) State Chung (State Management)
State của phần thử đồ sẽ lưu trữ các thuộc tính sau ở component cha:
- `gender`: 'female' | 'male'
- `hair`: string (kiểu tóc)
- `place`: 'Hà Nội' | 'Huế' | 'Sài Gòn' (ảnh hưởng phông nền và gợi ý áo)
- `top`: string (áo - tứ thân/áo the, ngũ thân, bà ba)
- `bottom`: string (quần lụa, váy đen, quần short, jeans ống rộng, cargo)
- `accessories`: array of strings (nón lá, khăn mỏ quạ, khăn xếp/khăn đóng, vấn tóc, khăn rằn, giày)
- `mode`: 'traditional' | 'modern' (phong cách)

## (2) Các file dự kiến sẽ sửa / tạo mới
- `src/App.tsx` (cập nhật state hoặc refactor logic gọi wizard)
- Tạo mới/Sửa đổi `src/components/WardrobeWizard.tsx` (Component chính quản lý 6 bước)
- Thư mục `src/components/wizard-steps/` (Tách riêng các component con tương ứng với 6 bước để không bị quá tải logic):
  - `Step1GenderHair.tsx`
  - `Step2Place.tsx`
  - `Step3Top.tsx`
  - `Step4Bottom.tsx`
  - `Step5Accessories.tsx`
  - `Step6Mode.tsx`
- Component tiện ích: `CulturalGuardAlert.tsx` (Hiển thị nhắc nhở)

## (3) Cơ chế Cultural Guard xuyên suốt
- **Quy tắc cốt lõi:** Cultural Guard chỉ nhắc nhở (hiển thị alert nhỏ gọn hoặc pop-up tooltip tinh tế), TUYỆT ĐỐI không vô hiệu hóa (disable) hay chặn hành động của người dùng.
- **Hoạt động:** Khi người dùng chọn một món đồ (từ bước 3 đến 5), hệ thống check xem món đồ đó có khớp với `place` và `gender` không. Nếu không hợp lệ theo lịch sử/văn hóa, hiện thông báo nhắc nhở (ví dụ: "Áo tứ thân thường mặc ở Bắc Bộ, bạn có muốn thử kết hợp phá cách không?").

## (4) Bố cục giao diện (Layout)
- Chia đôi màn hình:
  - **Trái:** Hiển thị nhân vật 2D SVG chibi với các layer trang phục đang mặc (Preview). Phông nền thay đổi dựa vào `place`.
  - **Phải:** Panel cuộn chứa các lựa chọn của bước hiện tại.
- **Thanh tiến độ (Progress Bar):** Hiển thị rõ nhãn của 6 bước ở trên cùng của panel bên phải hoặc ngang trên màn hình.
- **Thanh điều hướng:** Nút "Quay lại" (Back) và "Tiếp theo" (Next) được ghim cố định (sticky/fixed) ở đáy panel bên phải để dễ dàng thao tác.

## (5) Rủi ro dự kiến
- **Quản lý Layer SVG:** Ghép nhiều phụ kiện, áo, quần, kiểu tóc... đòi hỏi các file assets phải khớp tọa độ hoàn hảo với base character.
- **Phức tạp về Logic Mode (Truyền thống vs Hiện đại):** 
  - Tại bước 6, nếu người dùng chọn "Truyền thống", hệ thống sẽ phải tự revert các item "không hợp" về set chuẩn (cần mapping sẵn các set chuẩn này) và cần hiện giải thích ngắn vì sao lại revert.
  - "Hiện đại" cần giữ nguyên lựa chọn nhưng vẫn phải kiểm tra xem "2 món linh hồn của áo" có bị mất đi không.
- **Quá tải component:** Quản lý state chung lớn có thể khiến việc render bị chậm (cần tối ưu bằng memo hoặc tách context hợp lý).

## (6) Số bước thực hiện (Roadmap)
- **Bước 1:** Khởi tạo base component `WardrobeWizard`, thiết lập state tổng và layout cơ bản (Left: Preview, Right: Options + Footer cố định).
- **Bước 2:** Xây dựng Step 1 (Giới tính + Tóc) và Step 2 (Nơi đi). Tích hợp phông nền động ở khung preview.
- **Bước 3:** Cấu trúc danh sách data cho Áo (có logic đưa áo gợi ý lên đầu dựa vào `place`), Quần/Váy, Phụ kiện.
- **Bước 4:** Xây dựng Step 3, 4, 5 (Giao diện chọn đồ) và tích hợp *Cultural Guard* kiểm tra real-time.
- **Bước 5:** Xây dựng Step 6 (Chế độ Truyền thống / Hiện đại) bao gồm logic auto-revert và segmented control.
- **Bước 6:** Tích hợp logic render SVG đè lên nhau ở màn Preview bên trái (Z-index layer) và review hoàn thiện.
