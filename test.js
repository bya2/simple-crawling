const axios = require('axios').default;
const cheerio = require('cheerio');

const url = 'https://page.kakao.com/home?seriesId=52001198'

const getHtml = async url => {
  try {
    return await axios.get(url);
  } catch (err) {
    throw console.error('Error in get method of axios:\n', err.message);
  }
}

const loadData = async url => {
  try {
    const html = await getHtml(url);
    const $ = cheerio.load(html.data);
    return $;
  } catch (err) {
    console.error(`Error in loading data:\n${err.message}`);
    return null;
  }
}

(async () => {
  const $ = loadData(url);

  if ($) {
    console.log(1);
  } else {
    console.log(2);
  }
})();