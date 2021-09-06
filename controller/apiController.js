const fs = require('fs');

const models = require('../models');
const selectors = require('./selectors');

const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36';

const apiController = {
  // 모듈
  fs: fs,

  // 모듈 외 필요 파일
  models: models,
  selectors: selectors,

  // 변수
  userAgent: process.env.USER_AGENT || userAgent,

  // 함수
  // TEST OK
  funcGetNewPage: async function (browser, url) {
    const page = await browser.newPage();                       // 페이지 생성
    await page.setUserAgent(this.userAgent);                    // 사용자 에이전트 식별
    await page.goto(url);                                       // 페이지 이동
    console.log(await page.evaluate('navigator.userAgent'));    // 사용자 에이전트 동작 확인
    return page;
  },

  // TEST OK
  funcGetComments: async function ($, els) {
    const elsLen = els.length;

    const cObjs = [];
    let cUp = 0;

    const cpcS = this.selectors.commentsPage.comment;
    const cppS = this.selectors.commentsPage.product;

    for (let i=0, tmpObjs=cObjs, tmpS=cpcS, tmpS2=cppS; i<elsLen; ++i) {
      const el = $(els[i]);

      const cId = el.find(tmpS.commentId).attr('id');
      const isC = await this.models.Comment.findOne({ commentId: cId }) ? true : false;
      if (isC || i === elsLen) break;

      tmpObjs[i] = {
        commentId: cId,
        content: (el.find(tmpS.content) || el.find(tmpS.blurEffect)).html(),
        nickname: el.find(tmpS.nickname).text(),
        rate: parseFloat(el.find(tmpS.rate).attr('data-rateit-value')),
        updated: el.find(tmpS.updated).text(),
        productId: el.find(tmpS2.href).attr('href').split('/')[2],
        title: el.find(tmpS2.title).text(),
      }

      ++cUp;
    }

    this.cObjs = cObjs;
    return cUp;
  },

  // TEST OK
  funcGetProducts: async function ($, els, cUp) {
    const pObjs = [];
    let pUp = 0;

    const cppS = this.selectors.commentsPage.product;

    for (let i=0, tmpObjs=pObjs, tmpS=cppS; i<cUp; ++i) {
      const el = $(els[i]);

      const pHref = el.find(tmpS.href).attr('href');
      const pId = pHref.split('/')[2];
      const isP = await this.models.Product.findOne({ productId: pId }) ? true : false;
      if (isP) continue;

      const [rate, count] = el.find(tmpS.rate).text().split(' ');

      tmpObjs.push({
        author: el.find(tmpS.author).text(),
        categories: el.find(tmpS.categories).text().split(' '),
        count: parseInt(count.replace(/^\(|\)$/g, '')),
        url: encodeURI(`${process.env.HOST || 'http://sosul.network'}${pHref}`),
        image: encodeURI(el.find(tmpS.image).attr('data-src')),
        introduction: el.find(tmpS.introduction).text(),
        productId: pId,
        rate: parseFloat(rate),
        title: el.find(tmpS.title).text(),
      })

      ++pUp;
    }

    this.pObjs = pObjs;
    return pUp;
  },

  // TEST OK
  funcCommentsPage: async function ($) {
    const cpgliS = this.selectors.commentsPage.gridLayout.items;
    const els = $(cpgliS);
    const cUp = await this.funcGetComments($, els);
    const pUp = await this.funcGetProducts($, els, cUp);
    return [cUp, pUp];
  },

  // TEST OK
  funcGetPlatforms: async function (page) {
    const ppppS = this.selectors.productPage.product.platforms;
    const els = await page.$$(ppppS);
    const arr = await Promise.all(els.map(el => page.evaluate(e => ({ name: e.innerHTML, url: e.href }), el)));
    return arr
  },

   // TEST OK
  funcGetBestComment: async function (page) {
    const ppcS = this.selectors.productPage.comment;

    const promises = await Promise.all(Object.values(ppcS).map(el => {
      if (el === ppcS.commentId) return page.$eval(el, e => e.id);
      if (el === ppcS.rate) return page.$eval(el, e => e.getAttribute('data-rateit-value'));
      return page.$eval(el, e => e.innerHTML);
    }));

    const obj = Object.keys(ppcS).reduce((obj, t, i) => (obj[t] = promises[i], obj), {});
    obj.rate = parseFloat(obj.rate);

    return obj;
  },

  // TEST OK
  funcProductPage: async function (browser) {
    const pObjs = this.pObjs;
    const pfArrs = [], bcObjs = [];

    await Promise.all(pObjs.map(async (obj, i) => {
      const page = await this.funcGetNewPage(browser, obj.url);
      pfArrs[i] = await this.funcGetPlatforms(page);
      bcObjs[i] = await this.funcGetBestComment(page);
      await page.close();
    }))
    .catch(err => {
      if (err) {
        return console.error(`Error in funcProductPage:\n${err}`);
      }
      console.log('No error in funcProductPage');
    });

    this.pfArrs = pfArrs;
    this.bcObjs = bcObjs;
  },

  // TEST OK
  funcGetPlatform: async function (page, pf) {
    const promises = await Promise.all(Object.values(pf).map(el => {
      if (el === pf.image) return page.$eval(el, e => e.src);
      return page.$eval(el, e => e.innerHTML);
    }));
    const obj = Object.keys(pf).reduce((obj, t, i) => (obj[t] = promises[i], obj), {});
    return obj;
  },

  // TEST OK
  funcPlatformPage: async function (browser) {
    const ppS = this.selectors.platformPage;
    const names = ['카카오페이지', '문피아', '네이버시리즈', '리디북스'];
    const pfArrs = this.pfArrs;
    const ArrsLen = pfArrs.length;
    for (let i=0,
             ppV=Object.values(ppS),
             tmpNames=names,
             tmpArrs=pfArrs,
             gnp=this.funcGetNewPage,
             gpf=this.funcGetPlatform; i<ArrsLen; ++i) {
      await Promise.all(tmpArrs[i].map(async obj => {
        const page = await this.funcGetNewPage(browser, obj.url);
        const j = tmpNames.findIndex(el => el === obj.name);
        Object.assign(obj, await gpf(page, ppV[j]));
        await page.close();
      }))
      .catch(err => {
        if (err) {
          return console.error(`Error in funcPlatformPage:\n${err}`);
        }
      })
    }
  },

  // TEST OK
  funcWriteJSON: function (pUp) {
    for (let i=0, pObjs=this.pObjs, bcObjs=this.bcObjs, pfArrs=this.pfArrs; i<pUp; ++i) {
      pObjs[i].bestComment = bcObjs[i];
      pObjs[i].platform = pfArrs[i];
    }

    fs.writeFileSync('./TEST/temp/tmpCObjs.json', JSON.stringify(this.cObjs));
    fs.writeFileSync('./TEST/temp/tmpPObjs.json', JSON.stringify(this.pObjs));
  },

  // TEST OK
  funcSaveDocs: function (cUp, pUp) {
    for (let i=0,
             objs=this.cObjs,
             Model=this.models.Comment; i<cUp; ++i) {
      const doc = new Model(objs[i]);
      doc.save(err => err ? console.error(err.message) : console.log(`cObj saved in Mongo.`))
    }

    for (let i=0,
             objs=this.pObjs,
             Model=this.models.Product; i<pUp; ++i) {
      const doc = new Model(objs[i]);
      doc.save(err => err ? console.error(err.message) : console.log(`pObj saved in Mongo.`))
    }
  },
}

module.exports = apiController;