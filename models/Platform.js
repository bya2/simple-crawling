const mongoose = require('mongoose');

const kakaoPageSchema = require('./KakaoPage');
const munpiaSchema = require('./Munpia');
const naverSeriesSchema = require('./NaverSeries');
const ridibooksSchema = require('./Ridibooks');

const platformSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  info: [kakaoPageSchema, munpiaSchema, naverSeriesSchema, ridibooksSchema],
});

module.exports = platformSchema;