const mongoose = require('mongoose');

const pfSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true },

  image: String,

  preferred: String, // -KaKaoPage
  comments: String, // -Munpia
  rate: String, // Series, Ridibooks

  // KaKaoPage [3] // 
  viewers: String, // 타입 변경해야할 수도

  // Munpia [4]
  views: String,
  recommended: String,

  // Series [5]: 이미지, 선호수, 댓글수
  serials: String,

  // Ridibooks [5]: 이미지, 선호수, 
  participants: String,
})

const bcSchema = new mongoose.Schema({
  commentId: { type: String, required: true },
  nickname: String,
  content: String,
  rate: Number,
  good: Number,
  bad: Number,
  updated: String,
})

const pdSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  image: String,
  title: { type: String, required: true },
  author: { type: String, required: true },
  categories: Array,
  introduction: String,
  rate: Number,
  count: Number,
  bestComment: bcSchema,
  platform: [[pfSchema]],
})

module.exports = mongoose.model('Product', pdSchema);