import { keywordFallback } from './src/services/keywordFallback';
import { generateStylistOutfit } from './src/services/stylistService';
import type { ValidGender } from './src/data/outfitRegistry';

async function verify() {
  const cases: { prompt: string; gender: ValidGender }[] = [
    { prompt: 'Đám cưới bạn ở Hà Nội mùa thu', gender: 'female' },
    { prompt: 'Đi chùa mùng một', gender: 'male' },
    { prompt: 'Cà phê cuối tuần', gender: 'female' },
    { prompt: 'Chụp ảnh Tết', gender: 'male' },
    { prompt: 'asdfghjkl', gender: 'female' },
    { prompt: 'di cau ca', gender: 'male' }, // Không dấu
  ];

  console.log('--- OFFLINE FALLBACK VERIFY ---');
  for (const c of cases) {
    const res = keywordFallback(c);
    console.log(`\nPrompt: "${c.prompt}" (${c.gender})`);
    console.log(`=> Result: ${res.top}, mode: ${res.mode}, occasion: ${res.occasion}`);
    console.log(`=> Reasoning: ${res.reasoning}`);
  }
}

verify();
