const fs = require('fs');

const models = require('../models');
const selectors = require('./selectors');

const apiController = {
  fs: fs,
  models: models,
  selectors: selectors,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36',

  // 브라우저에 새로운 페이지를 생성
  // 사용자 에이전트 식별
  // URL로 이동
  fnGetNewPage: async function (browser, url) {
    const page = await browser.newPage();
    await page.setUserAgent(this.userAgent);
    await page.goto(url);
    console.log(await page.evaluate('navigator.userAgent'));
    // await page.waitForSelector(this.selector, { timeout: 10000 });
    return page;
  },

  // 코멘트 정보들 가져오기
  // 작품 정보 추출을 위해서 코멘트 업데이트된 수 반환
  fnGetComments: async function (els) {
    const elsLen = els.length;
    const commentObjs = [];
    let commentUp = 0;

    for (let i=0; i<elsLen; i+=1) {
      const el = $(els[i]);

      const commentId = el.find(this.selectors.commentsPage.comment.commentId).attr('id');
      const isComment = await this.models.Comment.findOne({ commentId: commentId });
      if (isComment) break; // 전에 스크랩한 최신 리뷰까지 왔으므로, 스크랩 중지

      const content = el.find(this.selectors.commentsPage.comment.content) || el.find(this.selectors.commentsPage.comment.blurEffect);
      const href = el.find(this.selectors.commentsPage.product.href).attr('href');

      commentObjs[i] = {
        commentId: commentId,
        content: content.html(),
        nickname: el.find(this.selectors.commentsPage.comment.nickname).text(),
        rate: parseFloat(el.find(this.selectors.commentsPage.comment.rate).attr('data-rateit-value')),
        updated: el.find(this.selectors.commentsPage.comment.updated).text(),
        productURL: encodeURI(`${process.env.HOST || 'https://sosul.network'}${href}`),
      }

      commentUp += 1;
    }

    this.commentObjs = commentObjs;
    return commentUp;
  },

  // 코멘트 정보가 업데이트된 만큼 작품 정보를 가져오기.
  fnGetProducts: async function (els, commentUp) {
    const productObjs = [];
    let productUp = 0;

    for (let i=0; i<commentUp; i+=1) {
      const el = $(els[i]);

      const productId = el.find(this.selectors.commentsPage.product.href).attr('href').split('/')[2];
      const isProduct = await this.models.Product.findOne({ productId: productId });
      if (isProduct) continue;

      const [rate, count] = el.find(this.selectors.commentsPage.product.rate).text().split(' ');

      productObjs.push({
        author: el.find(this.selectors.commentsPage.product.author).text(),
        categories: el.find(this.selectors.commentsPage.product.categories).text().split(','),
        count: parseInt(count.replace(/^\(|\)$/g, '')),
        url: encodeURI(el.find(this.selectors.commentsPage.product.categories)),
        image: encodeURI(el.find(this.selectors.commentsPage.product.image).attr('data-src')),
        introduction: el.find(this.selectors.commentsPage.product.introduction).text(),
        productId: productId,
        rate: parseFloat(rate),
        title: el.find(this.selectors.commentsPage.product.title).text(),
      })

      productUp += 1;
    }

    this.productObjs = productObjs;
    return productUp;
  },

  // COMMENTS 페이지에서 코멘트 정보, 작품 정보들 가져오기
  fnCommentsPage: async function ($) {
    const els = $(this.selectors.commenetsPage.gridLayout.items);

    const commentUp = await this.fnGetComments(els);
    const productUp = await this.fnGetProducts(els, commentUp);

    // 코멘트 정보 데이터베이스 저장?
    this.commentObjs.forEach(el => {
      const commentDoc = new this.models.Comment(el);
      commentDoc.save(err => err ? console.error(err.message) : console.log(`Comment's info saved in DB.`));
    });
    // 작품 정보는 세부적으로 더 가져올 예정이므로 나중에.

    return [commentUp, productUp];
  },

  // 작품 페이지에서 플랫폼들의 정보 가져오기
  fnGetPlatforms: async function (page) {
    const els = await page.$$(this.selectors.productPage.product.platforms);
    const arr = await Promise.all(els.map(el => page.evaluate(e => ({ name: e.innerHTML, url: e.href }), el)));
    return arr
  },

  // 작품 페이지에서 베스트 코멘트의 정보 가져오기
  fnGetBestComment: async function (page) {
    const comment = this.selectors.productPage.comment;

    const promises = await Promise.all(Object.values(comment).map(el => {
      if (el === comment.commentId) return page.$eval(el, e => e.id);
      if (el === comment.rate) return page.$eval(el, e => e.getAttribute('data-rateit-value'));
      return page.$eval(el, e => e.innerHTML);
    }));

    const obj = Object.keys(comment).reduce((obj, t, i) => (obj[t] = promises[i], obj), {});
    obj.rate = parseFloat(obj.rate);

    return obj;
  },

  fnProductPage: async function (browser) {
    const objs = this.productObjs;

    const platformInfos = [], bestComments = [];

    await Promise.all(objs.map(async (obj, i) => {
      const page = await this.fnGetNewPage(browser, obj.url);

      platformInfos[i] = await this.fnGetPlatforms(page);
      bestComments[i] = await this.fnGetBestComment(page);

      await page.close();
    })).catch(err => err ? console.error(`Error in fnProductPage:\n${err}`) : console.log('fnProductPage OK.'));

    this.platformInfos = platformInfos;
    this.bestComments = bestComments;
  },

  // 인덱스로 해당되는 플랫폼 정보 스크랩
  fnGetPlatform: async function (page, idx) {
    const pSelectors = [
      this.selectors.platformPage.kakaoPage,
      this.selectors.platformPage.munpia,
      this.selectors.platformPage.naverSeries,
      this.selectors.platformPage.ridibooks
    ]

    const promises = await Promise.all(Object.values(pSelectors[idx]).map((el => {
      if (el === pSelectors[idx].image) return page.$eval(el, e => e.src);
      return page.$eval(el, e => e.innerHTML);
    })));

    const obj = Object.keys(pSelectors[idx]).reduce((obj, t, i) => (obj[t] = promises[i], obj), {});
  },

  //
  fnPlatformPage: async function (browser) {
    const pList = ['카카오페이지', '문피아', '네이버시리즈', '리디북스'];

    const infosLen = this.platformInfos.length;
    for (let i=0; i<infosLen; i+=1) {
      const tmpPList = pList;
      await Promise.all(this.platformInfos[i].map(async obj => {
        const page = await this.fnGetNewPage(browser, obj.url);

        const idx = tmpPList.findIndex(el => el === obj.name);
        Object.assign(obj, await this.fnGetPlatform(page, idx));

        await page.close();
      }))
    }
  }
}

(async () => {
  const browser = await puppeteer
})();

module.exports = apiController;