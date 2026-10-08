import { buildAdvisorPrompt } from '../src/services/ai/systemPrompt.ts';
import type { AdvisorContext } from '../src/services/ai/advisorContext.ts';

interface GeminiOptions {
  apiKey: string;
  model: string;
  fetcher?: typeof fetch;
}

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}

export async function generateGeminiReply(context: AdvisorContext, options: GeminiOptions): Promise<string> {
  const prompt = buildAdvisorPrompt(context);
  for (const maxOutputTokens of [3072, 6144]) {
    const response = await (options.fetcher ?? fetch)(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(options.model)}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': options.apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: prompt.systemInstruction }] },
          contents: prompt.messages.map(message => ({
            role: message.role === 'assistant' ? 'model' : 'user', parts: [{ text: message.text }],
          })),
          generationConfig: { temperature: 0.5, maxOutputTokens },
        }),
        signal: AbortSignal.timeout(20_000),
      },
    );
    if (!response.ok) throw new Error(`Gemini HTTP ${response.status}`);
    const data: unknown = await response.json();
    const candidate = record(data) && Array.isArray(data.candidates) ? data.candidates[0] as unknown : null;
    if (!record(candidate)) throw new Error('Gemini returned no candidate');
    if (candidate.finishReason === 'MAX_TOKENS') continue;
    if (candidate.finishReason !== 'STOP') throw new Error('Gemini returned an incomplete or blocked answer');
    const parts = record(candidate.content) && Array.isArray(candidate.content.parts) ? candidate.content.parts : [];
    const answer = parts.filter((part: unknown): part is { text: string } =>
      record(part) && part.thought !== true && typeof part.text === 'string')
      .map(part => part.text).join('').trim();
    if (!answer) throw new Error('Gemini returned an empty answer');
    return answer;
  }
  throw new Error('Gemini answer exceeded output budget');
}
