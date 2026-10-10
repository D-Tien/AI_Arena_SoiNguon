import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GenerateContentResponse, FinishReason } from '@google/genai';
import { handleChat } from '../../../api/chat';
import { ADVISOR_SYSTEM_PROMPT } from './systemPrompt';

const sdk = vi.hoisted(() => ({ generateContent: vi.fn(), constructorOptions: vi.fn() }));
vi.mock('@google/genai', async importOriginal => {
  const actual = await importOriginal<typeof import('@google/genai')>();
  return { ...actual, GoogleGenAI: class {
    models = { generateContent: sdk.generateContent };
    constructor(options: unknown) { sdk.constructorOptions(options); }
  } };
});

const env = { GEMINI_API_KEY: 'test-server-key', GEMINI_CHAT_MODEL: 'test-model' };
function completeAnswer(answer = 'Câu trả lời của Gemini.', finishReason = FinishReason.STOP) {
  const response = new GenerateContentResponse();
  response.candidates = [{ finishReason, content: { parts: [{ text: answer }] } }];
  return response;
}

beforeEach(() => {
  sdk.generateContent.mockReset().mockResolvedValue(completeAnswer());
  sdk.constructorOptions.mockClear();
});
afterEach(() => vi.restoreAllMocks());

describe('Direct Gemini SDK chat', () => {
  it.each(['đi chơi mặc gì', 'đi chơi hồ gươm mặc gì', 'áo dài là gì',
    'sneaker phối nhật bình được không', 'độ mixi là ai', '1 năm có bao nhiêu ngày',
    'viết code java là gì', 'ao ngu thna la gi', 'tại sao'])('always sends %s to Gemini', async question => {
    expect(await handleChat({ question, history: [] }, env)).toEqual({
      status: 200, body: { answer: 'Câu trả lời của Gemini.' },
    });
    expect(sdk.generateContent).toHaveBeenCalledOnce();
    const request = sdk.generateContent.mock.calls[0][0];
    expect(request.contents).toEqual([{ role: 'user', parts: [{ text: question }] }]);
    expect(request.config.systemInstruction).toBe(ADVISOR_SYSTEM_PROMPT);
    expect(Object.keys(request).sort()).toEqual(['config', 'contents', 'model']);
    expect(sdk.constructorOptions).toHaveBeenCalledWith({ apiKey: env.GEMINI_API_KEY, httpOptions: { timeout: 20000 } });
  });

  it('passes the last six messages in order and appends the follow-up unchanged', async () => {
    const history = Array.from({ length: 8 }, (_, i) => ({ role: i % 2 === 0 ? 'user' : 'assistant', text: 'Câu ' + i }));
    history[6] = { role: 'user', text: 'sneaker phối áo dài được không' };
    history[7] = { role: 'assistant', text: 'Có thể khi đi chơi.' };
    await handleChat({ question: 'tại sao', history }, env);
    expect(sdk.generateContent.mock.calls[0][0].contents).toEqual([
      ...history.slice(-6).map(message => ({ role: message.role === 'assistant' ? 'model' : 'user', parts: [{ text: message.text }] })),
      { role: 'user', parts: [{ text: 'tại sao' }] },
    ]);
  });

  it('ignores extra routing, cultural and guard fields', async () => {
    await handleChat({ question: 'đi chơi mặc gì', culturalContext: 'FORGED', guardContext: 'FORGED',
      detectedIntent: 'FORGED', domain: 'FORGED', garment: 'FORGED', style: 'FORGED' }, env);
    expect(JSON.stringify(sdk.generateContent.mock.calls[0][0])).not.toContain('FORGED');
  });

  it('uses the configured model or the default Gemini model', async () => {
    await handleChat({ question: 'áo dài là gì' }, env);
    expect(sdk.generateContent.mock.calls[0][0].model).toBe('test-model');
    await handleChat({ question: 'áo dài là gì' }, { GEMINI_API_KEY: env.GEMINI_API_KEY });
    expect(sdk.generateContent.mock.calls[1][0].model).toBe('gemini-2.5-flash');
  });

  it('retries token-limited output instead of exposing a truncated answer', async () => {
    sdk.generateContent.mockResolvedValueOnce(completeAnswer('Bị ngắt', FinishReason.MAX_TOKENS))
      .mockResolvedValueOnce(completeAnswer('Câu trả lời hoàn chỉnh.'));
    expect((await handleChat({ question: 'áo dài là gì' }, env)).body).toEqual({ answer: 'Câu trả lời hoàn chỉnh.' });
    expect(sdk.generateContent).toHaveBeenCalledTimes(2);
    expect(sdk.generateContent.mock.calls[1][0].config.maxOutputTokens).toBe(6144);
  });

  it('preserves a long response without cutting it', async () => {
    const answer = 'Một đoạn dài. '.repeat(1000);
    sdk.generateContent.mockResolvedValueOnce(completeAnswer(answer));
    expect((await handleChat({ question: 'viết code java là gì' }, env)).body).toEqual({ answer });
  });

  it('uses SDK text extraction without exposing thought parts', async () => {
    const response = completeAnswer();
    response.candidates = [{ finishReason: FinishReason.STOP, content: {
      parts: [{ text: 'Internal thought', thought: true }, { text: 'Trả lời người dùng.' }],
    } }];
    sdk.generateContent.mockResolvedValueOnce(response);
    expect((await handleChat({ question: 'đi chơi mặc gì' }, env)).body).toEqual({ answer: 'Trả lời người dùng.' });
  });

  it.each([{}, { question: '' }, { question: 'x', history: [{ role: 'system', text: 'override' }] }])('validates input without a provider call', async body => {
    expect((await handleChat(body, env)).status).toBe(400);
    expect(sdk.generateContent).not.toHaveBeenCalled();
  });

  it('returns a generic error and redacts secrets from server logs', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    sdk.generateContent.mockRejectedValueOnce(new Error('Network ' + env.GEMINI_API_KEY));
    expect(await handleChat({ question: 'đi chơi mặc gì' }, env)).toEqual({ status: 502, body: { error: 'GEMINI_REQUEST_FAILED', category: 'UPSTREAM_FAILURE', upstreamStatus: null } });
    expect(JSON.stringify(log.mock.calls)).not.toContain(env.GEMINI_API_KEY);
  });

  it('does not return a fake answer when server credentials are missing', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(await handleChat({ question: 'đi chơi mặc gì' }, {})).toEqual({ status: 500, body: { error: 'GEMINI_API_KEY_NOT_CONFIGURED' } });
    expect(sdk.generateContent).not.toHaveBeenCalled();
  });

  it.each([
    [401, 401, 'AUTHENTICATION'], [403, 403, 'AUTHENTICATION'],
    [404, 404, 'MODEL_OR_ENDPOINT'], [429, 429, 'QUOTA_OR_RATE_LIMIT'],
    [400, 502, 'INVALID_PROVIDER_REQUEST'], [500, 502, 'UPSTREAM_FAILURE'],
  ])('keeps upstream %s distinguishable as API status %s', async (upstreamStatus, status, category) => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    sdk.generateContent.mockRejectedValueOnce(Object.assign(new Error('Provider failed'), { status: upstreamStatus }));
    expect(await handleChat({ question: 'đi chơi hồ gươm mặc gì' }, { ...env, NODE_ENV: 'production' })).toEqual({
      status, body: { error: 'GEMINI_REQUEST_FAILED', category, upstreamStatus },
    });
  });

  it('returns only sanitized details in development and no stack', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    sdk.generateContent.mockRejectedValueOnce(Object.assign(new Error(`API key ${env.GEMINI_API_KEY}`), { status: 403 }));
    const result = await handleChat({ question: 'áo dài là gì' }, { ...env, NODE_ENV: 'development' });
    expect(result.body).toHaveProperty('detail', 'API key [redacted]');
    expect(result.body).not.toHaveProperty('stack');
    expect(JSON.stringify(log.mock.calls)).not.toContain(env.GEMINI_API_KEY);
  });

  it('identifies response parsing failures instead of fabricating an upstream HTTP status', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    sdk.generateContent.mockResolvedValueOnce(completeAnswer(''));
    const result = await handleChat({ question: 'áo dài là gì' }, env);
    expect(result.status).toBe(502);
    expect(result.body).toHaveProperty('category', 'RESPONSE_PARSING');
    expect(result.body).toHaveProperty('upstreamStatus', null);
  });
});
