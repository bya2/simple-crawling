require('dotenv').config();
const puppeteer = require('puppeteer');
const {commentsPage, platformPage, productPage} = require('./controller/apiController');
const fs = require('fs');

const __products = require('./productPages.json');
const userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36';
(async () => {
  
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

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.goto('https://example.com/');
    await page.close();

    //////////////////////////////////////////////////////////
    await Promise.all(_products.map(async el => {
      await Promise.all(el.platforms.map(async el => {
        try {
          // console.log(el.name, el.href, el.name === '카카오페이지');
          // const page = await browser.newPage();
          // await page.setUserAgent(userAgent);
          // await page.goto(el.href);
          // console.log(await page.evaluate('navigator.userAgent'));

          switch (el.name) {
            case '카카오페이지':
              const page = await browser.newPage();
              await page.setUserAgent(userAgent);
              await page.goto(el.href);
              console.log(await page.evaluate('navigator.userAgent'));
              // console.log('start');
              el.info = await platformPage.kakaoPage(page);
              console.log(el);
              await page.waitForTimeout(2000);
              await page.close();
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

          // await page.waitForTimeout(2000);
          // await page.close();
        } catch (err) {
          console.error(err.message);
        }
      }));
    }));
    ///////////////////////////////////////////////////////////////////////////////////

    fs.writeFileSync('platformsInfo11.json', JSON.stringify(_products));


    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();