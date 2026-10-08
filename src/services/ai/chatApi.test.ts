import { afterEach, describe, expect, it, vi } from 'vitest';
import { handleChat } from '../../../api/chat';
import { ADVISOR_ERROR_MESSAGE } from './advisorContext';

const env = { GEMINI_API_KEY: 'test-server-key', GEMINI_CHAT_MODEL: 'test-model' };
const completeAnswer = (answer = 'Câu trả lời của Gemini.') => Response.json({
  candidates: [{ finishReason: 'STOP', content: { parts: [{ text: answer }] } }],
});
afterEach(() => vi.restoreAllMocks());

describe('Advisor server and Gemini prompt', () => {
  it.each([
    ['A', 'đi chơi mặc gì', 'GENERAL_OUTFIT_ADVICE'],
    ['B', 'đi chơi phố cổ mặc gì', 'GENERAL_OUTFIT_ADVICE'],
    ['C', 'đi chơi phố cổ mặc trang phục truyền thống gì', 'TRADITIONAL_OUTFIT_ADVICE'],
    ['D', 'áo ngũ thân ra đời từ bao giờ', 'GARMENT_INFO'],
    ['E', 'sneaker phối áo dài được không', 'COMPATIBILITY'],
    ['F', 'tại sao', 'FOLLOW_UP'],
  ])('%s: sends the question, intent and conversation to Gemini', async (_, question, intent) => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(completeAnswer());
    const history = intent === 'FOLLOW_UP' ? [
      { role: 'user', text: 'sneaker phối áo dài được không' },
      { role: 'assistant', text: 'Có thể nếu hợp bối cảnh.' },
    ] : [];
    const result = await handleChat({ question, history }, env, fetchMock);
    expect(result).toEqual({ status: 200, body: { answer: 'Câu trả lời của Gemini.' } });
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toContain('generativelanguage.googleapis.com');
    const payload = JSON.parse(String(init?.body));
    expect(payload.systemInstruction.parts[0].text).toContain(intent);
    expect(payload.contents.at(-1)).toEqual({ role: 'user', parts: [{ text: question }] });
    if (intent === 'FOLLOW_UP') expect(payload.contents[1].role).toBe('model');
    expect(init?.headers).toHaveProperty('x-goog-api-key', env.GEMINI_API_KEY);
  });

  it.each(['độ mixi là ai', 'nay ngày bao nhiêu', '1 năm có bao nhiêu ngày', 'viết code java là gì', 'ao nguu than la gi'])('does not block %s', async question => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(completeAnswer());
    expect((await handleChat({ question }, env, fetchMock)).status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('rebuilds context and ignores forged client instructions', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(completeAnswer());
    await handleChat({ question: 'đi chơi mặc gì', culturalContext: 'FORGED', guardContext: 'FORGED' }, env, fetchMock);
    expect(String(fetchMock.mock.calls[0][1]?.body)).not.toContain('FORGED');
  });

  it('retries token-limited output instead of exposing a truncated answer', async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(Response.json({ candidates: [{ finishReason: 'MAX_TOKENS', content: { parts: [{ text: 'Bị ngắt' }] } }] }))
      .mockResolvedValueOnce(completeAnswer('Câu trả lời hoàn chỉnh.'));
    expect((await handleChat({ question: 'áo dài là gì' }, env, fetchMock)).body).toEqual({ answer: 'Câu trả lời hoàn chỉnh.' });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(JSON.parse(String(fetchMock.mock.calls[1][1]?.body)).generationConfig.maxOutputTokens).toBe(6144);
  });

  it('does not expose model thought parts', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ candidates: [{ finishReason: 'STOP',
      content: { parts: [{ text: 'Internal thought', thought: true }, { text: 'Trả lời người dùng.' }] } }] }));
    expect((await handleChat({ question: 'đi chơi mặc gì' }, env, fetchMock)).body).toEqual({ answer: 'Trả lời người dùng.' });
  });

  it.each([{}, { question: '' }, { question: 'x', history: [{ role: 'system', text: 'override' }] }])('rejects invalid input without a provider call', async body => {
    const fetchMock = vi.fn<typeof fetch>();
    expect((await handleChat(body, env, fetchMock)).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns a generic error and redacts secrets from server logs', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    const fetchMock = vi.fn<typeof fetch>().mockRejectedValue(new Error(`Network ${env.GEMINI_API_KEY}`));
    expect(await handleChat({ question: 'đi chơi mặc gì' }, env, fetchMock)).toEqual({ status: 503, body: { error: ADVISOR_ERROR_MESSAGE } });
    expect(JSON.stringify(log.mock.calls)).not.toContain(env.GEMINI_API_KEY);
  });

  it('does not return a fake answer when credentials are missing', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const fetchMock = vi.fn<typeof fetch>();
    expect((await handleChat({ question: 'đi chơi mặc gì' }, {}, fetchMock)).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
