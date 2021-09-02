const fs = require('fs');

const models = require('../models');
const selectors = require('./selectors');

const userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36';

const apiController = {
  // 모듈
  fs: fs,

  // 모듈 외 필요 파일
  models: models,
  selectors: selectors,

  // 변수
  userAgent: userAgent,

  // 함수
  funcGetNewPage: async function (browser, url) {
    console.log('1-0');
    const page = await browser.newPage();                 // 페이지 생성
    await page.setUserAgent(this.userAgent);              // 사용자 에이전트 식별
    await page.goto(url);                                 // 페이지 이동
    console.log('1-1');
    const navi = page.evaluate('navigator.userAgent');    // 사용자 에이전트 동작 확인
    console.log(navi);
    console.log('1-2');
    return page;
  },

  // 코멘트 정보들 가져오기
  // 작품 정보 추출을 위해서 코멘트 업데이트된 수 반환
  funcGetComments: async function ($, els) {
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
    this.fs.writeFileSync('./TEST/temp/commentObjs.json', JSON.stringify(this.commentObjs));
    return commentUp;
  },

  // 코멘트 정보가 업데이트된 만큼 작품 정보를 가져오기.
  funcGetProducts: async function ($, els, commentUp) {
    const productObjs = [];
    let productUp = 0;

    for (let i=0; i<commentUp; i+=1) {
      const el = $(els[i]);

      const href = el.find(this.selectors.commentsPage.product.href).attr('href')
      const productId = href.split('/')[2];
      const isProduct = await this.models.Product.findOne({ productId: productId });
      if (isProduct) continue;

      const [rate, count] = el.find(this.selectors.commentsPage.product.rate).text().split(' ');

      productObjs.push({
        author: el.find(this.selectors.commentsPage.product.author).text(),
        categories: el.find(this.selectors.commentsPage.product.categories).text().split(','),
        count: parseInt(count.replace(/^\(|\)$/g, '')),
        url: encodeURI(`${process.env.HOST || 'https://sosul.network'}${href}`),
        image: encodeURI(el.find(this.selectors.commentsPage.product.image).attr('data-src')),
        introduction: el.find(this.selectors.commentsPage.product.introduction).text(),
        productId: productId,
        rate: parseFloat(rate),
        title: el.find(this.selectors.commentsPage.product.title).text(),
      })

      productUp += 1;
    }

    this.productObjs = productObjs;
    this.fs.writeFileSync('./TEST/temp/productObjs.json', JSON.stringify(this.productObjs));
    return productUp;
  },

  // COMMENTS 페이지에서 코멘트 정보, 작품 정보들 가져오기
  funcCommentsPage: async function ($) {
    console.log('2-0');
    const els = $(this.selectors.commentsPage.gridLayout.items);
    console.log('2-1');
    const commentUp = await this.funcGetComments($, els);
    console.log('2-2');
    const productUp = await this.funcGetProducts($, els, commentUp);

    console.log('2-3');
    // 코멘트 정보 데이터베이스 저장
    this.commentObjs.forEach(el => {
      const commentDoc = new this.models.Comment(el);
      commentDoc.save(err => err ? console.error(err.message) : console.log(`Comment's info saved in DB.`));
    });

    // 작품 정보 데이터베이스 저장
    this.productObjs.forEach(el => {
      const commentDoc = new this.models.Comment(el);
      commentDoc.save(err => err ? console.error(err.message) : console.log(`Comment's info saved in DB.`));
    });
    console.log('2-4');

    return [commentUp, productUp];
  },

  // 작품 페이지에서 플랫폼들의 정보 가져오기
  funcGetPlatforms: async function (page) {
    console.log('3-0-1-0');
    const els = await page.$$(this.selectors.productPage.product.platforms);
    console.log('3-0-1-1');
    const arr = await Promise.all(els.map(el => page.evaluate(e => ({ name: e.innerHTML, url: e.href }), el)));
    return arr
  },

  // 작품 페이지에서 베스트 코멘트의 정보 가져오기
  funcGetBestComment: async function (page) {
    console.log('3-0-2-0');
    const comment = this.selectors.productPage.comment;

    const promises = await Promise.all(Object.values(comment).map(el => {
      if (el === comment.commentId) return page.$eval(el, e => e.id);
      if (el === comment.rate) return page.$eval(el, e => e.getAttribute('data-rateit-value'));
      return page.$eval(el, e => e.innerHTML);
    }));
    console.log('3-0-2-1');

    const obj = Object.keys(comment).reduce((obj, t, i) => (obj[t] = promises[i], obj), {});
    obj.rate = parseFloat(obj.rate);

    return obj;
  },

  funcProductPage: async function (browser) {
    console.log('3-0');
    const objs = this.productObjs;

    const platformInfos = [], bestComments = [];

    console.log(this.productObjs);

    await Promise.all(objs.map(async (obj, i) => {
      console.log('3-0-0');
      const page = await this.funcGetNewPage(browser, obj.url);
      console.log('3-0-1');
      platformInfos[i] = await this.funcGetPlatforms(page);
      console.log('3-0-2');
      bestComments[i] = await this.funcGetBestComment(page);
      console.log('3-0-3');
      await page.close();
    })).catch(err => err ? console.error(`Error in fnProductPage:\n${err}`) : console.log('fnProductPage OK.'));
    console.log('3-1');

    this.platformInfos = platformInfos;
    this.bestComments = bestComments;
    this.fs.writeFileSync('./TEST/temp/platformInfos.json', JSON.stringify(this.platformInfos));
    this.fs.writeFileSync('./TEST/temp/bestComments.json', JSON.stringify(this.bestComments));
  },

  // 인덱스로 해당되는 플랫폼 정보 스크랩
  funcGetPlatform: async function (page, idx) {
    console.log('4-0-1-1--1');
    const pSelectors = [
      this.selectors.platformPage.kakaoPage,
      this.selectors.platformPage.munpia,
      this.selectors.platformPage.naverSeries,
      this.selectors.platformPage.ridibooks
    ]
    console.log('4-0-1-1--2');
    const promises = await Promise.all(Object.values(pSelectors[idx]).map((el => {
      if (el === pSelectors[idx].image) return page.$eval(el, e => e.src);
      return page.$eval(el, e => e.innerHTML);
    })));
    console.log('4-0-1-1--3');
    const obj = Object.keys(pSelectors[idx]).reduce((obj, t, i) => (obj[t] = promises[i], obj), {});
    console.log('4-0-1-1--4');
    return obj;
  },

  //
  funcPlatformPage: async function (browser) {
    console.log('4-0');
    const pList = ['카카오페이지', '문피아', '네이버시리즈', '리디북스'];
    const infosLen = this.platformInfos.length;
    for (let i=0; i<infosLen; i+=1) {
      const tmpPList = pList;
      console.log('4-0-0');
      await Promise.all(this.platformInfos[i].map(async obj => {
        console.log('4-0-1-0');
        const page = await this.funcGetNewPage(browser, obj.url);
        console.log('4-0-1-1');
        const idx = tmpPList.findIndex(el => el === obj.name);
        console.log('4-0-1-2', obj, idx, tmpPList[idx]);
        Object.assign(obj, await this.funcGetPlatform(page, idx));
        console.log('4-0-1-3');
        await page.close();
      })).catch(err => err ? console.error(`Error in funcPlatformPage promises:\n${err}`) : console.log('funcPlatformPage promises OK.'));
    }
    console.log('4-1');
    this.fs.writeFileSync('./TEST/temp/platformInfos.json', JSON.stringify(this.platformInfos));
  },

  funcWriteJSON: function () {
    this.fs.writeFileSync('./TEST/temp/commentObjs.json', JSON.stringify(this.commentObjs));
    this.fs.writeFileSync('./TEST/temp/productObjs.json', JSON.stringify(this.productObjs));
    this.fs.writeFileSync('./TEST/temp/platformInfos.json', JSON.stringify(this.platformInfos));
    this.fs.writeFileSync('./TEST/temp/bestComments.json', JSON.stringify(this.bestComments));
  },

  funcSaveDocs: function () {
    const oList = [this.commentObjs, this.productObjs, this.bestComments, this.platformInfos];
    const mList = [this.models.Comment, this.models.Product, this.models.BestComment, this.models.PlatformInfo]
    const len = oList.length;

    for (let i=0; i<len; i+=1) {
      const tmpMList = mList;
      oList[i].forEach(el => {
        const doc = new tmpMList[i](el);
        doc.save(err => err ? console.error(err.message) : console.log(`Info's saved in DB`));
      });
      console.log(`ok ${i}`);
    }
  }
}

module.exports = apiController;