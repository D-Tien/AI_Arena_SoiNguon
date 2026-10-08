import { GoogleGenAI } from '@google/genai';
import { ADVISOR_SYSTEM_PROMPT } from '../src/services/ai/systemPrompt.ts';
import { HISTORY_LIMIT, type AdvisorRequest } from '../src/services/ai/advisorContext.ts';

interface GeminiOptions {
  apiKey: string;
  model: string;
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
    if (finishReason !== 'STOP') throw new Error('Gemini returned an incomplete or blocked answer');
    const answer = response.text;
    if (!answer?.trim()) throw new Error('Gemini returned an empty answer');
    return answer;
  }
  throw new Error('Gemini answer exceeded output budget');
}
