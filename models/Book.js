const mongoose = require('mongoose');
const dayjs = require('dayjs');

const now = dayjs().format('YY/MM/DD')

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  score: Number,
  comments: Number,
  good: Number,
  person: Number,
  updated: { type: String, default: now },
  saved: { type: Date, default: Date.now }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;