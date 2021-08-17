const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  img: { type: String, required: true },
  score: Number,
  comments: Number,
  good: Number,
  person: Number,
  updated: { type: Date, default: Date.now }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;