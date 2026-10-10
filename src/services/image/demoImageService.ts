import { demoGeneratedImages, DEMO_PLACEHOLDER, type DemoGeneratedImage } from '../../data/demoGeneratedImages';
import type { ImageGenerationInput, ImageGenerationProvider, ImageGenerationResult } from './ImageGenerationProvider';

export function normalizeImageInput(value = ''): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

const matches = (text: string, tags: string[] = []) => tags.some(tag => {
  const normalized = normalizeImageInput(tag);
  return normalized.length > 0 && ` ${text} `.includes(` ${normalized} `);
});

export function rankDemoImages(input: ImageGenerationInput, images = demoGeneratedImages) {
  const prompt = normalizeImageInput(input.prompt);
  const candidates = images.filter(image => image.id !== 'default');
  const preferredText = (field: 'garments' | 'styles' | 'occasions' | 'colors', fallback?: string) =>
    candidates.some(image => matches(prompt, image[field])) ? prompt : normalizeImageInput(fallback);
  const garment = preferredText('garments', input.garment);
  const styleText = preferredText('styles', input.style);
  const occasionText = preferredText('occasions', input.occasion);
  const colorText = preferredText('colors', input.color);
  return candidates.map(image => {
    const hasGarment = matches(garment, image.garments);
    const style = matches(styleText, image.styles);
    const occasion = matches(occasionText, image.occasions);
    const color = matches(colorText, image.colors);
    const keyword = matches(prompt, image.keywords) || (!garment && matches(prompt, image.garments));
    const score = hasGarment ? 100 + (style ? 30 : 0) + (occasion ? 20 : 0) + (color ? 10 : 0) + (keyword ? 5 : 0) : keyword ? 1 : 0;
    return { image, score, matchedBy: hasGarment ? ['garment', style && 'style', occasion && 'occasion', color && 'color'].filter(Boolean).join('+') : 'keywords' };
  }).filter(candidate => candidate.score > 0).sort((a, b) => b.score - a.score);
}

function loadLocalImage(src: string, signal?: AbortSignal): Promise<boolean> {
  if (!src.startsWith('/') || src.startsWith('//')) return Promise.resolve(false);
  return new Promise((resolve, reject) => {
    const image = new Image();
    const timer = setTimeout(() => finish(false), 1000);
    const cleanup = () => {
      clearTimeout(timer);
      image.onload = image.onerror = null;
      signal?.removeEventListener('abort', abort);
    };
    const finish = (loaded: boolean) => { cleanup(); resolve(loaded); };
    const abort = () => { cleanup(); image.src = ''; reject(new DOMException('Cancelled', 'AbortError')); };
    image.onload = () => finish(true);
    image.onerror = () => finish(false);
    signal?.addEventListener('abort', abort, { once: true });
    if (signal?.aborted) { abort(); return; }
    image.src = src;
  });
}

async function selectImage(input: ImageGenerationInput): Promise<ImageGenerationResult> {
  const ranked = rankDemoImages(input);
  const loaded = await Promise.all(ranked.map(async candidate => ({ ...candidate, available: await loadLocalImage(candidate.image.src, input.signal) })));
  const missing = loaded.filter(candidate => !candidate.available);
  if (import.meta.env.DEV && missing.length) {
    console.warn('Demo image files missing or unreadable:', missing.map(candidate => candidate.image.src));
  }
  const available = loaded.filter(candidate => candidate.available);
  const bestScore = available[0]?.score;
  const best = available.filter(candidate => candidate.score === bestScore);
  const alternatives = best.filter(candidate => candidate.image.src !== input.previousImageUrl);
  const candidates = alternatives.length ? alternatives : best;
  const selected = candidates[Math.floor(Math.random() * candidates.length)];
  if (selected) return { imageUrl: selected.image.src, provider: 'demo', matchedBy: selected.matchedBy };

  const fallback: DemoGeneratedImage | undefined = demoGeneratedImages.find(image => image.id === 'default');
  if (fallback && await loadLocalImage(fallback.src, input.signal)) {
    return { imageUrl: fallback.src, provider: 'demo', matchedBy: 'default' };
  }
  if (import.meta.env.DEV) console.warn('Demo images unavailable; using the local concept placeholder.');
  return { imageUrl: DEMO_PLACEHOLDER, provider: 'demo', matchedBy: 'placeholder' };
}

export async function generateDemoImage(input: ImageGenerationInput): Promise<ImageGenerationResult> {
  const delay = new Promise<void>((resolve, reject) => {
    const abort = () => { clearTimeout(timer); reject(new DOMException('Cancelled', 'AbortError')); };
    const timer = setTimeout(() => { input.signal?.removeEventListener('abort', abort); resolve(); }, 2000);
    input.signal?.addEventListener('abort', abort, { once: true });
    if (input.signal?.aborted) abort();
  });
  const [result] = await Promise.all([selectImage(input), delay]);
  return result;
}

export const demoImageProvider: ImageGenerationProvider = { generate: generateDemoImage };
