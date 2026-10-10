import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import chat from './api/chat.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), {
      name: 'advisor-chat-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.split('?')[0] !== '/api/chat') return next();
          void chat(req, res, { ...env, NODE_ENV: 'development' }).catch(() => {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Hiện mình chưa thể xử lý câu hỏi này. Bạn thử lại sau nhé.' }));
          });
        });
      },
    }],
    server: {
      proxy: {
        '/api/stylist': {
          target: 'https://generativelanguage.googleapis.com',
          changeOrigin: true,
          rewrite: (path) => {
            const model = env.GEMINI_MODEL || 'gemini-1.5-flash';
            return path.replace(/^\/api\/stylist/, `/v1beta/models/${model}:generateContent`);
          },
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (env.GEMINI_API_KEY) {
                proxyReq.setHeader('x-goog-api-key', env.GEMINI_API_KEY);
              }
            });
          }
        }
      }
    }
  }
})
