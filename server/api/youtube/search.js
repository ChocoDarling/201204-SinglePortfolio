const axios = require('axios');

async function searchYoutube(ctx) {
  try {
    const tempSearchHTML = await axios.get(
      `https://www.youtube.com/results?search_query=${encodeURI(
        // `https://www.youtuawrcawecbe.com/results?search_query=${encodeURI(
        ctx.request.body.searchKey,
      )}+${encodeURI('예고편')}`,
    );
    let tempText = tempSearchHTML.data.slice(
      tempSearchHTML.data.indexOf('ytInitialData'),
    );
    tempText = tempText.slice(
      tempText.indexOf('= ') + 2,
      tempText.indexOf('</script>') - 1,
    );
    ctx.body = [];
    JSON.parse(
      tempText,
    ).contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents.forEach(
      (v) => {
        if (v.videoRenderer) ctx.body.push(v.videoRenderer.videoId);
        if (v.movieRenderer) {
          ctx.body.push(v.movieRenderer.videoId);
        }
      },
    );
  } catch (err) {
    ctx.body = [
      'Gft-p7MkvOg',
      'YuIjYROoN4k',
      'qCV2eVvbKPY',
      'TZ1zWjfmAZI',
      '8fSR664uOaU',
      'T1zoAOQQcvs',
      'p5-abP2GVPg',
      'QouYlA5dchk',
      'B7LabclI_34',
      'FSrg0_wG_80',
      'mQrlzU06VIg',
      'ynElnVk9rPY',
      'lM6zp8ihq9M',
      'ijMdbUl3meU',
      '-8_vGZEgCeU',
      'Yk_a626TRPY',
      'q-qPuhXGr1A',
      'G090liBH_k0',
      'pg6nfwpXF9k',
      '4nCkXGr6V9Q',
    ];
    console.log(err);
  }
}

module.exports = searchYoutube;
