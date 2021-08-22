// Module
require('dotenv').config();
const puppeteer = require('puppeteer');
const fs = require('fs');

// Controller
const {commentsPage, platformPage, productPage} = require('./controller/apiController');

// Required objects
const __products = require('./productPages.json');
const userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36';

// Deep copy
const deepCopy = obj => {
  if (obj === null || typeof obj !== 'object') return obj;

  const result = Array.isArray(obj) ? [] : {};

  for (const key of Object.keys(obj)) {
    result[key] = deepCopy(obj[key]);
  }

  return obj;
}

const _products = deepCopy(__products);


// TestController
const testController = {
  // Single Page
  singlePage: async (browser, url) => {
    const URL = url;

    try {
      const page = await browser.launch();
      await page.setUserAgent(userAgent);
      await page.goto(URL);
      console.log(await page.evaluate('navigator.userAgent'));

      // code 


      ///////

      await page.close();
    } catch (err) {
      console.error(err.message);
    }
  },

  // Multiple Page
  multiplePage: {
    // List or Array
    list: async (browser, list) => {
      try {
        await Promise.all(list.map(async el => {
          const url = el.href;

          try {
            const page = await browser.newPage();
            await page.setUserAgent(userAgent);
            await page.goto(url);
            console.log(await page.evaluate('navigator.userAgent'));

            // code

            ///////

            await page.close();
          } catch (err) {
            console.error(err.message);
          }
        }))
      } catch (err) {
        console.error(err.message);
      }
    },

    // Nested Object in List
    nestedObjInList: async (browser, list) => {
      try {
        await Promise.all(list.map(async els => {
          await Promise.all(els.map(async el => {
            const url = el.href;
            
            try {
              const page = await browser.newPage();
              await page.setUserAgent(userAgent);
              await page.goto(url);
              console.log(await page.evaluate('navigator.userAgent'));

              // code
              switch (el.name) {
                case '카카오페이지':
                  el.info = await platformPage.kakaoPage(page);
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
              ///////
    
              await page.close(); 
            } catch (err) {
              console.log(err.message);
            }
          }))
        }));

        fs.writeFileSync('platforms_info', JSON.parse())
      } catch (err) {
        console.error(err.message);
      } 
    }
  }
}

(async () => {
  const options = {
    headless: true,
  };

  const url = '';
  const list = '';

  let browser;

  try {
    browser = await puppeteer.launch(options);

    // testController.singlePage(browser, url);
    // testController.multiplePage.list(browser, list);
    testController.multiplePage.nestedObjInList(browser, list);

  } catch (err) {
    console.error(err.message);
  } finally {
    await browser.close();
  }
})();