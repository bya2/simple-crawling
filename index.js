require('dotenv').config();
const axios = require('axios').default;
const cheerio = require('cheerio');

const url = process.env.TARGET;
const ulList = [];

// Axios를 이용해서 비동기로 해당 URL의 HTML을 가져옴
const getHtml = async url => {
  try {
    return await axios.get(url);
  } catch (err) {
    console.error('Error in get method of axios:\n', err.message);
  }
}

getHtml(url).then(html => {
  // 반환되는 Promise 객체를 cheerio를 이용해서 데이터를 가공
  // HTML 문자열을 cheerio 객체로 반환
  const $ = cheerio.load(html.data);
  const $ulList = $('div#webtoon-list ul#webtoon-list-all').children('li'); // children: 해당되는 태그들의 배열을 반환

  // 주의!: JQuery의 Method는 콜백함수로 Arrow function 사용 불가능.
  // 태그 배열을 순회하면서 콜백함수 실행
  $ulList.each(function(i, el) {
    // Error: Request path contains unescaped characters.
    // 해결: 요청 경로에 처리하지 못하는 문자열이 존재하므로 내장 함수인 encodeURI()를 이용
    const url = encodeURI($(this).find('a').attr('href'));

    // 해당되는 인덱스에 정보 저장
    ulList[i] = {
      title: $(this).find('span').text(),
      url: url
    }

    // 해당되는 태그 내 포함된 URL의 HTML을 가져옴
    getHtml(url).then(html => {
      // HTML 문자열을 cheerio 객체로 반환
      const $ = cheerio.load(html.data);
      
      // 해당되는 인덱스에 정보 저장
      ulList[i] = {
        score: $('div.view-comment').text().split(' '),
        comments: $('div.view-comment span.orangered').text(),
        good = $('div.view-content b#wr_good').text(),
        person = $('div.view-comment').text().split(' ').pop().split('/')[0]
      }

      // 출력
      console.log(ulList[i]);
    });
  })
});