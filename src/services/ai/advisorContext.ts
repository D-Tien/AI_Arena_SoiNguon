import { checkCulturalRules } from '../../rules/culturalGuard.ts';
import {
  getTraditionalItems, mentionsTraditionalClothing, normalizeQuestion, searchCulturalItems,
} from '../culturalSearch.ts';

export type AdvisorIntent = 'GENERAL_OUTFIT_ADVICE' | 'TRADITIONAL_OUTFIT_ADVICE'
  | 'GARMENT_INFO' | 'COMPATIBILITY' | 'FOLLOW_UP' | 'GENERAL_QUESTION';

export interface ConversationMessage {
  role: 'user' | 'assistant';
  text: string;
}

export interface AdvisorContext {
  question: string;
  history: ConversationMessage[];
  intent: AdvisorIntent;
  resolvedIntent: AdvisorIntent;
  conversationContext: string;
  retrievedGarments: string[];
  culturalContext: string;
  guardContext: string;
}

export const ADVISOR_ERROR_MESSAGE = 'Hiện mình chưa thể xử lý câu hỏi này. Bạn thử lại sau nhé.';
export const HISTORY_LIMIT = 6;

export function detectIntent(question: string): AdvisorIntent {
  const normalized = normalizeQuestion(question);
  const garments = searchCulturalItems(question);
  if (/^(tai sao|vi sao|the con|vay thi|vay con|cai do|cai nay|the con cai nay|mau nao hop)\b/.test(normalized)) {
    return 'FOLLOW_UP';
  }
  if (garments.length && /\b(phoi|ket hop|di cung|duoc khong)\b/.test(normalized)) {
    return 'COMPATIBILITY';
  }
  if (garments.length && /\b(la gi|nguon goc|ra doi|bao gio|tu dau|lich su)\b/.test(normalized)) {
    return 'GARMENT_INFO';
  }
  if (mentionsTraditionalClothing(question)) return 'TRADITIONAL_OUTFIT_ADVICE';
  if (/\b(mac|phoi|outfit|trang phuc|quan ao|phong cach)\b/.test(normalized)) {
    return 'GENERAL_OUTFIT_ADVICE';
  }
  return garments.length ? 'GARMENT_INFO' : 'GENERAL_QUESTION';
}

function isOutfitDetail(question: string, previousIntent: AdvisorIntent): boolean {
  if (!['GENERAL_OUTFIT_ADVICE', 'TRADITIONAL_OUTFIT_ADVICE', 'COMPATIBILITY'].includes(previousIntent)) return false;
  const text = normalizeQuestion(question);
  // Only short answers to an outfit clarification inherit the previous topic.
  return text.split(' ').length <= 7
    && /^(?:o |di )?(pho co|ho guom|ha noi|hue|sai gon|da nang|hoi an|di chua|chua|den|club|bar|ca phe|hien dai|casual|streetwear|toi gian|thanh lich|mua dong|mua he)\b/.test(text)
    && !/\b(la ai|la gi|bao nhieu|tai sao|lich su)\b/.test(text);
}

export function prepareAdvisorContext(question: string, history: ConversationMessage[] = []): AdvisorContext {
  const recent = history.slice(-HISTORY_LIMIT);
  let activeTopic = '';
  let activeGarmentQuestion = '';
  let activeIntent: AdvisorIntent = 'GENERAL_QUESTION';
  for (const message of recent) {
    if (message.role !== 'user') continue;
    const intent = detectIntent(message.text);
    if (intent === 'FOLLOW_UP' || isOutfitDetail(message.text, activeIntent)) {
      activeTopic = [activeTopic, message.text].filter(Boolean).join('\n');
      if (searchCulturalItems(message.text).length) activeGarmentQuestion = message.text;
    } else {
      activeTopic = message.text;
      activeGarmentQuestion = message.text;
      activeIntent = intent;
    }
  }

  const detected = detectIntent(question);
  const followUp = detected === 'FOLLOW_UP' || isOutfitDetail(question, activeIntent);
  const intent = followUp ? 'FOLLOW_UP' : detected;
  const resolvedIntent = followUp ? activeIntent : detected;
  const conversationContext = followUp ? activeTopic : '';
  const relevantQuestion = [conversationContext, question].filter(Boolean).join('\n');
  const explicitlyNamed = searchCulturalItems(question);
  const inherited = followUp ? searchCulturalItems(activeGarmentQuestion) : [];
  const garments = explicitlyNamed.length ? explicitlyNamed : inherited.length ? inherited
    : mentionsTraditionalClothing(relevantQuestion) ? getTraditionalItems() : [];
  const culturalContext = garments.length ? JSON.stringify(garments) : '';

  let guardContext = '';
  if (garments.length && ['COMPATIBILITY', 'TRADITIONAL_OUTFIT_ADVICE', 'GENERAL_OUTFIT_ADVICE'].includes(resolvedIntent)) {
    const normalized = normalizeQuestion(relevantQuestion);
    const event = /\b(chua|den|le tang)\b/.test(normalized) ? 'Chùa'
      : /\b(club|bar)\b/.test(normalized) ? 'Club'
      : /\bca phe\b/.test(normalized) ? 'Cà phê' : '';
    const style = /\bstreetwear\b/.test(normalized) ? 'Streetwear'
      : /\by2k\b/.test(normalized) ? 'Y2K' : '';
    guardContext = JSON.stringify(garments.map(item => ({
      garment: item.id,
      remixSafety: item.remixSafety,
      keepRule: item.keepRule,
      tweakRule: item.tweakRule,
      unsuitableFor: item.unsuitableFor,
      eventRule: event ? checkCulturalRules(event, item.id, style, 0) : null,
    })));
  }

  return { question: question.trim(), history: recent, intent, resolvedIntent,
    conversationContext, retrievedGarments: garments.map(item => item.id), culturalContext, guardContext };
}
