const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = new Koa();
const router = new KoaRouter();

app.use(KoaBodyParser());
app.use(router.routes()).use(router.allowedMethods());

const port = 4000;
app.listen(port, () => {
  console.log('포트대기중 %d', port);
});
