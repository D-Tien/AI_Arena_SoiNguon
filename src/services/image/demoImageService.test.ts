import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { demoGeneratedImages, DEMO_PLACEHOLDER } from '../../data/demoGeneratedImages';
import { generateDemoImage, normalizeImageInput, rankDemoImages } from './demoImageService';

let available: Set<string>;
beforeEach(() => {
  available = new Set();
  vi.useFakeTimers();
  vi.stubGlobal('Image', class {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    set src(value: string) {
      queueMicrotask(() => available.has(value) ? this.onload?.() : this.onerror?.());
    }
  });
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('local demo image generation', () => {
  it('normalizes Vietnamese and punctuation, including đ', () => {
    expect(normalizeImageInput('  ÁO TỨ THÂN, ĐỎ! ')).toBe('ao tu than do');
  });

  it('refines garment matches with style, occasion and color before keywords', () => {
    const ranked = rankDemoImages({ prompt: 'Áo tứ thân streetwear đỏ', garment: 'ao-tu-than', occasion: 'hue' }, [
      { id: 'basic', src: '/basic.webp', garments: ['tu than'] },
      { id: 'specific', src: '/specific.webp', garments: ['tu than'], styles: ['streetwear'], occasions: ['hue'], colors: ['do'] },
      { id: 'keyword', src: '/keyword.webp', keywords: ['streetwear'] },
    ]);
    expect(ranked.map(item => item.image.id)).toEqual(['specific', 'basic', 'keyword']);
    expect(ranked[0].matchedBy).toBe('garment+style+occasion+color');
  });

  it('keeps loading for two seconds and falls back to an available garment image', async () => {
    available.add('/demo-generated/trang-phuc-2.jpg');
    const done = vi.fn();
    const result = generateDemoImage({ prompt: 'Áo tứ thân streetwear' }).then(done);
    await vi.advanceTimersByTimeAsync(1999);
    expect(done).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    await result;
    expect(done).toHaveBeenCalledWith({ imageUrl: '/demo-generated/trang-phuc-2.jpg', provider: 'demo', matchedBy: 'garment' });
  });

  it('uses the edited prompt when previous UI choices describe a red garment', async () => {
    demoGeneratedImages.forEach(image => available.add(image.src));
    const result = generateDemoImage({
      prompt: 'Áo ngũ thân phong cách streetwear màu xanh chàm tại cổng thành Huế',
      garment: 'ao-tu-than', style: 'traditional', occasion: 'hanoi', color: 'do',
    });
    await vi.runAllTimersAsync();
    expect((await result).imageUrl).toBe('/demo-generated/trang-phuc-3.jpg');
  });

  it('uses UI choices when the prompt does not specify a garment', () => {
    const ranked = rankDemoImages({ prompt: 'Chụp toàn thân', garment: 'ao-ngu-than', style: 'streetwear' });
    expect(ranked[0].image.id).toBe('ngu-than-blue-streetwear');
  });

  it.each([
    ['Nam mặc áo ngũ thân xanh chàm truyền thống tại Đại Nội Huế', '/demo-generated/0693c881-13ee-4986-86fe-d2315eaffa1c.png'],
    ['Nam mặc áo bà ba nâu mộc mạc bên sông miền Tây', '/demo-generated/2b395584-2d04-4bb4-9e1f-3ee89cdd854c.png'],
    ['Nam mặc áo dài xanh lá thanh lịch bên nhà cổ', '/demo-generated/f132857c-a2b5-4f18-a8f6-7bfcd0aa8a41.png'],
  ])('selects the corresponding male outfit for %s', async (prompt, imageUrl) => {
    demoGeneratedImages.forEach(image => available.add(image.src));
    const result = generateDemoImage({ prompt, gender: 'female', garment: 'ao-tu-than' });
    await vi.runAllTimersAsync();
    expect((await result).imageUrl).toBe(imageUrl);
  });

  it('distinguishes male ao dai variants by color', () => {
    expect(rankDemoImages({ prompt: 'Áo dài nam xanh chàm truyền thống' })[0].image.id)
      .toBe('ngu-than-male-blue-hue');
    expect(rankDemoImages({ prompt: 'Áo dài nam xanh lá truyền thống' })[0].image.id)
      .toBe('ao-dai-male-green-heritage');
  });

  it('uses the UI gender and ignores geographic names when detecting gender', () => {
    expect(rankDemoImages({ prompt: 'Áo bà ba ở Nam Bộ Việt Nam', gender: 'male' })[0].image.gender).toBe('male');
    expect(rankDemoImages({ prompt: 'Áo bà ba ở Nam Bộ Việt Nam', gender: 'female' })[0].image.gender).toBe('female');
    expect(rankDemoImages({ prompt: 'Áo bà ba nữ ở Nam Bộ', gender: 'male' })[0].image.gender).toBe('female');
  });

  it('uses a male fallback when no prompt tags match', async () => {
    demoGeneratedImages.forEach(image => available.add(image.src));
    const result = generateDemoImage({ prompt: 'Chụp toàn thân', gender: 'male' });
    await vi.runAllTimersAsync();
    expect((await result).imageUrl).toBe('/demo-generated/0693c881-13ee-4986-86fe-d2315eaffa1c.png');
    expect((await result).matchedBy).toBe('default');
  });

  it('distinguishes lotus and brown heritage variants from prompt details', () => {
    expect(rankDemoImages({ prompt: 'Áo tứ thân thanh lịch màu đỏ bên hồ sen cổ kính' })[0].image.id)
      .toBe('tu-than-red-lotus');
    expect(rankDemoImages({ prompt: 'Áo tứ thân phong cách retro màu nâu, cầm nón quai thao tại phố cổ' })[0].image.id)
      .toBe('tu-than-brown-heritage');
  });

  it('uses default, then the existing local placeholder when files are missing', async () => {
    available.add('/demo-generated/trang-phuc-2.jpg');
    const first = generateDemoImage({ prompt: 'unknown' });
    await vi.runAllTimersAsync();
    expect((await first).matchedBy).toBe('default');
    available.clear();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const second = generateDemoImage({ prompt: 'unknown' });
    await vi.runAllTimersAsync();
    expect((await second).imageUrl).toBe(DEMO_PLACEHOLDER);
  });

  it('avoids the previous image when equally matched alternatives exist', async () => {
    const extra = { id: 'second', src: '/demo-generated/tu-than-2.webp', garments: ['tu than'] };
    demoGeneratedImages.push(extra);
    try {
      available.add('/demo-generated/trang-phuc-2.jpg');
      available.add(extra.src);
      const result = generateDemoImage({ prompt: 'tu than', previousImageUrl: '/demo-generated/trang-phuc-2.jpg' });
      await vi.runAllTimersAsync();
      expect((await result).imageUrl).toBe(extra.src);
    } finally { demoGeneratedImages.pop(); }
  });

  it('aborts generation without returning a stale result', async () => {
    const controller = new AbortController();
    const result = generateDemoImage({ prompt: 'tu than', signal: controller.signal });
    const assertion = expect(result).rejects.toHaveProperty('name', 'AbortError');
    controller.abort();
    await assertion;
    await vi.runAllTimersAsync();
  });
});
