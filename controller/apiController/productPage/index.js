const { productPage } = require('../../../querySelector');

module.exports = {
  // 해당 작품의 페이지에서 해당 작품이 서비스되는 플랫폼 정보를 스크랩하는 함수

  // **코드 설명**
  // 셀렉터에 대응하는 태그 목록의 HTML을 추출
  // HTML에서 플랫폼의 이름과 링크 정보를 객체로 만들고, 객체로 이루어진 배열 생성
  getPlatforms: async page => {
    const platforms = productPage.product.platforms;

    // const els = await page.$$(platforms);

    // const arr = await Promise.all(els.map(el => page.evaluate(e => ({ name: e.innerHTML, href: e.href }), el)));
    // return arr;

    const arr = await page.evaluate(el => ({ name: el.innerHTML, href: el.href }), await page.$$(platforms));
    return arr;
  
    // const platforms = [];
    // await Promise.all(els.forEach(async el => {
    //   platforms.push(await page.evaluate(e => ({ name: e.innerHTML, href: e.href }), el));
    // }));
    // return platforms;
  },

  // 해당 작품의 페이지에서 가장 공감되는 Comment의 정보를 스크랩하는 함수

  // **코드 설명**
  // 생성된 페이지를 전달받고, 셀렉터마다 map함수를 통해 HTML을 추출
  // 프로미스를 병렬적으로 처리해서 웹 페이지 로딩에 의해 순서에 따라 시간 제약을 받지 않고 배열 생성
  // 셀렉터 키 배열과 프로미스 배열로 reduce함수를 통해 객체 생성
  getBestComment: async page => {
    const review = productPage.review;
    const { commentId, rate } = review;

    const promises = await Promise.all(Object.values(review).map(el => {
      if (el === commentId) return page.$eval(el, e => e.id);
      if (el === rate) return page.$eval(el, e => e.getAttribute('data-rateit-value'));
      return page.$eval(el, e => e.innerHTML);
    }));

    const obj = Object.keys(review).reduce((obj, t, i) => (obj[t] = promises[i], obj), {});
    obj.rate = parseFloat(obj.rate);

    return obj;
  },
}