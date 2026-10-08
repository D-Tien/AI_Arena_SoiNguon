import type { IncomingMessage, ServerResponse } from 'node:http';
import { HISTORY_LIMIT,
  type ConversationMessage } from '../src/services/ai/advisorContext.js';
import { generateGeminiReply } from '../server/GeminiProvider.js';
import { diagnoseGeminiError, redactGeminiError } from '../server/geminiErrors.js';

type Environment = Record<string, string | undefined>;
const MAX_BODY_BYTES = 64 * 1024;

function parseChatBody(body: unknown): { question: string; history: ConversationMessage[] } | null {
  if (!body || typeof body !== 'object' || !('question' in body)
      || typeof body.question !== 'string' || !body.question.trim() || body.question.length > 4000) return null;
  const history = 'history' in body ? body.history : [];
  if (!Array.isArray(history)) return null;
  const recent = history.slice(-HISTORY_LIMIT);
  if (!recent.every((message: unknown): message is ConversationMessage =>
    !!message && typeof message === 'object' && 'role' in message && 'text' in message
    && (message.role === 'user' || message.role === 'assistant')
    && typeof message.text === 'string' && !!message.text.trim())) return null;
  return { question: body.question.trim(), history: recent };
}

export async function handleChat(body: unknown, env: Environment) {
  const request = parseChatBody(body);
  if (!request) return { status: 400, body: { error: 'Bạn nhập câu hỏi hợp lệ nhé.' } };
  const apiKey = env.GEMINI_API_KEY?.trim();
  const model = env.GEMINI_CHAT_MODEL?.trim() || env.GEMINI_MODEL?.trim() || 'gemini-2.5-flash';
  console.log('Gemini key configured:', Boolean(apiKey));
  console.log('Gemini model:', redactGeminiError(model, apiKey));
  console.log('AI deployment:', {
    branch: env.VERCEL_GIT_COMMIT_REF ?? null,
    commit: env.VERCEL_GIT_COMMIT_SHA ?? null,
    environment: env.VERCEL_ENV ?? env.NODE_ENV ?? null,
  });
  if (!apiKey) {
    console.error('Gemini error:', { name: 'ConfigurationError', message: 'GEMINI_API_KEY_NOT_CONFIGURED', status: 500, code: 'GEMINI_API_KEY_NOT_CONFIGURED' });
    return { status: 500, body: { error: 'GEMINI_API_KEY_NOT_CONFIGURED' } };
  }
  try {
    const answer = await generateGeminiReply(request, {
      apiKey, model,
    });
    return { status: 200, body: { answer } };
  } catch (error) {
    const diagnostic = diagnoseGeminiError(error, apiKey);
    console.error('Gemini error:', { name: diagnostic.name, message: diagnostic.message, status: diagnostic.status, code: diagnostic.code, category: diagnostic.category });
    const debug = env.NODE_ENV === 'development' || env.VERCEL_ENV === 'development' || env.GEMINI_DEBUG === 'true';
    return { status: diagnostic.apiStatus, body: {
      error: 'GEMINI_REQUEST_FAILED',
      category: diagnostic.category,
      upstreamStatus: diagnostic.status,
      ...(debug ? { detail: diagnostic.message } : {}),
    } };
  }
}

interface ChatRequest extends IncomingMessage { body?: unknown }

export default async function chat(req: ChatRequest, res: ServerResponse, env: Environment = process.env) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }
  let body: unknown = req.body;
  try {
    if (body === undefined) {
      const chunks: Buffer[] = [];
      let size = 0;
      for await (const chunk of req) {
        const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk));
        size += buffer.length;
        if (size > MAX_BODY_BYTES) {
          res.statusCode = 413;
          res.end(JSON.stringify({ error: 'Câu hỏi quá dài.' }));
          return;
        }
        chunks.push(buffer);
      }
      body = JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
    } else if (typeof body === 'string') {
      body = JSON.parse(body) as unknown;
    }
  } catch {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Bạn nhập câu hỏi hợp lệ nhé.' }));
    return;
  }
  const result = await handleChat(body, env);
  res.statusCode = result.status;
  res.end(JSON.stringify(result.body));
}
