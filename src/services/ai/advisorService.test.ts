import { afterEach, describe, expect, it, vi } from 'vitest';
import { askAdvisor } from './advisorService';
import { ADVISOR_ERROR_MESSAGE, type ConversationMessage } from './advisorContext';

afterEach(() => vi.unstubAllGlobals());

describe('Advisor frontend transport', () => {
  it.each(['độ mixi là ai', 'nay ngày bao nhiêu', '1 năm có bao nhiêu ngày',
    'hà nội mùa đông mặc gì', 'tôi muốn đi hồ gươm thì mặc gì', 'viết code java là gì',
    'đi chơi mặc gì', 'đi chơi hồ gươm mặc gì', 'sneaker phối nhật bình được không',
    'áo dài là gì', 'ao ngu thna la gi', 'tại sao'])('sends %s to /api/chat', async question => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ answer: 'Câu trả lời từ provider.' }));
    vi.stubGlobal('fetch', fetchMock);
    expect(await askAdvisor(question)).toBe('Câu trả lời từ provider.');
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0][0]).toBe('/api/chat');
    const payload = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(payload.question).toBe(question);
    expect(Object.keys(payload).sort()).toEqual(['history', 'question']);
  });

  it('sends only six recent messages and the current question', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ answer: 'Có thể phối tùy bối cảnh.' }));
    vi.stubGlobal('fetch', fetchMock);
    const history: ConversationMessage[] = Array.from({ length: 8 }, (_, i) => ({ role: 'user', text: `Câu ${i}` }));
    await askAdvisor('sneaker phối Nhật Bình được không', history);
    const payload = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(payload.history).toEqual(history.slice(-6));
    expect(Object.keys(payload).sort()).toEqual(['history', 'question']);
  });

  it('does not cache advice or reuse an answer between different conversations', async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(Response.json({ answer: 'Trả lời cho phố cổ.' }))
      .mockResolvedValueOnce(Response.json({ answer: 'Trả lời cho đi chùa.' }));
    vi.stubGlobal('fetch', fetchMock);
    const first = await askAdvisor('mặc gì', [{ role: 'user', text: 'đi phố cổ' }]);
    const second = await askAdvisor('mặc gì', [{ role: 'user', text: 'đi chùa' }]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(first).not.toBe(second);
    expect(fetchMock.mock.calls[0][1]?.body).not.toEqual(fetchMock.mock.calls[1][1]?.body);
  });

  it('exposes only a friendly message on server failures', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockResolvedValue(Response.json({ error: 'Missing API key' }, { status: 503 })));
    await expect(askAdvisor('đi chơi mặc gì')).rejects.toThrow(ADVISOR_ERROR_MESSAGE);
    expect(log).toHaveBeenCalledWith('AI request failed:', 503, { error: 'Missing API key' });
    log.mockRestore();
  });

  it('preserves the entire response including whitespace and long paragraphs', async () => {
    const answer = '\n' + 'Một đoạn trả lời dài. '.repeat(1000) + '\n';
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockResolvedValue(Response.json({ answer })));
    expect(await askAdvisor('viết code java là gì')).toBe(answer);
  });
});
