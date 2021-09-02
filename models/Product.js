const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    require: true,
    unique: true,
  },
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
  count: {
    type: Number,
  }
})

module.exports = mongoose.model('Product', productSchema);