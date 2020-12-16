const router = require('koa-router');
const youtube = require('./youtube');
const searchMovie = require('./searchMovie');
const auth = require('./auth');

const api = new router();
api.use('/youtube', youtube.routes());
api.use('/searchMovie', searchMovie.routes());
api.use('/auth', auth.routes());

module.exports = api;
