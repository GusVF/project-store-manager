// const productsModel = require('../models');

const productIdMiddleware = async (req, res, next) => {
  const products = req.body;
  const hasProductId = products.some((prodId) => prodId.productId);
  if (!hasProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

module.exports = productIdMiddleware;
