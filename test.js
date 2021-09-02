const models = require('./models');

const db = require('./db');
(async () => {
  const products = await models.Product.find({});
  console.log(products);
})();