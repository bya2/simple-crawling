const { getPlatforms } = require('../../controller/apiController/productPage');
const { productPage } = require('../../controller/apiController/selectors');

module.exports = async browser => {
  const url = 'https://sosul.network/series/8349/';
  const userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36';

  try {
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.goto(url);
    console.log(await page.evaluate('navigator.userAgent'));

    // code
    // const platforms = productPage.product.platforms;

    // const arr = await page.evaluate(el => ({ name: el.innerHTML, href: el.href }), await page.$$(platforms));
    console.log(await getPlatforms(page))

    // const els = await page.$$(platforms);
    // const arr = await Promise.all(els.map(el => page.evaluate(e => ({ name: e.innerHTML, href: e.href }), el)));
    // console.log(arr);
    ///////


    await page.close();
  } catch (err) {
    console.error(err.message);
  }
}