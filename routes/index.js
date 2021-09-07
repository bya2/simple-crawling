const express = require('express');

const models = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const comments = await models.Comment.find({}).select('-_id -__v');

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

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await models.Product.findOne({ productId: id }).select('-_id -__v');
    const platform = product.platform;
    const bestComment = product.bestComment;
    res.status(200).render('product', {
      metaData: ['AUTHOR', 'CATEGORIES', 'RATE', 'BEST COMMENT'],
      doc_product: product,
      doc_platform: platform,
      doc_bestComment: bestComment
    })
  } catch (err) {
    console.error('Error finding document2:\n', err.message)
  }
})

router.get('/bc/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await models.Product.findOne({ productId: id }).select('-_id -__v');
    const bestComment = product.bestComment;
    res.status(200).render('bcpage', {
      doc_bc: bestComment,
      url: `https://sosul.network/series/${id}/`
    })
  } catch (err) {
    console.error('Error finding document3:\n', err.message)
  }
})

module.exports = router;