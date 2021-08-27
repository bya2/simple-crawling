const { commentsPage } = require('../selectors');

// **Puppeteer에 Cheerio를 적용하여 HTML을 가져온 이유**
// 셀렉터를 통해 태그 목록에 접근한 후, 반복문을 통해 해당 태그마다 셀렉터를 통해 HTML을 추출하기에 Cheerio가 더 적합하기 때문

// **코멘트 정보와 작품 정보를 하나의 함수에서 추출하는 이유**
// 스크랩하는 사이트의 서버 환경이 원할하지 않아 최소한의 HTML을 추출해야하기 때문
module.exports = $ => {
  const { gridLayout, comment, product } = commentsPage;

  // Selector에 해당하는 태그 목록
  const els = $(gridLayout.items);
  const comments = [], products = [], commentUp = 0, productUp = 0;
  
  for (const e of els) {
    const el = $(e);

    // **코멘트 정보**
    // 중복 방지
    const commentId = el.find(comment.commentId).attr('id');
    if (commentId === 0) break;

    // 흐림 제거
    const content = el.find(comment.content) || el.find(comment.blurEffect);
    const productId = el.find(product.href);

    // 배열 추가
    comments.push({
      commentId: commentId,
      content: content.html(),
      nickname: el.find(comment.nickname).text(),
      rate: parseFloat(el.find(comment.rate).attr('data-rateit-value')),
      updated: el.find(comment.updated).text(),
      productId: productId,
    })

    // 업데이트된 코멘트 갯수
    commentUp += 1;

    // **작품 정보**
    // 중복 방지
    if (productId === 0) continue;
    
    // 점수 / 인원
    const [rate, count] = el.find(product.rate).text().split(' ');

    // 배열 추가
    products.push({
      author: el.find(commentsPage.product.author).text(),
      categories: el.find(commentsPage.product.categories).text().split(', '),
      count: parseInt(count.replace(/^\(|\)$/g, '')),
      href: encodeURI(`${process.env.HOST || 'https://sosul.network'}${productId}`),
      image: encodeURI(el.find(commentsPage.product.image).attr('data-src')),
      introduction: el.find(commentsPage.product.introduction).text(),
      productNo: productId,
      rate: parseFloat(rate),
      title: el.find(commentsPage.product.title).text(),
    });

    // 업데이트된 작품 갯수
    productUp += 1;
  }

  return {comments, products, commentUp, productUp};
}