const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const apiController = require('../controller/apiController');
const db = require('../db');

const scrapContextObj = {
  // 모듈
  puppeteer: puppeteer,
  cheerio: cheerio,
  fs: fs,

  // 모듈 외 필요 파일
  apiController: apiController,

  funcLaunchBrowser: async function () {
    const url = process.env.TARGET || 'https://sosul.network/series/comments/';

    let browser;

    try {
      browser = await this.puppeteer.launch();                          // 브라우저 시작

      const page = await this.apiController.funcGetNewPage(browser, url);
      const content = await page.content();
      const $ = cheerio.load(content);
      const [cUp, pUp] = await this.apiController.funcCommentsPage($);  // 리뷰 페이지
      await this.apiController.funcProductPage(browser);                // 작품 페이지
      await this.apiController.funcPlatformPage(browser);               // 서비스 플랫폼 페이지
      this.apiController.funcWriteJSON(pUp);                            // JSON 작성
      this.apiController.funcSaveDocs(cUp, pUp);                        // MongoDB 저장
    } catch (err) {
      console.error(`Error in funcLaunchBrowser:\n${err}`);
    } finally {
      await browser.close();
    }
  }
};

(async function () {
  await scrapContextObj.funcLaunchBrowser();
})();