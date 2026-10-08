import { culturalDb, type CulturalItem } from '../data/culturalDb.ts';

export function normalizeQuestion(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ').trim();
}

const garmentNames: Record<string, RegExp> = {
  ao_dai: /\bao dai\b/,
  ao_tu_than: /\b(?:ao )?tu than\b/,
  ao_ngu_than: /\b(?:ao )?ngu than\b/,
  ao_nhat_binh: /\b(?:ao )?nhat binh\b/,
  ao_ba_ba: /\b(?:ao )?ba ba\b/,
};

export function searchCulturalItems(question: string): CulturalItem[] {
  const normalized = normalizeQuestion(question);
  return Object.entries(garmentNames)
    .filter(([, pattern]) => pattern.test(normalized))
    .map(([id]) => culturalDb[id]);
}

export function mentionsTraditionalClothing(question: string): boolean {
  const text = normalizeQuestion(question);
  return /\b(viet phuc|co phuc)\b/.test(text)
    || (/\btruyen thong\b/.test(text) && /\b(mac|phoi|ao|outfit|trang phuc|quan ao)\b/.test(text));
}

export function getTraditionalItems(): CulturalItem[] {
  return Object.values(culturalDb);
}
