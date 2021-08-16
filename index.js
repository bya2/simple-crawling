require('dotenv').config();
const axios = require('axios').default;
const cheerio = require('cheerio');

const url = process.env.TARGET;
const ulList = [];

const getHtml = async url => {
  try {
    return await axios.get(url);
  } catch (err) {
    console.error('Error in get method of axios:\n', err.message);
  }
}

getHtml(url).then(html => {
  const $ = cheerio.load(html.data);
  const $ulList = $('div#webtoon-list ul#webtoon-list-all').children('li');

  $ulList.each(function(i, el) {
    const url = encodeURI($(this).find('a').attr('href'));

    ulList[i] = {
      title: $(this).find('span').text(),
      url: url
    }

    getHtml(url).then(html => {
      const $ = cheerio.load(html.data);
      
      ulList[i] = {
        score: $('div.view-comment').text().split(' '),
        comments: $('div.view-comment span.orangered').text(),
        good = $('div.view-content b#wr_good').text(),
        person = $('div.view-comment').text().split(' ').pop().split('/')[0]
      }

      console.log(ulList[i]);
    });
  })
});