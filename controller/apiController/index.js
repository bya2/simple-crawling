module.exports = {
  // 코멘트(리뷰) 페이지에서 정보 추출
  // Puppeteer에 Cheerio 적용
  commentsPage: require('./commentsPage'),

  // 작품 페이지에서 정보 추출
  productPage: require('./productPage'),

  // 서비스되는 플랫폼에서 정보 추출
  platformPage: require('./platformPage'),
}