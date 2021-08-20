const puppeteer = require('puppeteer');

(async () => {
  const url = 'https://series.naver.com/novel/detail.series?productNo=6020546';

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36')

    await page.goto(url);
    console.log(await page.evaluate('navigator.userAgent'));
    await page.waitForTimeout(1000);

    // const avgScoreHandler = await page.$('#content > div.end_head > div.score_area > em');
    // const avgScore = await page.evaluate(e => e.innerHTML, avgScoreHandler);
    
    const productInfo = {
      image: encodeURI(await page.$eval('#container > div > a > img', el => el.src)),
      score: parseFloat(await page.$eval('#content > div.end_head > div.score_area > em', el => el.textContent)),
      prefered: parseInt(await page.$eval('#content > div.end_head > div.user_action_area > ul > li:nth-child(2) > div > a > em', el => el.textContent)),
      comments: parseInt((await page.$eval('#reviewCount', el => el.textContent)).replace(',', '')),
      total: parseInt(await page.$eval('#content > h5 > strong', el => el.textContent))
    }

    await page.waitForTimeout(2000);
    await page.close();
    await browser.close();

    return productInfo;

  } catch (err) {
    console.error(error);
  }
})();