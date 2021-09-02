const mongoose = require('mongoose');

const bestCommentSchema = new mongoose.Schema({
  productId: {
    type: String,
    require: true,
  },
  commentId: {
    type: String,
    required: String,
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
  good: {
    type: Number,
  },
  bad: {
    type: Number,
  },
  updated: {
    type: String,
  }
});

module.exports = mongoose.model('BestComment', bestCommentSchema);



// "bestComment": {
//   "bad": "0",
//   "comment": "북부편이 너무 명작이어서 중앙편이 딸림",
//   "commentId": "comment-11975",
//   "good": "2",
//   "nickname": "God In",
//   "rate": null,
//   "updated": "2020년 1월 25일 12:48"
// }


// review: {
//   commentId: '#comments > div > div:nth-child(1) > div.text > div.text_holder.content-wrap', // ATTR:id
//   nickname: '#comments > div > div:nth-child(1) > div.text > h5.name > a:nth-child(1)', // TEXT
//   comment: '#comments > div > div:nth-child(1) > div.text > div.text_holder.content-wrap > div', // HTML
//   rate: '#comments > div > div:nth-child(1) > div.text > div:nth-child(1) > span', // ATTR:data-rateit-value
//   updated: '#comments > div > div:nth-child(1) > div.text > div.text-right.m-t-10.d-block > span.comment_date.text-muted.d-none.d-md-inline-block', // TEXT
//   good: '#comments > div > div:nth-child(1) > div.text > div.text-right.m-t-10.d-block > span:nth-child(2) > span', // TEXT
//   bad: '#comments > div > div:nth-child(1) > div.text > div.text-right.m-t-10.d-block > span:nth-child(3) > span', // TEXT
// }