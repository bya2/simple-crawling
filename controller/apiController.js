const { commentsPage, productPage, platformPage } = require('../querySelector');


module.exports = {
  commentsPage: $ => {
    const _comments = [], _products = [];
    let updates = 0;

    const els = $(commentsPage.gridLayout.items);

    for (const e of els) {
      const el = $(e);

      const commentId = el.find(commentsPage.comment.commentId).attr('id');
      const productNo = el.find(commentsPage.product.href).attr('href');

      if (_comments.find(e => e.commentId === commentId)) break;
      else {
        const content = el.find(commentsPage.comment.content) || el.find(commentsPage.comment.blurEffect);

        _comments.push({
          commentId: commentId,
          content: content.html(),
          nickname: el.find(commentsPage.comment.nickname).text(),
          rate: parseFloat(el.find(commentsPage.comment.rate).attr('data-rateit-value')),
          updated: el.find(commentsPage.comment.updated).text(),
          productNo: productNo
        });

        updates +=1;
      }

      if (_products.find(e => e.productNo === productNo)) continue;
      else {
        const [rate, count] = el.find(commentsPage.product.rate).text().split(' ');

        _products.push({
          author: el.find(commentsPage.product.author).text(),
          categories: el.find(commentsPage.product.categories).text().split(', '),
          count: parseInt(count.replace(/^\(|\)$/g, '')),
          href: encodeURI(`${process.env.HOST || 'https://sosul.network'}${productNo}`),
          image: encodeURI(el.find(commentsPage.product.image).attr('data-src')),
          introduction: el.find(commentsPage.product.introduction).text(),
          productNo: productNo,
          rate: parseFloat(rate),
          title: el.find(commentsPage.product.title).text(),
        })
      }
    }

    return {_comments, _products, updates};
  },

  productPage: {
    getPlatforms: async (page, platforms = []) => {
      const els = await page.$$(productPage.product.platforms);

      els.map(async el => {
        platforms.push(await page.evaluate(e => ({ name: e.innerHTML, href: e.href }), el));
      })

      return platforms;
    },

    getBestComment: async page => {
      const comment = {
        bad: await page.$eval(productPage.review.bad, e => e.innerHTML),
        comment: await page.$eval(productPage.review.comment,e => e.innerHTML),
        commentId: await page.$eval(productPage.review.commentId, e => e.id),
        good: await page.$eval(productPage.review.good, e => e.innerHTML),
        nickname: await page.$eval(productPage.review.nickname, e => e.innerHTML),
        rate: parseFloat(await page.$eval(productPage.review.rate, e => e['data-rateit-value'])),
        updated: await page.$eval(productPage.review.updated, e => e.innerHTML),
      }

      return comment;
    },
  },

  platformPage: {
    kakaoPage: async page => {
      const info = {
        comments: await page.$eval(platformPage.kakaoPage.comments, e => e.innerHTML),
        status: await page.$eval(platformPage.kakaoPage.status, e => e.innerHTML),
        views: await page.$eval(platformPage.kakaoPage.views, e => innerHTML),
        bestComment: {
          comments: await page.$eval(platformPage.kakaoPage.bestComment.comments, e => innerHTML),
          content: await page.$eval(platformPage.kakaoPage.bestComment.content, e => innerHTML),
          good: await page.$eval(platformPage.kakaoPage.bestComment.good, e => e.innerHTML),
          nickname: await page.$eval(platformPage.kakaoPage.bestComment.nickname, e => e.innerHTML),
        },
      }

      return info;
    },

    munpia: async page => {

    },

    naverSeries: async page => {

    },

    ridibooks: async page => {
      
    }
  }

}