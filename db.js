import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/simple-crawling', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log(`we're connected!`);
})

module.exports = db;

