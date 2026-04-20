import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
app.use(
  '/api/lead',
  createProxyMiddleware({
    target: 'https://functions.yandexcloud.net',
    changeOrigin: true,
    pathRewrite: { '^/api/lead': '/d4egoeg3pj9n6tvunkrq' },
    logger: console,
    on: {
      proxyReq: (proxyReq) => {
        proxyReq.setHeader('X-API-Key', 'vhPz31Lg6UqZwOdGgWT9eIPJ9U7C8mScPwY5vLDRcBpsMLv4cojpKxXrWbgHWZUr');
        proxyReq.setHeader('Content-Type', 'application/json');
      },
    },
  })
);

app.listen(3001, async () => {
    console.log('Server started');
    const res = await fetch('http://127.0.0.1:3001/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _version: '2.1' })
    });
    console.log('Status:', res.status);
    console.log('Body:', await res.text());
    process.exit(0);
});
