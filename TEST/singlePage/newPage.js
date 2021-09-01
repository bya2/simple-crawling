const { productPage } = require('../../controller/apiController/selectors');

async function _fn_newPage(browser) {
  const userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36';

  console.log(1);
  console.log(this);

  const page = await browser.newPage();
  await page.setUserAgent(userAgent);
  await page.goto(this.url);
  console.log(await page.evaluate('navigator.userAgent'));
  console.log(2);
  return page;
}

module.exports = async browser => {
  const obj2 = {
    url: 'https://sosul.network/series/8349/',
  }

  const page = await _fn_newPage.call(obj2, browser);
  
  console.log(3);
  const selectors = Object.values(productPage.comment);

  console.log(4);
  const promises = await Promise.all(selectors.map(el => {
    if (el === productPage.comment.commentId) return page.$eval(el, e => e.id);
    if (el === productPage.comment.rate) return page.$eval(el, e => e.getAttribute('data-rateit-value'));
    return page.$eval(el, e => e.innerHTML);
  }));
  console.log(5);

  const obj = Object.keys(productPage.comment).reduce((obj, t, i) => (obj[t] = promises[i], obj), {});

  console.log(obj);


  await page.close();
}