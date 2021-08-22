const puppeteer = require('puppeteer');
const fs = require('fs');

const __products = require('./productPages.json');
const userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36';
(async () => {
  try {
    const browser = await puppeteer.launch();

    const deepClone = obj => {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }

      const result = Array.isArray(obj) ? [] : {};

      for (const key of Object.keys(obj)) {
        result[key] = deepClone(obj[key]);
      }

      return result;
    }

    const _products = deepClone(__products);

    Promise.all(_products.map(async el => {
      try {

        const page = await browser.newPage();
        await page.setUserAgent(userAgent);
        await page.goto(el.href);
        console.log(await page.evaluate('navigator.userAgent'));

        switch (el.name) {
          case '카카오페이지':
            el.assign(await platformPage.kakaoPage(page));
            break;
          // case '문피아':
          //   el.assign(await platformPage.munpia(page));
          //   break;
          // case '네이버시리즈':
          //   el.assign(await platformPage.naverSeries(page));
          //   break;
          // case '리디북스':
          //   el.assign(await platformPage.ridibooks(page));
          //   break;
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