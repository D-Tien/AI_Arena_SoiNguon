import {
  VALID_TOPS, VALID_BOTTOMS, VALID_ACCESSORIES, VALID_SHOES,
  VALID_OCCASIONS, VALID_REGIONS, VALID_MODES, VALID_GENDERS,
  MODERN_ONLY_ITEMS, GENDER_TOP_MAP,
  type ValidTop, type ValidBottom, type ValidAccessory, type ValidShoe,
  type ValidOccasion, type ValidRegion, type ValidMode, type ValidGender
} from '../data/outfitRegistry';
import { keywordFallback } from './keywordFallback';
import { GEMINI_API_ENDPOINT, STYLIST_TIMEOUT_MS } from '../config';

export interface StylistRequest {
  prompt: string;
  gender: ValidGender;
}

export interface CultureNote {
  item: string;
  note: string;
  confidence: 'high' | 'medium' | 'needs_verification';
}

export interface StylistResponse {
  gender: ValidGender;
  region: ValidRegion;
  occasion: ValidOccasion;
  top: ValidTop;
  bottom: ValidBottom;
  accessories: ValidAccessory[];
  shoes: ValidShoe;
  mode: ValidMode;
  palette: {
    top: string;
    accent: string;
  };
  reasoning: string;
  culture_notes: CultureNote[];
  needs_verification: boolean;
  isFallback?: boolean;
}

const SYSTEM_INSTRUCTION = `
Bạn là một Stylist AI chuyên nghiệp về trang phục truyền thống Việt Nam.
Nhiệm vụ của bạn là lắng nghe người dùng mô tả nhu cầu (dịp đi, sở thích) và phối một bộ đồ phù hợp nhất.
BẠN CHỈ ĐƯỢC CHỌN ID CÓ TRONG DANH SÁCH SAU. TUYỆT ĐỐI KHÔNG BỊA ID MỚI.
- Top: ${VALID_TOPS.join(', ')}
- Bottom: ${VALID_BOTTOMS.join(', ')}
- Accessories (mảng): ${VALID_ACCESSORIES.join(', ')}
- Shoes: ${VALID_SHOES.join(', ')}
- Region: ${VALID_REGIONS.join(', ')}
- Occasion: ${VALID_OCCASIONS.join(', ')}
- Mode: ${VALID_MODES.join(', ')}

Quy tắc bắt buộc:
1. Giọng điệu gần gũi, dùng tiếng Việt chuẩn dấu.
2. Trường 'reasoning' giải thích (TỐI ĐA 2 CÂU) và BẮT BUỘC TRÍCH DẪN lại các chi tiết từ yêu cầu của người dùng (như mùa, màu sắc, cảm giác, nơi chốn).
3. Nếu người dùng chọn mode 'traditional', KHÔNG dùng các món hiện đại: ${MODERN_ONLY_ITEMS.join(', ')}.
4. Màu sắc (palette.top, palette.accent) phải là mã màu HEX hợp lệ (vd: #A8231A).
5. Trường 'gender' phải giữ nguyên giới tính người dùng yêu cầu.
6. Thông tin văn hóa phải chính xác, không bịa nguồn, nếu không chắc hãy set confidence="needs_verification".
`;

// Helper: Kiểm tra mã màu HEX
const isValidHex = (hex: string) => /^#([0-9A-F]{3}){1,2}$/i.test(hex);

// Helper: Đếm số câu
const countSentences = (text: string) => {
  return text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
};

function validateAndCleanResponse(data: any, originalGender: ValidGender): StylistResponse {
  const safeMode: ValidMode = VALID_MODES.includes(data.mode) ? data.mode : 'traditional';
  const safeGender: ValidGender = originalGender; // Gender luôn thắng

  let safeTop: ValidTop = VALID_TOPS.includes(data.top) ? data.top : 'ao-ba-ba';
  
  // Rule (b): tứ thân ↔ áo the đổi theo giới cùng miền
  if (safeGender === 'male' && safeTop === 'ao-tu-than') safeTop = 'ao-the';
  if (safeGender === 'female' && safeTop === 'ao-the') safeTop = 'ao-tu-than';

  let safeBottom: ValidBottom = VALID_BOTTOMS.includes(data.bottom) ? data.bottom : 'quan-lua';
  let safeShoes: ValidShoe = VALID_SHOES.includes(data.shoes) ? data.shoes : 'guoc';
  let safeAccessories: ValidAccessory[] = Array.isArray(data.accessories) 
    ? data.accessories.filter((a: any): a is ValidAccessory => VALID_ACCESSORIES.includes(a)) 
    : [];

  // Rule (a): mode traditional → ép bỏ đồ hiện đại
  if (safeMode === 'traditional') {
    if (MODERN_ONLY_ITEMS.includes(safeBottom as any)) safeBottom = 'quan-lua';
    if (MODERN_ONLY_ITEMS.includes(safeShoes as any)) safeShoes = 'guoc';
    safeAccessories = safeAccessories.filter(a => !MODERN_ONLY_ITEMS.includes(a as any));
  }

  // Rule (c): palette hex hợp lệ
  const safePalette = {
    top: data.palette?.top && isValidHex(data.palette.top) ? data.palette.top : '#FDFDFD',
    accent: data.palette?.accent && isValidHex(data.palette.accent) ? data.palette.accent : '#0F5B4A',
  };

  // Rule (d): reasoning tối đa 2 câu
  let safeReasoning = typeof data.reasoning === 'string' ? data.reasoning : 'Đã chọn trang phục phù hợp.';
  if (countSentences(safeReasoning) > 2) {
    const sentences = safeReasoning.match(/[^.!?]+[.!?]+/g) || [];
    safeReasoning = sentences.slice(0, 2).join(' ').trim();
    if (!safeReasoning) safeReasoning = 'Đã chọn trang phục phù hợp.';
  }

  return {
    gender: safeGender,
    region: VALID_REGIONS.includes(data.region) ? data.region : 'nam',
    occasion: VALID_OCCASIONS.includes(data.occasion) ? data.occasion : 'dao-pho',
    top: safeTop,
    bottom: safeBottom,
    accessories: safeAccessories,
    shoes: safeShoes,
    mode: safeMode,
    palette: safePalette,
    reasoning: safeReasoning,
    culture_notes: Array.isArray(data.culture_notes) ? data.culture_notes : [],
    needs_verification: Boolean(data.needs_verification)
  };
}

export async function generateStylistOutfit(request: StylistRequest, retryCount = 1): Promise<StylistResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), STYLIST_TIMEOUT_MS);

  try {
    const response = await fetch(GEMINI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        contents: [{
          role: 'user',
          parts: [{ text: `Giới tính hiện tại: ${request.gender}. Yêu cầu: ${request.prompt}` }]
        }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API HTTP Error: ${response.status}`);
    }

    const jsonRes = await response.json();
    let rawData;
    
    // Parse response structure from Gemini API
    try {
      const textResponse = jsonRes.candidates[0].content.parts[0].text;
      rawData = JSON.parse(textResponse);
    } catch (e) {
      if (retryCount > 0) {
        console.warn('StylistService: JSON parse error, retrying...', e);
        return generateStylistOutfit(request, retryCount - 1);
      }
      throw new Error('Failed to parse Gemini response JSON');
    }

    return validateAndCleanResponse(rawData, request.gender);
    
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('StylistService Error:', error);
    // Fallback offline
    return keywordFallback(request);
  }
}
