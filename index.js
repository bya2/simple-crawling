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

getHtml(url).then(html => {
  const $ = cheerio.load(html.data); // HTML 문자열을 cheerio 객체로 반환
  const $ulList = $('div#webtoon-list ul#webtoon-list-all').children('li:eq(2)'); // children: 해당되는 태그들의 배열을 반환

  $ulList.each(function(i, el) {
    const title = $(this).find('span').text();
    const url = encodeURI($(this).find('a').attr('href'));

    getHtml(url).then(html => {
      const $ = cheerio.load(html.data);
      
      const info = {
        title: title,
        url: url,
        img: $('div.view-title div.view-img img').attr('src'),
        score: parseFloat($('div.view-comment').text().split('\n')[5]),
        comments: parseInt($('div.view-comment span.orangered').text()),
        good: parseInt($('b#wr_good').text()),
        person: parseInt($('div.view-comment').text().split(' ').pop().split('\t')[0])
      }

      const bookDoc = new Book(info);
      bookDoc.save(err => err ? console.error('Error while saving:\n', err.message) : console.log('Completed saving to database.'));
    });
  })
});