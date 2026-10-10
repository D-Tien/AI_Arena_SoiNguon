import { describe, expect, it } from 'vitest';
import { diagnoseGeminiError, redactGeminiError } from '../../../server/geminiErrors';

describe('Safe Gemini diagnostics', () => {
  it('extracts status/code/message from SDK JSON errors', () => {
    const error = new Error(JSON.stringify({ error: { code: 404, status: 'NOT_FOUND', message: 'Model unavailable' } }));
    expect(diagnoseGeminiError(error, '')).toMatchObject({
      apiStatus: 404, status: 404, code: 'NOT_FOUND', message: 'Model unavailable', category: 'MODEL_OR_ENDPOINT',
    });
  });

  it('redacts literal keys, encoded keys, query keys and bearer tokens', () => {
    const key = 'secret/with+characters';
    const error = `${key} ${encodeURIComponent(key)} ?key=another-secret Authorization: Bearer private-token`;
    const result = redactGeminiError(error, key);
    expect(result).not.toContain(key);
    expect(result).not.toContain(encodeURIComponent(key));
    expect(result).not.toContain('another-secret');
    expect(result).not.toContain('private-token');
  });
});
