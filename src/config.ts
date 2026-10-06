/**
 * Cấu hình trung tâm — tên model AI chỉ khai ở đây.
 * Trang "Về giải pháp" và mọi service đều đọc từ file này.
 */

export const AI_MODEL = import.meta.env.GEMINI_MODEL || 'gemini-1.5-flash';

export const GEMINI_API_ENDPOINT = '/api/stylist';

/** Timeout (ms) trước khi chuyển sang fallback ngoại tuyến */
export const STYLIST_TIMEOUT_MS = 20_000;

/** Số lượt gọi stylist tối đa mỗi phiên */
export const STYLIST_MAX_CALLS_PER_SESSION = 50;

/** Độ dài tối đa ô nhập (ký tự) */
export const STYLIST_INPUT_MAX_LENGTH = 200;
