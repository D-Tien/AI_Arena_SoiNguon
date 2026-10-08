import { ADVISOR_ERROR_MESSAGE, HISTORY_LIMIT, type ConversationMessage } from './advisorContext';

export async function askAdvisor(
  question: string, history: ConversationMessage[] = [], signal?: AbortSignal,
): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: question.trim(), history: history.slice(-HISTORY_LIMIT) }),
    signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(55_000)]) : AbortSignal.timeout(55_000),
  });
  if (!response.ok) {
    const failure: unknown = await response.json().catch(() => null);
    if (import.meta.env.DEV) console.error('AI request failed:', response.status, failure);
    throw new Error(ADVISOR_ERROR_MESSAGE);
  }
  const data: unknown = await response.json();
  if (!data || typeof data !== 'object' || !('answer' in data)
      || typeof data.answer !== 'string' || !data.answer.trim()) throw new Error(ADVISOR_ERROR_MESSAGE);
  return data.answer;
}
