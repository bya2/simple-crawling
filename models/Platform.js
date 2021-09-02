const mongoose = require('mongoose');

const kakaoPageSchema = require('./schema/KakaoPage');
const munpiaSchema = require('./schema/Munpia');
const naverSeriesSchema = require('./schema/NaverSeries');
const ridibooksSchema = require('./schema/Ridibooks');

const platformSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  kakaoPage: kakaoPageSchema, 
  munpia: munpiaSchema,
  naverSeries: naverSeriesSchema,
  ridibooks: ridibooksSchema
});

module.exports = platformSchema;