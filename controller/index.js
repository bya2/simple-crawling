const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

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

    // Comments page
    await page.setUserAgent(userAgent);
    await page.goto(URL);
    console.log(await page.evaluate('navigator.userAgent'));
    await page.waitForSelector(qs.commentsPage.gridLayout.items, { timeout: 1000 });

    const content = await page.content();
    const $ = cheerio.load(content);
    const { _comments, _products, updates } = commentsPage($);

    await page.waitForTimeout(2000);
    await page.close();

  
    // Product page
    await Promise.all(_products.map(async (e, i) => {
      try {
        const page = await browser.newPage();
        await page.setUserAgent(userAgent);
        await page.goto(e.href);
        console.log(await page.evaluate('navigator.userAgent'));

        e.platforms = await productPage.getPlatforms(page);
        e.bestComment = await productPage.getBestComment(page);

        await page.waitForTimeout(2000);
        await page.close();
      } catch (err) {
        console.error(err);
      }
    }));


    fs.writeFileSync('productPages.json', JSON.stringify(_products));

  } catch (err) {
    console.error(`Error in puppeteer processing:\n${err}`);
  } finally {
    await browser.close();
  }
})();