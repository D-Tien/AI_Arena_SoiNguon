import { keywordFallback } from './keywordFallback';
import { describe, it, expect } from 'vitest';

describe('keywordFallback', () => {
  it('should map "chùa" to traditional mode and ao-ngu-than (female)', () => {
    const res = keywordFallback({ prompt: 'Mai mình đi chùa', gender: 'female' });
    expect(res.occasion).toBe('chua');
    expect(res.mode).toBe('traditional');
    expect(res.top).toBe('ao-ngu-than'); // According to rules
  });

  it('should handle diacritics correctly (e.g. "cà phê")', () => {
    const res = keywordFallback({ prompt: 'Đi cà phê với bạn', gender: 'male' });
    expect(res.occasion).toBe('ca-phe');
    expect(res.top).toBe('ao-ba-ba'); // Default for coffee
  });

  it('should return default outfit for unknown prompts', () => {
    const res = keywordFallback({ prompt: 'xyz', gender: 'female' });
    expect(res.top).toBe('ao-ba-ba'); // default fallback top
    expect(res.mode).toBe('traditional');
  });
});
