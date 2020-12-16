const axios = require('axios');

async function getPosterInNaver(searchKey) {
  const ID_KEY = 'Qy6IicpMsDCQjAeL7Suf';
  const SECRET_KEY = 'q1iotNtDsr';
  try {
    const {
      data: { items },
    } = await axios.get('https://openapi.naver.com/v1/search/movie.json', {
      params: {
        query: searchKey,
        display: 20,
      },
      headers: {
        'X-Naver-Client-Id': ID_KEY,
        'X-Naver-Client-Secret': SECRET_KEY,
      },
    });
    const item = items.find((v) => v.title == `<b>${searchKey}</b>`);
    return [item.subtitle, item.image];
  } catch (error) {}
}

module.exports = { getPosterInNaver };

// 네이버 api "https://ssl.pstatic.net/imgmovie/mdi/mit110/1993/199393_P06_105429.jpg"
// 네이버 영화 포스터 확대 <img id="targetImage" src="https://movie-phinf.pstatic.net/20201116_276/1605491658399poUOC_JPEG/movie_image.jpg" alt="조제">
// 네이버 영화 포스터 확대 <img id="targetImage" src="https://movie-phinf.pstatic.net/20201126_230/16063699603471Nuvi_JPEG/movie_image.jpg" alt="레벨 16">
// 네이버 영화 포스터 설명 <img src="https://movie-phinf.pstatic.net/20201116_276/1605491658399poUOC_JPEG/movie_image.jpg?type=m203_290_2" alt="조제" onerror="this.src='https://ssl.pstatic.net/static/movie/2012/06/dft_img203x290.png'">
// 네이버 영화 포스터 설명 <img src="https://movie-phinf.pstatic.net/20201126_230/16063699603471Nuvi_JPEG/movie_image.jpg?type=m203_290_2" alt="레벨 16" onerror="this.src='https://ssl.pstatic.net/static/movie/2012/06/dft_img203x290.png'">
// 네이버 영화 포스터 설명 <img src="https://movie-phinf.pstatic.net/20201124_198/1606203242513MB2oj_JPEG/movie_image.jpg?type=m203_290_2" alt="스카이와 친구들: 로보시티의 비밀" onerror="this.src='https://ssl.pstatic.net/static/movie/2012/06/dft_img203x290.png'">
