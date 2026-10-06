import { generateStylistOutfit } from './stylistService';
import * as fallback from './keywordFallback';

// Mock fetch
global.fetch = jest.fn();

describe('stylistService', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should return parsed response when fetch is successful', async () => {
    const mockResponse = {
      candidates: [{
        content: {
          parts: [{
            text: JSON.stringify({
              gender: 'female',
              region: 'bac',
              occasion: 'dao-pho',
              top: 'ao-tu-than',
              bottom: 'quan-lua',
              accessories: ['non-la'],
              shoes: 'guoc',
              mode: 'traditional',
              palette: { top: '#A8231A', accent: '#E3A72F' },
              reasoning: 'Hợp cảnh.',
              culture_notes: [],
              needs_verification: false
            })
          }]
        }
      }]
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const res = await generateStylistOutfit({ prompt: 'Dạo phố', gender: 'female' });
    expect(res.top).toBe('ao-tu-than');
    expect(res.mode).toBe('traditional');
    expect(res.reasoning).toBe('Hợp cảnh.');
  });

  it('should fallback to keywordFallback on error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    
    // Using a spy to verify fallback is called, or just check the output matches fallback
    const res = await generateStylistOutfit({ prompt: 'Đi chùa', gender: 'male' });
    expect(res.occasion).toBe('chua'); // Because fallback maps "chùa" -> "chua"
    expect(res.top).toBe('ao-ngu-than');
  });

  it('should enforce rule (a): mode traditional removes modern items', async () => {
    const mockResponse = {
      candidates: [{
        content: {
          parts: [{
            text: JSON.stringify({
              gender: 'male',
              region: 'nam',
              occasion: 'dao-pho',
              top: 'ao-ba-ba',
              bottom: 'jeans', // Modern item!
              accessories: [],
              shoes: 'sneaker', // Modern item!
              mode: 'traditional', // Traditional mode!
              palette: { top: '#A8231A', accent: '#E3A72F' },
              reasoning: 'Phá cách nhẹ nhàng.',
              culture_notes: [],
              needs_verification: false
            })
          }]
        }
      }]
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const res = await generateStylistOutfit({ prompt: 'Phá cách', gender: 'male' });
    expect(res.bottom).toBe('quan-lua'); // Replaced
    expect(res.shoes).toBe('guoc'); // Replaced
  });
});
