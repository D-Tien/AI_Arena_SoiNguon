export function redactGeminiError(value: string, apiKey = ''): string {
  let safe = value;
  if (apiKey) {
    safe = safe.replaceAll(apiKey, '[redacted]').replaceAll(encodeURIComponent(apiKey), '[redacted]');
  }
  return safe.replace(/AIza[\w-]{20,}/g, '[redacted]')
    .replace(/(Bearer\s+)[^\s"',}]+/gi, '$1[redacted]')
    .replace(/((?:api[_-]?key|x-goog-api-key|access_token|key)["']?\s*[:=]\s*["']?)[^\s"'&,}]+/gi, '$1[redacted]');
}

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}

function httpStatus(value: unknown): number | null {
  const number = typeof value === 'string' ? Number(value) : value;
  return typeof number === 'number' && Number.isInteger(number) && number >= 100 && number <= 599 ? number : null;
}

export function diagnoseGeminiError(error: unknown, apiKey: string) {
  const object = record(error) ? error : {};
  const rawMessage = typeof object.message === 'string' ? object.message : 'Unknown provider failure';
  let upstream: Record<string, unknown> = {};
  try {
    const parsed: unknown = JSON.parse(rawMessage);
    if (record(parsed) && record(parsed.error)) upstream = parsed.error;
  } catch { /* SDK transport failures can have plain-text messages. */ }
  const status = httpStatus(object.status) ?? httpStatus(object.statusCode) ?? httpStatus(upstream.code);
  const code = object.code ?? upstream.status ?? null;
  const category = status === 401 || status === 403 ? 'AUTHENTICATION'
    : status === 404 ? 'MODEL_OR_ENDPOINT'
    : status === 429 ? 'QUOTA_OR_RATE_LIMIT'
    : status === 400 ? 'INVALID_PROVIDER_REQUEST'
    : typeof code === 'string' && code.startsWith('GEMINI_RESPONSE_') ? 'RESPONSE_PARSING'
    : 'UPSTREAM_FAILURE';
  const apiStatus = status !== null && [401, 403, 404, 429].includes(status) ? status : 502;
  return {
    apiStatus, category,
    name: redactGeminiError(typeof object.name === 'string' ? object.name : 'Error', apiKey),
    message: redactGeminiError(typeof upstream.message === 'string' ? upstream.message : rawMessage, apiKey),
    status,
    code: typeof code === 'string' ? redactGeminiError(code, apiKey) : typeof code === 'number' ? code : null,
  };
}
