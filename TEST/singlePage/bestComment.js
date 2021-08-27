const { productPage } = require('../../controller/apiController/selectors');
const { productPage: controller } = require('../../controller/apiController')

module.exports = async browser => {
  const url = 'https://sosul.network/series/8349/';
  const userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36';

  try {
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.goto(url);
    console.log(await page.evaluate('navigator.userAgent'));

    // code
    const selectors = Object.values(productPage.review);

    const promises = await Promise.all(selectors.map(el => {
      if (el === productPage.review.commentId) return page.$eval(el, e => e.id);
      if (el === productPage.review.rate) return page.$eval(el, e => e.getAttribute('data-rateit-value'));
      return page.$eval(el, e => e.innerHTML);
    }));

    const obj = Object.keys(productPage.review).reduce((obj, t, i) => (obj[t] = promises[i], obj), {});

    console.log(obj);
    ///////


    await page.close();
  } catch (err) {
    console.error(err.message);
  }
}