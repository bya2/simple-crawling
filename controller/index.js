const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const selectors = require('./apiController/selectors');
const { commentsPage, productPage, platformPage } = require('./apiController');

const db = require('../db');
const models = require('../models')

// // // CREATE NEW PAGE // // //
// 중복을 줄일 수 있으면 적용
async function _fn_newPage(browser) {
  const userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36';

  const page = await browser.newPage(); // 해당 페이지 UserAgent 설정
  await page.setUserAgent(userAgent);
  await page.goto(this.url); 
  console.log(await page.evaluate('navigator.userAgent')); // UserAgent 작동에 대해서 콘솔에서 확인
  // await page.waitForSelector(this.selector, { timeout: 10000 }); // 페이지 작업 지연에 대해 시간 제한 설정

  return page;
}


// // // COMMENTS PAGE // // //
const _fn_commentsPage = async (browser, url) => {
  try {
    const page = await _fn_newPage(browser, url);

    const content = await page.content();
    const $ = cheerio.load(content);
    const commentsPageObjs = await commentsPage($);

    await page.close();

    return commentsPageObjs;
  } catch (err) {
    console.error(`Error in _fn_commentsPage:\n${err}`);
  }
}

// // // PRODUCT PAGE // // //
// 해당 작품의 플랫폼 정보와 베스트 리뷰에 대한 정보 스크랩
const _fn_productPage = async (browser, objs) => {
  await Promise.all(objs.map(async obj => {
    const page = await _fn_newPage(browser, obj.url);

    obj.platform = {}.assign(await productPage.getPlatforms(page)); // obj로 이루어진 arr를 빈 obj에 열거
    obj.bestComment = await productPage.getBestComment(page);

    await page.close();
  })).catch(err => err ? console.error(`Error in _fn_productPage:\n${err}`) : console.log('_fn_productPage OK.'));
}

const _fn_platformPage = async (browser, objs) => {
  const len = objs.length;
  for (let i = 0; i < len; i += 1) {
    await Promise.all(Object.values(objs[i].platforms).map(async obj => {
      const page = await _fn_newPage(browser, obj.url);

      switch (obj.name) {
        case '카카오페이지':
          Object.assign(obj, await platformPage.getKakaoPage(page));
          break;
        case '문피아':
          Object.assign(obj, await platformPage.getMunpia(page));
          break;
        case '네이버시리즈':
          Object.assign(obj, await platformPage.getNaverSeries(page));
          break;
        case '리디북스':
          Object.assign(obj, await platformPage.getRidibooks(page));
          break;
        default:
          break;
      }

      await page.close();
    })).catch(err => err ? console.error(`Error in _fn_platformPage:\n${err}`) : console.log('_fn_platformPage OK.'));
  }
}

(async () => {
  const url = process.env.TARGET || 'https://sosul.network/series/comments/';
  const userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36';

  let browser;

  try {
    // 브라우저 실행
    browser = await puppeteer.launch({
      headless: true, // 백그라운드에서 실행
    });

    // // // COMMENTS PAGE // // //
    const commentsPageObjs = await _fn_commentsPage(broswer, url, userAgent);
    const { commentObjs, productObjs, commentUp, productUp } = commentsPageObjs;

    // 콘솔 및 JSON 파일로 데이터 임시 저장 (테스트용)
    console.log(commentsPageObjs);
    fs.writeFileSync('./TEST/temp/commentsPageObjs.json', JSON.stringify(commentsPageObjs));
    fs.writeFileSync('./TEST/temp/commentObjs.json', JSON.stringify(commentObjs));
  
    // // // PRODUCT PAGE // // //
    await _fn_productPage(browser, productObjs, userAgent);

    // 콘솔 및 JSON 파일로 데이터 임시 저장 (테스트용)
    console.log(productObjs);
    fs.writeFileSync('./TEST/temp/productPageObjs.json', JSON.stringify(productObjs));

    
    // // // PLATFORM PAGE // // //
    // 각 플랫폼에서 핵심 정보를 스크랩
    for (const productObj of productObjs) {
      // 이중 배열을 생성하고 내부 배열에서 map
      await Promise.all(Object.values(productObj.platforms).map(async obj => {
        try {
          const page = await browser.newPage();
          await page.setUserAgent(userAgent);
          await page.goto(obj.url);
          console.log(await page.evaluate('navigator.userAgent'));

          // 플랫폼에서 연령 제한이 19금이라 로그인이 필요하거나, 기간이 만료된 작품이 있을 수 있음.
          // 위와 같은 작품들은 객체에 name과 url 프로퍼티를 제외하고 저장되지 않음.
          switch (obj.name) {
            case '카카오페이지':
              Object.assign(obj, await platformPage.getKakaoPage(page));
              break;
            case '문피아':
              Object.assign(obj, await platformPage.getMunpia(page));
              break;
            case '네이버시리즈':
              Object.assign(obj, await platformPage.getNaverSeries(page));
              break;
            case '리디북스':
              Object.assign(obj, await platformPage.getRidibooks(page));
              break;
            default:
              break;
          };

          await page.close();
        } catch (err) {
          console.error(`Error in PLATFORM PAGE:\n${err}`);
        }
      }));
    }


    // 콘솔 및 JSON 파일로 데이터 임시 저장 (테스트용)
    console.log(productObjs);
    fs.writeFileSync('./TEST/temp/platformsPageObjs.json', JSON.stringify(productObjs));

    productObjs.forEach(el => {
      const productDoc = new models.Product(el);
      productDoc.save(err => err ? console.error(err.message) : console.log(`Product's info saved in DB.`));
    })

  } catch (err) {
    console.error(`Error in puppeteer processing:\n` + err);
  } finally {
    // 브라우저 종료
    await browser.close();
  }
})();