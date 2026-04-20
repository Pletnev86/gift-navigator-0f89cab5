import { createProxyMiddleware } from 'http-proxy-middleware';

const mw = createProxyMiddleware({
  target: 'https://functions.yandexcloud.net',
  pathRewrite: { '^/api/lead': '/d4egoeg3pj9n6tvunkrq' }
});

const req = { url: '/api/lead', method: 'POST', connection: {} };
const res = {};
mw(req, res, () => {});
console.log(req.url);
