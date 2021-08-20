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

const kakaoPage = async $ => {

}

const munpia = $ => {
  const $meta = $('.meta-etc.meta').children('dd');
  const meta = [];
  $meta.each((i, e) => {
    const el = $(e);
    meta.push(el.text());
  });

  const info = {
    img: `https://${$('.dt.cover-box img').attr('src')}`,
    bigImg: `https://${$('.bigImgs img').attr('src')}`,
    status: $('.novel-real-period span').text(),
    registered: meta[0],
    updated: meta[1],
    serials: meta[2].split(' ')[0],
    views: parseInt(meta[3].replace(/,/g, '')), // g: 발생할 모든 패턴 전역 검색
    recommendations: parseInt(meta[4].replace(/,/g, '')),
    characters: parseInt(meta[5].replace(/,/g, '')),
    preferred: parseInt($('.fr .text b').text().replace(',', ''))
  }

  return info;
}

const naverSeries = async $ => {

}

const ridibooks = async $ => {

}

// 즉시 실행 함수
(async () => {
  const $ = loadData(url);

  if (!$) {
    console.log('No data loaded.');
    return;
  }
  
  const $gridLayout = $('.container .grid-layout').children('.grid-item:eq(7)');

  const products = [];

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

    const $link = $page('.product-link').children('a');

    $link.each(async (i, e) => {
      const el = $(e);

      const name = el.text();
      const url = encodeURI(el.attr('href'));

      let info;

      const $pf = loadData(url);

      switch (name) {
        case '카카오페이지':
          info = kakaoPage($pf);
          break;
        case '문피아':
          info = munpia($pf);
          break;
        case '네이버시리즈':
          info = naverSeries($pf);
          break;
        case '리디북스':
          info = ridibooks($pf);
          break;
        default:
          break;
      }

      product.platforms.push({name, url, info});
    })

    console.log('ok', product.platforms);
  });
})();