import { ADVISOR_ERROR_MESSAGE, prepareAdvisorContext, type ConversationMessage } from './advisorContext';

export async function askAdvisor(
  question: string, history: ConversationMessage[] = [], signal?: AbortSignal,
): Promise<string> {
  const context = prepareAdvisorContext(question, history);
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: context.question, history: context.history,
      culturalContext: context.culturalContext, guardContext: context.guardContext }),
    signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(55_000)]) : AbortSignal.timeout(55_000),
  });
  if (!response.ok) throw new Error(ADVISOR_ERROR_MESSAGE);
  const data: unknown = await response.json();
  if (!data || typeof data !== 'object' || !('answer' in data)
      || typeof data.answer !== 'string' || !data.answer.trim()) throw new Error(ADVISOR_ERROR_MESSAGE);
  return data.answer.trim();
}
