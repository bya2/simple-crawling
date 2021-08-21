const fs = require('fs');
const puppeteer = require('puppeteer');

const qs = require('./querySelector');
const commentsPage = require('./page/commentsPage');
const seriesPage = require('./page/seriesPage');

(async () => {
  const url = process.env.TARGET_URL || `${process.env.HOST || 'https://sosul.network'}/series/comments/`;
  const options = {
    headless: true,
  }

  let browser;

  try {
    browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    await page.setUserAgent(process.env.USER_AGENT || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36');

    await page.goto(url);
    console.log(await page.evaluate('navigator.userAgent'));
    await page.waitForSelector(qs.comments.gridLayout.items, { timeout: 10000 });

    commentsPage(page)
      .then(result => {
        console.log(result);
      })
      .catch(err => console.error(`Error in comments page:\n${err.message}`));

    await page.waitForTimeout(3000);
    await page.close();
  } catch (err) {
    console.error(`Error in processing:\n${err.message}`);
  } finally {
    await browser.close();
  }
})();