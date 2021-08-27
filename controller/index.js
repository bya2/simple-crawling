const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const qs = require('../querySelector');
const { commentsPage, productPage, platformPage } = require('./api');

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
    const { _comments, _products, updates } = commentsPage($); // comments info, products info

    await page.close();

  
    // Product page
    const _platformsList = [];

    await Promise.all(_products.map(async (el, i) => {
      try {
        const page = await browser.newPage();
        await page.setUserAgent(userAgent);
        await page.goto(el.href);
        console.log(await page.evaluate('navigator.userAgent'));

        const _platforms = await productPage.getPlatforms(page); // platforms info
        el.platforms = _platforms;
        _platformsList.push(_platforms);
        el.bestComment = await productPage.getBestComment(page); // best comment info

        await page.close();
      } catch (err) {
        console.error(err);
      }
    }));

    // 
    await Promise.all(_products.platforms.map(async (el, i) => {
      try {
        const page = await browser.newPage();
        await page.setUserAgent(userAgent);
        await page.goto(el.href);
        console.log(await page.evaluate('navigator.userAgent'));

        switch (el.name) {
          case '카카오페이지':
            el.assign(await platformPage.kakaoPage(page));
            break;
          case '문피아':
            el.assign(await platformPage.munpia(page));
            break;
          case '네이버시리즈':
            el.assign(await platformPage.naverSeries(page));
            break;
          case '리디북스':
            el.assign(await platformPage.ridibooks(page));
            break;
          default: break;
        }

        await page.close();
      } catch (err) {
        console.error(err);
      }
    }))


    fs.writeFileSync('productPages.json', JSON.stringify(_products));

  } catch (err) {
    console.error(`Error in puppeteer processing:\n${err}`);
  } finally {
    await browser.close();
  }
})();