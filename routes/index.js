const express = require('express');

const models = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const comments = await models.Comment.find({});
    const products = await models.Product.find({});

    res.status(200).render('index', {
      title: 'Novel Review & Product Information Scraper',
      subtitle: 'COMMENTS',
      metaData: ['COMMENTSID', 'NICKNAME', 'CONTENT', 'RATE', 'UPDATED', 'PRODUCTURL'], // 6
      docs: comments,
    });

  } catch (err) {
    console.error('Error finding document:\n', err.message)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await models.Product.findOne({ productId: id });

    res.status(200).render('product', {
      title: product.title,
      subtitle: 'COMMENTS',
      metaData: []
    })
  } catch (err) {
    console.error()
  }
})

router.get('/:id/bestcomment', async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await models.BestComment.findOne({ productId: id });

    res.status(200).render('product', {
      title: product.title,
      subtitle: 'COMMENTS',
      metaData: []
    })
  } catch (err) {
    console.error()
  }
})

module.exports = router;