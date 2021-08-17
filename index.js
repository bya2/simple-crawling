require('dotenv').config();
const axios = require('axios').default;
const cheerio = require('cheerio');

const db = require('./db');
const Book = require('./models/Book');

const url = process.env.TARGET;

const getHtml = async url => {
  try {
    return await axios.get(url);
  } catch (err) {
    console.error('Error in get method of axios:\n', err.message);
  }
}

// 즉시 실행 함수
(async () => {
  const html = await getHtml(url);

  const $ = cheerio.load(html.data); // html 문자열을 cheerio 객체로 반환
  const $ul = $('ul#webtoon-list-all').children('li:eq(0)'); // children: 해당되는 태그들의 배열을 반환

  $ul.each(async (i, e) => {
    const el = $(e);

    const title = el.find('span').text(),
          url = encodeURI(el.find('a').attr('href'));

    const html = await getHtml(url);

    const $page = cheerio.load(html.data);

    const img = encodeURI($page('div.view-title div.view-img img').attr('src')),
          score = parseFloat($page('div.view-comment').text().split('\n')[5]),
          comments = parseInt($page('div.view-comment span.orangered').text()),
          good = parseInt($page('b#wr_good').text()),
          person = parseInt($page('div.view-comment').text().split(' ').pop().split('\t')[0]);

    const bookDoc = new Book({ title, url, img, score, comments, good, person});
    bookDoc.save(err => err ? console.error('Error while saving:\n', err.message) : console.log('Completed saving to database.'));
    // console.log({ title, url, img, score, comments, good, person}); // Used for testing purposes.
  });
})();