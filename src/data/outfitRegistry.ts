/**
 * Nguồn chân lý cho mọi ID trang phục hợp lệ.
 * Lấy đúng từ dữ liệu wizard (Step3Top, Step4Bottom, Step5Accessories, Step2bEvent).
 * Validator và keywordFallback đều import từ đây.
 */

// --- Áo (Step3Top) ---
export const VALID_TOPS = [
  'ao-tu-than',   // tứ thân (nữ, Bắc Bộ)
  'ao-the',       // áo the (nam, Bắc Bộ)
  'ao-ngu-than',  // ngũ thân (unisex, Huế)
  'ao-ba-ba',     // bà ba (unisex, Nam Bộ & Trung)
] as const;

// --- Quần / Váy (Step4Bottom) ---
export const VALID_BOTTOMS = [
  'quan-lua',     // quần lụa (traditional)
  'vay-den',      // váy đụp đen (traditional, chỉ nữ)
  'quan-short',   // quần short (modern)
  'jeans',        // jeans ống rộng (modern)
  'cargo',        // quần cargo (modern)
] as const;

// --- Phụ kiện KHÔNG phải giày (head, neck, hand) ---
export const VALID_ACCESSORIES = [
  'khong-doi',    // không đội gì (head)
  'non-la',       // nón lá (head)

  'khan-dong',    // khăn đóng (head)
  'non-quai-thao',      // nón quai thao (head)
  'khong-khan',   // không đeo khăn (neck)
  'khan-ran',     // khăn rằn (neck)

] as const;

// --- Giày dép (feet) — TÁCH riêng, không trùng accessories ---
export const VALID_SHOES = [
  'guoc',         // guốc mộc
  'sneaker',      // sneaker (modern)
  'giay-da',      // giày da (modern)
  'chan-dat',      // chân không
] as const;

// --- Dịp (Step2bEvent) ---
export const VALID_OCCASIONS = [
  'chua',         // đi lễ chùa
  'le-hoi',       // đi lễ tết
  'bao-tang',     // thăm bảo tàng
  'dao-pho',      // dạo phố cổ
  'su-kien',      // dự sự kiện
  'ca-phe',       // cà phê cuối tuần
] as const;

// --- Vùng miền ---
export const VALID_REGIONS = ['bac', 'hue', 'nam'] as const;

// --- Chế độ ---
export const VALID_MODES = ['traditional', 'modern'] as const;

// --- Giới tính ---
export const VALID_GENDERS = ['female', 'male'] as const;

// --- Món chỉ dùng ở modern ---
export const MODERN_ONLY_ITEMS = ['quan-short', 'jeans', 'cargo', 'sneaker'] as const;

// --- Ánh xạ áo theo giới tính + miền (Bắc Bộ) ---
export const GENDER_TOP_MAP: Record<string, Record<string, string>> = {
  bac: { female: 'ao-tu-than', male: 'ao-the' },
};

// --- Type helpers ---
export type ValidTop = typeof VALID_TOPS[number];
export type ValidBottom = typeof VALID_BOTTOMS[number];
export type ValidAccessory = typeof VALID_ACCESSORIES[number];
export type ValidShoe = typeof VALID_SHOES[number];
export type ValidOccasion = typeof VALID_OCCASIONS[number];
export type ValidRegion = typeof VALID_REGIONS[number];
export type ValidMode = typeof VALID_MODES[number];
export type ValidGender = typeof VALID_GENDERS[number];
