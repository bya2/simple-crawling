const mongoose = require('mongoose');

module.exports = mongoose.model('Platform', new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
}))