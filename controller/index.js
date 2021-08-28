const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const db = require('../db');

const selectors = require('./apiController/selectors');
const { commentsPage, productPage, platformPage } = require('./api');
const { getPlatforms, getBestComment } = productPage;
const { getKakaoPage, getMunpia, getNaverSeries, getRidibooks } = platformsPage;

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
    // 셀렉터에 해당하는 HTML이 브라우저 상에서 로딩이 될 때까지 기다리고, 시간 제한을 설정
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.goto(url);
    console.log(await page.evaluate('navigator.userAgent'));
    await page.waitForSelector(selectors.commentsPage.gridLayout.items, { timeout: 1000 });

    // 페이지에서 Content를 변수에 저장
    // Cheerio 객체를 생성
    // 최신 리뷰와 해당 작품에 대한 정보 스크랩
    const content = await page.content();
    const $ = cheerio.load(content);
    const { comments, products, commentUp, productUp } = await commentsPage($);

    // 페이지 닫기
    await page.close();

  
    // // // PRODUCT PAGE // // //
    // 해당 작품의 플랫폼 정보와 베스트 리뷰에 대한 정보 스크랩
    const objList = await Promise.all(products.map(async (product, i) => {
      // 각 작품마다 페이지 작업
      const page = await browser.newPage();
      await page.setUserAgent(userAgent);
      await page.goto(product.url);
      console.log(await page.evaluate('navigator.userAgent'));
      await page.waitForSelector(selectors.productPage.product.platforms, { timeout: 1000 });
      
      // 플랫폼 정보와 베스트 리뷰 정보를 객체에 저장
      const obj = {
        platforms: await getPlatforms(page),
        bestComment: await getBestComment(page),
      }

      await page.close();

      return obj;
    }));

    // PRODUCT 객체에 해당 프로퍼티들을 할당
    objList.forEach((el, i) => {
      product[i].assign(el.platforms);
      product[i].assign(el.bestComment);
    })

    // // // PLATFORM PAGE // // //
    // 각 플랫폼에서 핵심 정보를 스크랩
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
    // 브라우저 종료
    await browser.close();
  }
})();