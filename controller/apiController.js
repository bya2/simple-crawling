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
      try {
        const info = {
          comments: parseInt(await page.$eval(platformPage.kakaoPage.comments, e => e.innerHTML)),
          status: await page.$eval(platformPage.kakaoPage.status, e => e.innerHTML),
          views: await page.$eval(platformPage.kakaoPage.views, e => e.innerHTML),
          bestComment: {
            comments: await page.$eval(platformPage.kakaoPage.bestComment.comments, e => e.innerHTML),
            content: await page.$eval(platformPage.kakaoPage.bestComment.content, e => e.innerHTML),
            good: await page.$eval(platformPage.kakaoPage.bestComment.good, e => e.innerHTML),
            nickname: await page.$eval(platformPage.kakaoPage.bestComment.nickname, e => e.innerHTML),
          },
        }
        return info;
      } catch (err) {
        console.error(`Error in Kakao Page:\n${err.message}`);
      }
    },

    munpia: async page => {
      try {
        const info = {
          bigImage: await page.$eval(platformPage.munpia.bigImage, e => e.src),
          characters: await page.$eval(platformPage.munpia.characters, e => e.innerHTML),
          image: await page.$eval(platformPage.munpia.image, e => e.src),
          isCompleted: await page.$eval(platformPage.munpia.isCompleted, e => e.innerHTML),
          preferred: await page.$eval(platformPage.munpia.preferred, e => e.innerHTML),
          recommended: await page.$eval(platformPage.munpia.recommended, e => e.innerHTML),
          registered: await page.$eval(platformPage.munpia.registered, e => e.innerHTML),
          serials: await page.$eval(platformPage.munpia.serials, e => e.innerHTML),
          // tab: await page.$eval(platformPage.munpia.tab, e => e.innerHTML),
          updated: await page.$eval(platformPage.munpia.updated, e => e.innerHTML),
          views: await page.$eval(platformPage.munpia.views, e => e.innerHTML),

          bestComment: {
            comments: await page.$eval(platformPage.munpia.bestComment.comments, e => e.innerHTML),
            content: await page.$eval(platformPage.munpia.bestComment.content, e => e.innerHTML),
            good: await page.$eval(platformPage.munpia.bestComment.good, e => e.innerHTML),
            id: await page.$eval(platformPage.munpia.bestComment.id, e => e.innerHTML),
            title: await page.$eval(platformPage.munpia.bestComment.title, e => e.innerHTML),
            updated: await page.$eval(platformPage.munpia.bestComment.updated, e => e.innerHTML),
            views: await page.$eval(platformPage.munpia.bestComment.views, e => e.innerHTML),
          }
        }
        return info;
      } catch (err) {
        console.error(`Error in munpia:\n${err.message}`);
      }
    },

    naverSeries: async page => {
      try {
        const info = {
          comments: parseInt(await page.$eval(platformPage.naverSeries.comments, e => e.innerHTML)),
          image: await page.$eval(platformPage.naverSeries.image, e => e.src),
          preferred: parseInt(await page.$eval(platformPage.naverSeries.preferred, e => e.innerHTML)),
          rate: parseFloat(await page.$eval(platformPage.naverSeries.rate, e => e.innerHTML)),
          total: parseInt(await page.$eval(platformPage.naverSeries.total, e => e.innerHTML)),

          bestComment: {
            bad: await page.$eval(platformPage.naverSeries.bestComment.bad, e => e.innerHTML),
            comments: await page.$eval(platformPage.naverSeries.bestComment.comments, e => e.innerHTML),
            content: await page.$eval(platformPage.naverSeries.bestComment.content, e => e.innerHTML),
            good: await page.$eval(platformPage.naverSeries.bestComment.good, e => e.innerHTML),
            id: await page.$eval(platformPage.naverSeries.bestComment.id, e => e.innerHTML),
            nickname: await page.$eval(platformPage.naverSeries.bestComment.nickname, e => e.innerHTML),
            updated: await page.$eval(platformPage.naverSeries.bestComment.updated, e => e.innerHTML),
          }
        }
        return info;
      } catch (err) {
        console.error(`Error in munpia:\n${err.message}`);
      }
    },

    ridibooks: async page => {
      try {
        const info = {
          ISBN: await page.$eval(platformPage.ridibooks.ISBN, e => e.innerHTML),
          comments: await page.$eval(platformPage.ridibooks.comments, e => e.innerHTML),
          comments_puchaser: await page.$eval(platformPage.ridibooks.comments_puchaser, e => e.innerHTML),
          image: await page.$eval(platformPage.ridibooks.image, e => e.innerHTML),
          participants: await page.$eval(platformPage.ridibooks.participants, e => e.innerHTML),
          preferred: await page.$eval(platformPage.ridibooks.preferred, e => e.innerHTML),
          published_date: await page.$eval(platformPage.ridibooks.published_date, e => e.innerHTML),
          rate: await page.$eval(platformPage.ridibooks.rate, e => e.innerHTML),
          // tab: await page.$eval(platformPage.ridibooks.tab, e => e.innerHTML),

          bestComment: {
            content: await page.$eval(platformPage.ridibooks.bestComment.content, e => e.innerHTML),
            good: await page.$eval(platformPage.ridibooks.bestComment.good, e => e.innerHTML),
            id: await page.$eval(platformPage.ridibooks.bestComment.id, e => e.innerHTML),
            updated: await page.$eval(platformPage.ridibooks.bestComment.updated, e => e.innerHTML),
          }
        }
        return info;
      } catch (err) {
        console.error(`Error in munpia:\n${err.message}`);
      }
    }
  }

}