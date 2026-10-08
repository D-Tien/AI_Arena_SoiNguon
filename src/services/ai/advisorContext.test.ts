import { afterEach, describe, expect, it, vi } from 'vitest';
import { askAdvisor } from './advisorService';
import { ADVISOR_SYSTEM_PROMPT } from './systemPrompt';
import type { ConversationMessage } from './advisorContext';

afterEach(() => vi.unstubAllGlobals());

describe('Plain Gemini chat history', () => {
  it('forwards follow-up history unchanged instead of inferring garments or intent', async () => {
    const history: ConversationMessage[] = [
      { role: 'user', text: 'sneaker phối áo dài được không' },
      { role: 'assistant', text: 'Có thể khi đi chơi, tùy bối cảnh.' },
    ];
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ answer: 'Giải thích từ Gemini.' }));
    vi.stubGlobal('fetch', fetchMock);
    await askAdvisor('tại sao', history);
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toEqual({ question: 'tại sao', history });
  });

  it('does not inherit or rewrite an old topic when the user switches questions', async () => {
    const history: ConversationMessage[] = [{ role: 'user', text: 'Nhật Bình là gì' }];
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ answer: '365 hoặc 366 ngày.' }));
    vi.stubGlobal('fetch', fetchMock);
    await askAdvisor('1 năm có bao nhiêu ngày', history);
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toEqual({ question: '1 năm có bao nhiêu ngày', history });
  });

  it('uses the simple system prompt without routing or retrieval instructions', () => {
    expect(ADVISOR_SYSTEM_PROMPT).toContain('Hãy trả lời trực tiếp câu hỏi hiện tại.');
    expect(ADVISOR_SYSTEM_PROMPT).toContain('Nhưng bạn vẫn có thể trả lời các câu hỏi thông thường khác.');
    expect(ADVISOR_SYSTEM_PROMPT).not.toMatch(/CURRENT INTENT|CULTURAL CONTEXT|CULTURAL GUARD|culturalDb/);
  });
});
