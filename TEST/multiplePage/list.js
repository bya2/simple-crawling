// List or Array

module.exports = async (browser, list) => {
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
}