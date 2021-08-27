const { platformPage } = require('../../../querySelector');

module.exports = {
  /**
   * 코드 설명
   * 1. 생성된 페이지를 전달받고, 셀렉터마다 map함수를 통해 HTML을 추출
   * 2. 프로미스를 병렬적으로 처리해서 웹 페이지 로딩에 의해 순서에 따라 시간 제약을 받지 않고 배열 생성
   * 3. 셀렉터 키 배열과 프로미스 배열로 reduce함수를 통해 객체 생성 
   */

  // KAKAO PAGE에서 해당 작품의 정보를 스크랩하는 함수
  getKakaoPage: async page => {
    const kakaoPage = platformPage.kakaoPage;

    try {
      // 추출할 정보: comments, status, views
      const promises = await Promise.all(Object.values(kakaoPage).map(el => page.$eval(el, e => e.innerHTML)));
      const obj = Object.keys(kakaoPage).reduce((obj, t, i) => (obj[t] = promises[i], obj), {});

      return obj;
    } catch (err) {
      console.error(`Error in Kakao Page:\n${err.message}`);
    }
  },

  // MUNPIA에서 해당 작품의 정보를 스크랩하는 함수
  getMunpia: async page => {
    const munpia = platformPage.munpia;
    const { bigImage, image } = munpia;

    try {
      // 추출할 정보: bigImage, characters, image, isCompleted, preferred, recommended, registered, serials, updated, views
      const promises = await Promise.all(Object.values(munpia).map(el => {
        if (el === bigImage || el === image) return page.$eval(el, e => e.src);
        return page.$eval(el, e => e.innerHTML);
      }))

      const obj = Object.keys(kakaoPage).reduce((obj, t, i) => (obj[t] = promises[i], obj), {});
      return obj;
    } catch (err) {
      console.error(`Error in munpia:\n${err.message}`);
    }
  },

  // NAVER SERIES에서 해당 작품의 정보를 스크랩하는 함수
  getNaverSeries: async page => {
    const naverSeries = platformPage.naverSeries;
    const { image } = naverSeries;

    try {
      // 추출할 정보: comments, image, preferred, rate, total
      const promises = await Promise.all(Object.values(naverSeries).map(el => {
        if (el === image) return page.$eval(el, e => e.src);
        return page.$eval(el, e => e.innerHTML);
      }))

      const obj = Object.keys(naverSeries).reduce((obj, t, i) => (obj[t] = promises[i], obj), {});
      return obj;
    } catch (err) {
      console.error(`Error in munpia:\n${err.message}`);
    }
  },

  // RIDIBOOKS에서 해당 작품의 정보를 스크랩하는 함수
  getRidibooks: async page => {
    const ridibooks = platformPage.ridibooks;

    try {
      // 추출할 정보: ISBN, comments, comments_purchaser, image, participants, preferred, published_date, rate
      const promises = await Promise.all(Object.values(ridibooks).map(el => page.$eval(el, e => e.innerHTML)));
      const obj = Object.keys(ridibooks).reduce((obj, t, i) => (obj[t] = promises[i], obj), {});

      return obj;
    } catch (err) {
      console.error(`Error in munpia:\n${err.message}`);
    }
  }
}