const mongoose = require('mongoose');

const platformSchema = require('./schema/Platform');
const bestCommentSchema = require('./schema/BestComment');

const productSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
  },
  introduction: {
    type: String,
  },
  rate: {
    type: Number,
  },
  platforms: platformSchema,
  bestComment: bestCommentSchema,
})

module.exports = mongoose.model('Product', productSchema);

// href: 'div > div.card-body.p-4 > div > div.col-4.col-sm-3.pr-0 > div > a', // ATTR:href
// image: 'div > div.card-body.p-4 > div > div.col-4.col-sm-3.pr-0 > div > a > img', // ATTR:data-src
// title: 'div > div.card-body.p-4 > div > div.col-8.col-sm-9 > div > div.product-title > h3 > a', // TEXT
// author: 'div > div.card-body.p-4 > div > div.col-8.col-sm-9 > div > div.product-author > a', // TEXT
// categories: 'div > div.card-body.p-4 > div > div.col-8.col-sm-9 > div > div.product-category', // TEXT
// introduction: 'div > div.card-body.p-4 > div > div.col-8.col-sm-9 > div > p', // TEXT
// rate: 'div > div.card-body.p-4 > div > div.col-8.col-sm-9 > div > div.product-reviews' // TEXT