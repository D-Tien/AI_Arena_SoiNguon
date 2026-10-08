/**
 * Fallback ngoại tuyến: phối đồ bằng từ khoá khi API lỗi / timeout.
 * Chuẩn hoá NFD bỏ dấu + lowercase khi so khớp.
 * Chỉ trả id có trong outfitRegistry.
 */

import {
  GENDER_TOP_MAP,
  type ValidGender, type ValidTop,
} from '../data/outfitRegistry';
import type { StylistResponse } from './stylistService';

/** Bỏ dấu tiếng Việt bằng NFD + strip combining marks */
function removeDiacritics(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function has(text: string, ...keywords: string[]): boolean {
  const norm = removeDiacritics(text);
  return keywords.some(k => norm.includes(removeDiacritics(k)));
}

interface FallbackInput {
  prompt: string;
  gender: ValidGender;
}

/** Chọn áo phù hợp theo giới tính và miền */
function pickTop(gender: ValidGender, region: 'bac' | 'hue' | 'nam'): ValidTop {
  if (region === 'bac') {
    return (GENDER_TOP_MAP.bac[gender] || 'ao-tu-than') as ValidTop;
  }
  if (region === 'hue') return 'ao-ngu-than';
  return 'ao-ba-ba';
}

export function keywordFallback({ prompt, gender }: FallbackInput): StylistResponse {
  const text = prompt;

  // --- Chùa / lễ ---
  if (has(text, 'chua', 'chùa', 'le', 'lễ', 'thien', 'thiền', 'den', 'đền', 'đình', 'dinh')) {
    return {
      gender,
      region: 'hue',
      occasion: 'chua',
      top: gender === 'male' ? 'ao-ngu-than' : 'ao-ngu-than',
      bottom: 'quan-lua',
      accessories: gender === 'female' ? ['van-toc'] : [],
      shoes: 'guoc',
      mode: 'traditional',
      palette: { top: '#1A2A40', accent: '#E3A72F' },
      reasoning: 'Đi chùa nên chọn trang phục kín đáo, trang nhã. Ngũ thân là lựa chọn phù hợp nhất.',
      culture_notes: [
        { item: 'ao-ngu-than', note: 'Ngũ thân gắn liền với triết lý Nhân – Lễ – Nghĩa – Trí – Tín, phù hợp chốn thiền môn.', confidence: 'high' },
      ],
      needs_verification: false,
      isFallback: true,
    };
  }

  // --- Đám cưới ---
  if (has(text, 'cuoi', 'cưới', 'dam cuoi', 'đám cưới', 'hon', 'hôn')) {
    const top = pickTop(gender, 'bac');
    return {
      gender,
      region: 'bac',
      occasion: 'su-kien',
      top,
      bottom: gender === 'female' ? 'vay-den' : 'quan-lua',
      accessories: gender === 'female' ? ['khan-mo-qua'] : ['khan-dong'],
      shoes: 'guoc',
      mode: 'traditional',
      palette: { top: '#A8231A', accent: '#E3A72F' },
      reasoning: 'Đám cưới là dịp trọng đại, trang phục truyền thống Bắc Bộ thể hiện sự trang trọng và trân quý.',
      culture_notes: [
        { item: top, note: `${gender === 'female' ? 'Áo tứ thân' : 'Áo the'} là trang phục lễ hội truyền thống vùng Bắc Bộ.`, confidence: 'high' },
      ],
      needs_verification: false,
      isFallback: true,
    };
  }

  // --- Tết / xuân ---
  if (has(text, 'tet', 'tết', 'xuan', 'xuân', 'mung', 'mùng')) {
    const top = pickTop(gender, 'bac');
    return {
      gender,
      region: 'bac',
      occasion: 'le-hoi',
      top,
      bottom: gender === 'female' ? 'vay-den' : 'quan-lua',
      accessories: gender === 'female' ? ['khan-mo-qua'] : [],
      shoes: 'guoc',
      mode: 'traditional',
      palette: { top: '#A8231A', accent: '#E3A72F' },
      reasoning: 'Tết là dịp sum vầy, trang phục truyền thống tạo không khí ấm áp và tôn vinh văn hoá.',
      culture_notes: [
        { item: top, note: 'Xưa kia, mặc trang phục truyền thống dịp Tết thể hiện lòng kính trọng ông bà tổ tiên.', confidence: 'high' },
      ],
      needs_verification: false,
      isFallback: true,
    };
  }

  // --- Cà phê / dạo phố / bình thường ---
  if (has(text, 'ca phe', 'cà phê', 'cafe', 'dao pho', 'dạo phố', 'pho', 'phố', 'hang', 'hàng', 'di choi', 'đi chơi', 'cuoi tuan', 'cuối tuần')) {
    return {
      gender,
      region: 'nam',
      occasion: 'ca-phe',
      top: 'ao-ba-ba',
      bottom: 'quan-lua',
      accessories: gender === 'female' ? ['non-la'] : ['khan-ran'],
      shoes: 'guoc',
      mode: 'traditional',
      palette: { top: '#FDFDFD', accent: '#0F5B4A' },
      reasoning: 'Bà ba nhẹ nhàng, thoải mái cho những buổi dạo phố cuối tuần.',
      culture_notes: [
        { item: 'ao-ba-ba', note: 'Áo bà ba vốn là trang phục thường ngày của người dân Nam Bộ, rất dễ phối.', confidence: 'high' },
      ],
      needs_verification: false,
      isFallback: true,
    };
  }

  // --- Tốt nghiệp / sự kiện trang trọng ---
  if (has(text, 'tot nghiep', 'tốt nghiệp', 'su kien', 'sự kiện', 'bao tang', 'bảo tàng', 'trang trong', 'trang trọng', 'trinh dien', 'trình diễn')) {
    return {
      gender,
      region: 'hue',
      occasion: 'su-kien',
      top: 'ao-ngu-than',
      bottom: 'quan-lua',
      accessories: gender === 'male' ? ['khan-dong'] : ['van-toc'],
      shoes: 'giay-da',
      mode: 'traditional',
      palette: { top: '#1B2A5C', accent: '#E3A72F' },
      reasoning: 'Sự kiện trang trọng phù hợp với ngũ thân – dáng đứng đĩnh đạc, chuẩn mực.',
      culture_notes: [
        { item: 'ao-ngu-than', note: 'Ngũ thân từng là trang phục thường triều, mang đậm tính nghi lễ.', confidence: 'high' },
      ],
      needs_verification: false,
      isFallback: true,
    };
  }

  // --- Default: câu vô nghĩa hoặc không rõ ngữ cảnh ---
  return {
    gender,
    region: 'nam',
    occasion: 'dao-pho',
    top: 'ao-ba-ba',
    bottom: 'quan-lua',
    accessories: [],
    shoes: 'guoc',
    mode: 'traditional',
    palette: { top: '#FDFDFD', accent: '#0F5B4A' },
    reasoning: 'Chưa rõ dịp đi, bà ba là lựa chọn dễ phối và phù hợp nhiều hoàn cảnh nhất.',
    culture_notes: [
      { item: 'ao-ba-ba', note: 'Áo bà ba gần gũi với đời sống thường ngày, không kén dịp.', confidence: 'high' },
    ],
    needs_verification: false,
    isFallback: true,
  };
}
