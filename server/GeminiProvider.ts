import { GoogleGenAI } from '@google/genai';
import { ADVISOR_SYSTEM_PROMPT } from '../src/services/ai/systemPrompt.js';
import { HISTORY_LIMIT, type AdvisorRequest } from '../src/services/ai/advisorContext.js';

interface GeminiOptions {
  apiKey: string;
  model: string;
}

class GeminiResponseError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = 'GeminiResponseError';
    this.code = code;
  }
}

export async function generateGeminiReply(request: AdvisorRequest, options: GeminiOptions): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: options.apiKey, httpOptions: { timeout: 20_000 } });
  const contents = [...request.history.slice(-HISTORY_LIMIT), { role: 'user' as const, text: request.question }]
    .map(message => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.text }],
    }));

  for (const maxOutputTokens of [3072, 6144]) {
    const response = await ai.models.generateContent({
      model: options.model,
      contents,
      config: { systemInstruction: ADVISOR_SYSTEM_PROMPT, temperature: 0.6, maxOutputTokens },
    });
    const finishReason = response.candidates?.[0]?.finishReason;
    if (finishReason === 'MAX_TOKENS') continue;
    if (finishReason !== 'STOP') throw new GeminiResponseError('GEMINI_RESPONSE_INCOMPLETE', `Gemini finishReason: ${finishReason ?? 'missing'}; blockReason: ${response.promptFeedback?.blockReason ?? 'none'}`);
    const answer = response.text;
    if (!answer?.trim()) throw new GeminiResponseError('GEMINI_RESPONSE_EMPTY', 'Gemini returned an empty answer');
    return answer;
  }
  throw new GeminiResponseError('GEMINI_RESPONSE_OUTPUT_LIMIT', 'Gemini answer exceeded output budget after two attempts');
}
