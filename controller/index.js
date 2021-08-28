const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const selectors = require('./apiController/selectors');
const { commentsPage, productPage, platformPage } = require('./apiController');
const { getPlatforms, getBestComment } = productPage;
const { getKakaoPage, getMunpia, getNaverSeries, getRidibooks } = platformPage;

const db = require('../db');
const { Product } = require('../models')

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
    // 페이지 생성
    // 크롤링 권한을 얻기 위해 User-Agent 설정
    // URL로 페이지 이동
    // User-Agent 작동 확인
    // 셀렉터에 해당하는 브라우저 상 HTML의 로딩 지연에 대해 시간 제한을 설정
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.goto(url);
    console.log(await page.evaluate('navigator.userAgent'));
    await page.waitForSelector(selectors.commentsPage.gridLayout.items, { timeout: 10000 }); // 시간제한: 10초

    // 페이지에서 Content를 변수에 저장
    // Cheerio 객체를 생성
    // 최신 리뷰와 해당 작품에 대한 정보 스크랩
    const content = await page.content();
    const $ = cheerio.load(content);
    const productObjs = await commentsPage($);

    // 페이지 닫기
    await page.close();

    console.log(productObjs);
    fs.writeFileSync('commentsPageObjs.json', JSON.stringify(productObjs));

  
    // // // PRODUCT PAGE // // //
    // 해당 작품의 플랫폼 정보와 베스트 리뷰에 대한 정보 스크랩
    // 로딩 지연을 위한 병렬 처리
    await Promise.all(productObjs.map(async obj => {
      // 각 작품마다 페이지 작업
      const page = await browser.newPage();
      await page.setUserAgent(userAgent);
      await page.goto(obj.url);
      console.log(await page.evaluate('navigator.userAgent'));
      // 디폴트: 시간제한 30초

      // 플랫폼 정보를 obj.platforms에 열거
      // 베스트 코멘트 정보를 객체에 저장
      obj.platforms = {};
      Object.assign(obj.platforms, await getPlatforms(page));
      obj.bestComment = await getBestComment(page);

      // 페이지 닫기
      await page.close();
    })).catch(err => err ? console.error(`Error in PRODUCT PAGE:\n${err}`) : console.log(`All promise of 'PRODUCT PAGE' resolves.`));

    console.log(productObjs);
    fs.writeFileSync('productPageObjs.json', JSON.stringify(productObjs));

    
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
              Object.assign(obj, await getKakaoPage(page));
              break;
            case '문피아':
              Object.assign(obj, await getMunpia(page));
              break;
            case '네이버시리즈':
              Object.assign(obj, await getNaverSeries(page));
              break;
            case '리디북스':
              Object.assign(obj, await getRidibooks(page));
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

    console.log(productObjs);
    fs.writeFileSync('platformsPageObjs.json', JSON.stringify(productObjs));

    productObjs.forEach(el => {
      const productDoc = new Product(el);
      productDoc.save(err => err ? console.error(err.message) : console.log(`Product's info saved in DB.`));
    })

  } catch (err) {
    console.error(`Error in puppeteer processing:\n` + err);
  } finally {
    // 브라우저 종료
    await browser.close();
  }
})();