import type { IncomingMessage, ServerResponse } from 'node:http';
import { ADVISOR_ERROR_MESSAGE, HISTORY_LIMIT,
  type ConversationMessage } from '../src/services/ai/advisorContext.ts';
import { generateGeminiReply } from '../server/GeminiProvider.ts';

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
  try {
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('Missing server GEMINI_API_KEY');
    const answer = await generateGeminiReply(request, {
      apiKey, model: env.GEMINI_CHAT_MODEL || env.GEMINI_MODEL || 'gemini-2.5-flash',
    });
    return { status: 200, body: { answer } };
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'Unknown provider failure';
    console.error('AI Advisor:', detail.replaceAll(env.GEMINI_API_KEY || '\u0000', '[redacted]'));
    return { status: 503, body: { error: ADVISOR_ERROR_MESSAGE } };
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
