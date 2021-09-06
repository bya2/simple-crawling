const mongoose = require('mongoose');

module.exports = mongoose.model('Comment', new mongoose.Schema({
  commentId: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
  },
  content: {
    type: String,
  },
  rate: {
    type: Number,
  },
  updated: {
    type: String
  },
  productId: {
    type: String,
    required: true
  }
}))


// commentId: 'div > div.card-footer.text-left.p-4 div.content-wrap', // ATTR:id
// nickname: 'div > div.card-footer.text-left.p-4 > div.product-nickname.one-line > a:nth-child(1) > strong', // TEXT
// content: 'div > div.card-footer.text-left.p-4 div.content-wrap div.content-txt', // HTML
// blurEffect: 'div > div.card-footer.text-left.p-4 > div.content-wrap > div.blur-effect', // HTML
// rate: 'div > div.card-footer.text-left.p-4 > span', // ATTR:data-rateit-value
// updated: 'div > div.card-footer.text-left.p-4 > div.product-nickname.one-line > small', // TEXT