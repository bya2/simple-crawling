const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const apiController = require('../controller/apiController');

const db = require('../db');

const scrap = {
  puppeteer: puppeteer,
  apiController: apiController,
  url = process.env.TARGET || 'https://sosul.network/series/comments/',

  fnLaunchBrowser: async function () {
    const browser = await this.puppeteer.launch();
    const page = await this.apiController.fnGetNewPage(browser, this.url);

    const content = await page.content();
    const $ = cheerio.load(content);
    const commentsPageObjs = await commentsPage($);

    const [commentup, productUp] = await this.apiController.fnCommentsPage($);
    await this.apiContorller.fnProductPage(browser);
    await this.apiContorller.fnPlatformPage(browser);

    return browser;
  },
}

(async function () {
  await fnLaunchBrowser()
        .catch(err => {
          if (err) return console.error(`Error in fnLaunchBrowser:\n${err}`);
          return console.log('Launch browser.');
        })
        .then(browser => {
          await browser.close();
        })
})();