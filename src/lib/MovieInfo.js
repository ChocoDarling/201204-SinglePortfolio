import client from './axiosCreate';

export const SEARCH_TYPE_INPUT = [
  'movieList',
  'movieInfo',
  'dailyBoxOfficeList',
  'weeklyBoxOfficeList',
];

export const getMovieInfo = async (searchKey) =>
  (
    await client.post('/api/searchMovie', {
      searchKey,
    })
  ).data;

export const getBoxOffice = async (searchKey, searchType) =>
  (
    await client.post(`/api/searchMovie/boxoffice/${searchType}`, {
      searchKey,
    })
  ).data;

export const getMovieYoutube = async (searchKey) =>
  (
    await client.post('/api/youtube', {
      searchKey,
    })
  ).data;
