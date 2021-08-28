const { commentsPage } = require('../selectors');
const { Comment, Product } = require('../../../models')

// **Puppeteer에 Cheerio를 적용하여 HTML을 가져온 이유**
// 셀렉터를 통해 태그 목록에 접근한 후, 반복문을 통해 해당 태그마다 셀렉터를 통해 HTML을 추출하기에 Cheerio가 더 적합하기 때문

// **코멘트 정보와 작품 정보를 하나의 함수에서 추출하는 이유**
// 스크랩하는 사이트의 서버 환경이 원할하지 않아 최소한의 HTML을 추출해야하기 때문
module.exports = async $ => {
  console.log(1);

  try{
    // Selector에 해당하는 태그 목록
    const els = $(commentsPage.gridLayout.items);
    const commentObjs = [], productObjs = [];
    let commentUp = 0, productUp = 0;

    console.log(12);
    
    // **For문 사용 이유**
    // 코멘트 정보가 존재할 경우 BREAK (스크랩 중지)
    // 작품 정보가 존재할 경우 CONTINUE (다음 코멘트 정보 스크랩)
    // 순수 Puppeteer와 달리 Cheerio 객체로 스크랩하는 것은 병렬적으로 처리하지 않아도 오래걸리지 않음
    for (const e of els) {
      const el = $(e);

      // // // 코멘트 정보 // // //
      // 중복 방지
      const commentId = el.find(commentsPage.comment.commentId).attr('id');
      const isComment = await Comment.findOne({ commentId: commentId }) ? true : false;
      if (isComment) break;

      // 흐림 제거
      const content = el.find(commentsPage.comment.content) || el.find(commentsPage.comment.blurEffect);
      const productId = el.find(commentsPage.product.href).attr('href');

      console.log(123);

      // 배열 추가
      commentObjs.push({
        commentId: commentId,
        content: content.html(),
        nickname: el.find(commentsPage.comment.nickname).text(),
        rate: parseFloat(el.find(commentsPage.comment.rate).attr('data-rateit-value')),
        updated: el.find(commentsPage.comment.updated).text(),
        productId: productId,
      })

      console.log(1234);

      // 업데이트된 코멘트 갯수
      commentUp += 1;

      // // // 작품 정보 // // //
      // 중복 방지
      const isProduct = await Product.findOne({ productId: productId }) ? true : false;
      if (isProduct) continue;

      console.log(1234111111);
      
      // 점수 / 인원
      const [rate, count] = el.find(commentsPage.product.rate).text().split(' ');

      console.log(1234000000);

      // 배열 추가
      productObjs.push({
        author: el.find(commentsPage.product.author).text(),
        categories: el.find(commentsPage.product.categories).text().split(', '),
        count: parseInt(count.replace(/^\(|\)$/g, '')),
        url: encodeURI(`${process.env.HOST || 'https://sosul.network'}${productId}`),
        image: encodeURI(el.find(commentsPage.product.image).attr('data-src')),
        introduction: el.find(commentsPage.product.introduction).text(),
        productId: productId,
        rate: parseFloat(rate),
        title: el.find(commentsPage.product.title).text(),
      });

      // 업데이트된 작품 갯수
      productUp += 1;

      console.log(12345);
    }

    // 코멘트 데이터 데이터베이스 저장
    commentObjs.forEach(el => {
      const commentDoc = new Comment(el);
      commentDoc.save(err => err ? console.error(err.message) : console.log(`Comment's info saved in DB.`));
    })

    // 작품 데이터 데이터베이스 저장
    // products.forEach(el => {
    //   const productDoc = new Product(el);
    //   productDoc.save(err => err ? console.error(err.message) : console.log(`Product's info saved in DB.`));
    // })

    // 반환할 ID와 URL 프로퍼티를 가진 객체

    console.log(123456);

    const objs = productObjs.map(el => {
      return {
        productId: el.productId,
        url: el.url,
      }
    })

    console.log(1234567);

    return productObjs;
  } catch (err) {
    console.error('Error in commentsPage:\n' + err)
  }
  //TEST OK
}