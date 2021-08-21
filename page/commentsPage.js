const cheerio = require('cheerio');

const qs = require('../querySelector');

const getComment = (el, commentId) => {
  const comment = el.find(qs.comments.review.comment) || el.find(qs.comments.review.blurEffect);

  return {
    comment: comment.text(),
    commentId: commentId,
    nickname: el.find(qs.comments.review.nickname).text(),
    rate: parseFloat(el.find(qs.comments.review.rate).attr('data-rateit-value')),
    updated: el.find(qs.comments.review.updated).text()
  };
}

const getProduct = (el, productNo) => {
  const [rate, count] = el.find(qs.comments.product.rate).text().split(' ');

  return {
    author: el.find(qs.comments.product.author).text(),
    categories: el.find(qs.comments.product.categories).text().split(', '),
    count: parseInt(count.replace(/^\(|\)$/g, '')),
    href: encodeURI(`${process.env.HOST || 'https://sosul.network'}${productNo}`),
    image: encodeURI(el.find(qs.comments.product.image).attr('data-src')),
    introduction: el.find(qs.comments.product.introduction).text(),
    no: productNo,
    rate: parseFloat(rate),
    title: el.find(qs.comments.product.title).text(),
  };
}

const getItems = ($, page) => {
  const gridEls = $(qs.comments.gridLayout.item);
  
  const comments = [], products = [];

  gridEls.each((i, e) => {
    const el = $(e);

    const commentId = el.find(qs.comments.review.commentId).attr('id');
    if (comments.find(e => e.commentId === commentId)) return;
    comments.push(getComment(el, commentId));

    const productNo = el.find(qs.comments.product.href).attr('href');
    if (products.find(e => e.productNo === productNo)) {
      products.push({
        no: productNo
      })
      return
    };

    products.push(getProduct(el, productNo));
  });

  return {comments, products};
}

module.exports = async page => {
  const content = await page.content();
  const $ = cheerio.load(content);
  const items = getItems($, page);

  return items
};