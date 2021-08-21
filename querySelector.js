module.exports = {
  comments: {
    gridLayout: {
      item: 'body > div.body-inner > section.series-list.recommendation-list.pt-3 > div > div > div.grid-item:nth-child(1)', // TEST ONE
      items: 'body > div.body-inner > section.series-list.recommendation-list.pt-3 > div > div > div.grid-item', // LIST
    },
    product: {
      href: 'div > div.card-body.p-4 > div > div.col-4.col-sm-3.pr-0 > div > a', // ATTR:href
      image: 'div > div.card-body.p-4 > div > div.col-4.col-sm-3.pr-0 > div > a > img', // ATTR:data-src
      title: 'div > div.card-body.p-4 > div > div.col-8.col-sm-9 > div > div.product-title > h3 > a', // TEXT
      author: 'div > div.card-body.p-4 > div > div.col-8.col-sm-9 > div > div.product-author > a', // TEXT
      categories: 'div > div.card-body.p-4 > div > div.col-8.col-sm-9 > div > div.product-category', // TEXT
      introduction: 'div > div.card-body.p-4 > div > div.col-8.col-sm-9 > div > p', // TEXT
      rate: 'div > div.card-body.p-4 > div > div.col-8.col-sm-9 > div > div.product-reviews' // TEXT
    },
    review: {
      commentId: 'div > div.card-footer.text-left.p-4 div.content-wrap', // ATTR:id
      nickname: 'div > div.card-footer.text-left.p-4 > div.product-nickname.one-line > a:nth-child(1) > strong', // TEXT
      comment: 'div > div.card-footer.text-left.p-4 div.content-wrap div.content-txt', // HTML
      blurEffect: 'div > div.card-footer.text-left.p-4 > div.content-wrap > div.blur-effect', // HTML
      rate: 'div > div.card-footer.text-left.p-4 > span', // ATTR:data-rateit-value
      updated: 'div > div.card-footer.text-left.p-4 > div.product-nickname.one-line > small', // TEXT
    },
  },
  series: {
    product: {
      platforms: '#product-page > div > div > div > div.col-lg-4.mb-4 > div.widget.p-cb > div.product-description > div.product-meta > div > a', // TEXT, ATTR:href
    },
    review: {
      commentId: '#comments > div > div:nth-child(1) > div.text > div.text_holder.content-wrap', // ATTR:id
      nickname: '#comments > div > div:nth-child(1) > div.text > h5.name > a:nth-child(1)', // TEXT
      comment: '#comments > div > div:nth-child(1) > div.text > div.text_holder.content-wrap > div', // HTML
      rate: '#comments > div > div:nth-child(1) > div.text > div:nth-child(1) > span', // ATTR:data-rateit-value
      updated: '#comments > div > div:nth-child(1) > div.text > div.text-right.m-t-10.d-block > span.comment_date.text-muted.d-none.d-md-inline-block', // TEXT
      good: '#comments > div > div:nth-child(1) > div.text > div.text-right.m-t-10.d-block > span:nth-child(2) > span', // TEXT
      bad: '#comments > div > div:nth-child(1) > div.text > div.text-right.m-t-10.d-block > span:nth-child(3) > span', // TEXT
    }
  },
  platform: {
    kakaoPage: {
      
    },
    munpia: {

    },
    naverSeries: {

    },
    ridibooks: {

    }
  }
}