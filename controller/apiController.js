const { commentsPage, productPage } = require('../querySelector');

module.exports = {
  commentsPage: $ => {
    const _comments = [],
          _products = [];

    let count = 0;

    const els = $(commentsPage.gridLayout.items);
    
    els.each((i, e) => {
      const el = $(e);

      const commentId = el.find(commentsPage.comment.commentId).attr('id');
      const productNo = el.find(commentsPage.product.href).attr('href');

      if (_comments.find(e => e.commentId === commentId)) return;

      const content = el.find(commentsPage.comment.content) || el.find(commentsPage.comment.blurEffect);

      _comments.push({
        commentId: commentId,
        content: content.html(),
        nickname: el.find(commentsPage.comment.nickname).text(),
        rate: parseFloat(el.find(commentsPage.comment.rate).attr('data-rateit-value')),
        updated: el.find(commentsPage.comment.updated).text(),
        productNo: productNo
      });

      count += 1

      if (_products.find(e => e.productNo === productNo)) return;

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
    })

    return {_comments, _products, update: count};
  },

  productPage: async page => {

    const _platforms = [];

    const elHandles = await page.$$(productPage.product.platforms);

    for (const elhandle of elHandles) {
      _platforms.push(await page.evaluate(el => {
        return {
          name: el.innerHTML,
          href: el.href
        }
      }, elhandle));
    }

    return _platforms;
  }

}