// Module
require('dotenv').config();
const puppeteer = require('puppeteer');
const fs = require('fs');

// Controller
// const {commentsPage, platformPage, productPage} = require('../controller/apiController');

// Required objects
const __products = require('../productPages.json');
const userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.0 Safari/537.36';

// TestController
const testController = {
  // Test Code
  code: require('./code'),

  // Single Page
  singlePage: require('./singlePage'),

  // Multiple Page
  multiplePage: require('./multiplePage'),
};

(async () => {
  const options = {
    headless: true,
  };

  let browser;

  try {
    browser = await puppeteer.launch();

    // testController.singlePage(browser, url);
    // testController.multiplePage.list(browser, list);
    // testController.multiplePage.nestedObjInList(browser, list);
    await testController.singlePage.bestComment(browser);

  } catch (err) {
    console.error(err.message);
  } finally {
    await browser.close();
  }
})();