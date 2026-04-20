/**
 * server.js — Express proxy для gift-navigator (Render)
 * Отдаёт статику dist/ и проксирует /api/lead → Yandex Cloud Function
 * API-ключ хранится на сервере, не светится в браузере.
 */

import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

const YANDEX_FUNCTION_URL = "https://functions.yandexcloud.net/d4egoeg3pj9n6tvunkrq";
const API_KEY = process.env.YANDEX_API_KEY || "vhPz31Lg6UqZwOdGgWT9eIPJ9U7C8mScPwY5vLDRcBpsMLv4cojpKxXrWbgHWZUr";

// Парсим JSON из body (необходимо для чтения лида)
app.use(express.json());

// Настраиваем CORS и перехватываем OPTIONS (Preflight запросы браузера)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-API-Key");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// Ручное проксирование POST /api/lead → Yandex Cloud Function
app.post("/api/lead", async (req, res) => {
  try {
    const yandexResponse = await fetch(YANDEX_FUNCTION_URL, {
      method: "POST",
      headers: {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json; charset=utf-8" // Жестко ставим UTF-8 для починки ???
      },
      body: JSON.stringify(req.body),
    });
    
    // Получаем ответ Яндекса и отдаем его браузеру
    const data = await yandexResponse.text();
    res.status(yandexResponse.status).send(data);
  } catch (error) {
    console.error("Proxy fetch error:", error);
    res.status(500).json({ error: "Internal Server Error during proxying to Yandex" });
  }
});

// Статика из dist/
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback — все маршруты отдают index.html
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`[server] running on port ${PORT}`);
});
