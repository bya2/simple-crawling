require('dotenv').config();
const axios = require('axios').default;
const cheerio = require('cheerio');

// const db = require('./db');
// const Book = require('./models/Book');

const url = process.env.TARGET || 'https://sosul.network/series/comments/';

const getHtml = async url => {
  try {
    return await axios.get(url);
  } catch (err) {
    console.error(`Error in get method of axios:\n${err.message}`);
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

// 즉시 실행 함수
(async () => {
  const $ = loadData(url);

  if (!$) {
    console.log('No data loaded.');
    return;
  }
  
  const $gridLayout = $('.container .grid-layout').children('.grid-item:eq(7)');

  $gridLayout.each(async (i, e) => {
    const el = $(e);

    const [avgScore, reviews] = el.find('.product-reviews').text().split(' ');

    const product = {
      url: encodeURI(`https://sosul.network/${el.find('.product-image a').attr('href')}`),
      img: el.find('.product-image img').attr('data-src'),
      tags: el.find('.product-category').text(),
      title: el.find('.product-title a').html(),
      avgScore: parseFloat(avgScore),
      reviews: parseInt(reviews[1]),
      introduction: el.find('.product-introduction').text(),
      platforms: []
    }

    const review = el.find('.content-txt.mt-1').html() || el.find('.blur-effect').html();
    
    const latestReview = {
      nickname: el.find('.product-nickname strong').text(),
      updated: el.find('small.text-muted.float-right').text(),
      review: review
    }

    const $page = loadData(url);

    if (!$page) {
      console.log('No data loaded.');
      return;
    }

    const $meta = $page('.product-link').children('a');

    console.log($meta.html());

    $meta.each(async (i, e) => {
      const el = $(e);

      const name = el.text();
      const url = encodeURI(el.attr('href'));

      product.platforms.push({name, url});
    })

    console.log('ok', product.platforms);
  });
})();