const express = require('express');

const Books = require('../models/Book');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const docs = await Books.find({});

    res.status(200).render('index', {
      title: 'Novel Page',
      subtitle: 'CONTENTS',
      metaData: ['IMG', 'TITLE', 'SCORE', 'COMMENTS', 'GOOD', 'PERSON', 'UPDATED'],
      docs: docs,
    });

  } catch (err) {
    console.error('Error finding document:\n', err.message)
  }
});

module.exports = router;