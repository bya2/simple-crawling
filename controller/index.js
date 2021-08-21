const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const qs = require('../querySelector');
const { commentsPage, productPage } = require('./apiController');

(async () => {
  const URL = process.env.TARGET || 'https://sosul.network/series/comments/';
  const userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36';

  const options = {
    headless: true,
  }

  let browser;

  try {
    browser = await puppeteer.launch(options);

    const page = await browser.newPage();

    await page.setUserAgent(userAgent);
    await page.goto(URL);
    console.log(await page.evaluate('navigator.userAgent'));
    await page.waitForSelector(qs.commentsPage.gridLayout.item, { timeout: 1000 });

    const content = await page.content();
    const $ = cheerio.load(content);
    const commentsInfo = commentsPage($);

    await page.waitForTimeout(2000);
    await page.close();

    for (const _products of commentsInfo) {
    }

    const platforms = await productPage(page);
    console.log(platforms);


    await page.waitForTimeout(3000);
    await page.close();
  } catch (err) {
    console.error(`Error in puppeteer processing:\n${err}`);
  } finally {
    await browser.close();
  }
})();