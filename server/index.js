require('dotenv').config();
const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const cors = require('@koa/cors');
const PORT = process.env['SERVER_PORT'];
const { MONGO_URI } = process.env;

const api = require('./api');
const jwtMiddleware = require('./lib/jwtMiddleware');

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new KoaRouter();

app.use(cors());
router.use('/api', api.routes());

app.use(KoaBodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
  console.log('포트대기중 %d', port);
});
