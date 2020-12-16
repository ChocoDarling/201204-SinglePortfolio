const router = require('koa-router');
const { getData, getBoxOffice } = require('./MovieApi');
const searchMovie = new router();

searchMovie.post('/', getData);
searchMovie.post('/boxoffice/:type', getBoxOffice);
module.exports = searchMovie;
