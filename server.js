/**
 * server.js — Express proxy для gift-navigator (Render)
 * Отдаёт статику dist/ и проксирует /api/lead → Yandex Cloud Function
 * API-ключ хранится на сервере, не светится в браузере.
 */

import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

const YANDEX_FUNCTION_URL = "https://functions.yandexcloud.net";
const YANDEX_FUNCTION_ID  = "d4egoeg3pj9n6tvunkrq";
const API_KEY = process.env.YANDEX_API_KEY || "vhPz31Lg6UqZwOdGgWT9eIPJ9U7C8mScPwY5vLDRcBpsMLv4cojpKxXrWbgHWZUr";

// Прокси /api/lead → Yandex Cloud Function
app.use(
  "/api/lead",
  createProxyMiddleware({
    target: YANDEX_FUNCTION_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/lead": `/${YANDEX_FUNCTION_ID}` },
    on: {
      proxyReq: (proxyReq) => {
        proxyReq.setHeader("X-API-Key", API_KEY);
        proxyReq.setHeader("Content-Type", "application/json");
      },
    },
  })
);

// Статика из dist/
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback — все маршруты отдают index.html
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`[server] running on port ${PORT}`);
});
