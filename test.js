const puppeteer = require('puppeteer');
const fs = require('fs');

const _products = require('./productPages.json');

(async() => {
  try {
    const browser = await puppeteer.launch();

    Promise.all(_products.map(el => {
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

        await page.waitForTimeout(2000);
        await page.close();
      } catch (err) {
        console.error(err);
      }
    }));

    fs.writeFileSync('platformsInfo.json', JSON.stringify(_products.platforms));

    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();