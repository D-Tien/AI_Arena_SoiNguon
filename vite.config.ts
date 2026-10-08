import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
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
