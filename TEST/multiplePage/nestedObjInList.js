module.exports = async (browser, list) => {
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