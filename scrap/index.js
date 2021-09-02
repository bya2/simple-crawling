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
    console.log(0);
    const url = process.env.TARGET || 'https://sosul.network/series/comments/';

    let browser;

    try {
      browser = await this.puppeteer.launch();
      console.log(1);
      // 리뷰 페이지
      const page = await this.apiController.funcGetNewPage(browser, url);
      const content = await page.content();
      const $ = cheerio.load(content);
      await this.apiController.funcCommentsPage($);
      console.log(2);
      // 작품 페이지
      await this.apiController.funcProductPage(browser);
      console.log(3);
      // 서비스 플랫폼 페이지
      await this.apiController.funcPlatformPage(browser);
      console.log(4);
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