const axios = require('axios');
const { getPosterInNaver } = require('./naverMovie');

const API_URL = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest';
const params = { key: '3f092711b7c6f97a81713be541c76048' };
// 3f092711b7c6f97a81713be541c76048
// 3a112ef84614341f6522da1ad7191883

/*
  일별 박스오피스  http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?  날짜 targetDt   국가 repNationCd
  주간 박스오피스  http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?  날짜 targetDt   주간/주말/주중 weekGb(0월일, 1금일, 2월목)
  영화 목록조회    http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json     movieNm	영화명   directorNm영화감독명
  영화 상세 조회   http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json
                                                                     / API_ROUTER /search SEARCH_TYPE .json
  일별 박스오피스   boxOfficeResult.dailyBoxOfficeList
  주간 박스오피스   boxOfficeResult.weeklyBoxOfficeList
  영화 목록조회     movieListResult.movieList
  영화 상세 조회    movieInfoResult.movieInfo
  
*/

async function getBoxOffice(ctx) {
  params['targetDt'] = ctx.request.body.searchKey;
  ctx.body = [];
  try {
    const BoxOfficedata = await axios.get(
      `${API_URL}/boxoffice/search${ctx.params.type.replace(
        /\b[a-z]/,
        (letter) => letter.toUpperCase(),
      )}BoxOfficeList.json`,
      {
        params,
      },
    );
    ctx.body = await BoxOfficedata.data.boxOfficeResult[
      `${ctx.params.type}BoxOfficeList`
    ].map((v) => {
      const tempObj = {
        movieCd: v.movieCd,
        movieNm: v.movieNm.trim(),
        openDt: v.openDt,
        linkTo: `/${v.movieNm.trim()}`,
      };
      return tempObj;
    });
    for (let i = 0; i < ctx.body.length; i++) {
      let naver;
      for (let j = 0; j < 10; j++) {
        naver = await getPosterInNaver(ctx.body[i].movieNm);
        if (naver) {
          ctx.body[i].movieNmEn = naver[0];
          ctx.body[i].poster = naver[1];
        }
        if (ctx.body[i].poster) break;
      }
      if (!ctx.body[i].poster) {
        console.log(naver);
        console.log(ctx.body[i].movieNm);
        ctx.body[i].movieNmEn = 'none';
        ctx.body[i].poster = 'none';
      }
    }
  } catch (error) {
    console.log('api 에러');
    console.log(error);
    ctx.body = [
      {
        movieCd: '20181983',
        movieNm: '이웃사촌',
        openDt: '2020-11-25',
        linkTo: '/이웃사촌',
        poster:
          'https://ssl.pstatic.net/imgmovie/mdi/mit110/1641/164143_P16_100335.jpg',
      },
      {
        movieCd: '20192193',
        movieNm: '도굴',
        openDt: '2020-11-04',
        linkTo: '/도굴',
        poster:
          'https://ssl.pstatic.net/imgmovie/mdi/mit110/1931/193194_P39_110323.jpg',
      },
      {
        movieCd: '20200294',
        movieNm: '런',
        openDt: '2020-11-20',
        linkTo: '/런',
        poster:
          'https://ssl.pstatic.net/imgmovie/mdi/mit110/1907/190722_P08_144931.jpg',
      },
      {
        movieCd: '20200554',
        movieNm: '더 프롬',
        openDt: '2020-12-02',
        linkTo: '/더 프롬',
        poster:
          'https://ssl.pstatic.net/imgmovie/mdi/mit110/1939/193970_P11_150428.jpg',
      },
      {
        movieCd: '20206710',
        movieNm: '파티마의 기적',
        openDt: '2020-12-03',
        linkTo: '/파티마의 기적',
        poster:
          'https://ssl.pstatic.net/imgmovie/mdi/mit110/1931/193195_P11_144618.jpg',
      },
      {
        movieCd: '20201123',
        movieNm: '프리키 데스데이',
        openDt: '2020-11-25',
        linkTo: '/프리키 데스데이',
        poster:
          'https://ssl.pstatic.net/imgmovie/mdi/mit110/1972/197278_P09_170039.jpg',
      },
      {
        movieCd: '20197121',
        movieNm: '삼진그룹 영어토익반',
        openDt: '2020-10-21',
        linkTo: '/삼진그룹 영어토익반',
        poster:
          'https://ssl.pstatic.net/imgmovie/mdi/mit110/1891/189141_P52_153007.jpg',
      },
      {
        movieCd: '20197853',
        movieNm: '잔칫날',
        openDt: '2020-12-02',
        linkTo: '/잔칫날',
        poster:
          'https://ssl.pstatic.net/imgmovie/mdi/mit110/1949/194910_P05_181503.jpg',
      },
      {
        movieCd: '20149120',
        movieNm: '인터스텔라',
        openDt: '2014-11-06',
        linkTo: '/인터스텔라',
        poster:
          'https://ssl.pstatic.net/imgmovie/mdi/mit110/0452/45290_P59_104735.jpg',
      },
      {
        movieCd: '20206547',
        movieNm: '극장판 바이올렛 에버가든',
        openDt: '2020-11-12',
        linkTo: '/극장판 바이올렛 에버가든',
        poster:
          'https://ssl.pstatic.net/imgmovie/mdi/mit110/1968/196843_P08_111016.jpg',
      },
    ];
  }
}

async function getData(ctx) {
  params.movieCd = ctx.request.body.searchKey;
  ctx.body = {};
  try {
    const infoData = (
      await axios.get(`${API_URL}/movie/searchMovieInfo.json`, {
        params,
      })
    ).data.movieInfoResult.movieInfo;
    ctx.body.movieCd = infoData.movieCd;
    ctx.body.movieNm = infoData.movieNm;
    ctx.body.movieNmEn = infoData.movieNmEn;
  } catch (error) {}
}

module.exports = {
  getData,
  getBoxOffice,
};
