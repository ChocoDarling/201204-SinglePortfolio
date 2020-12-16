const router = require('koa-router');
const search = require('./search');

const youtube = new router();

youtube.post('/', search);

module.exports = youtube;
