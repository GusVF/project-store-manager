const { productModel } = require('../models');
const schemas = require('./validationsInputValue');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const getById = async (productId) => {
  const error = schemas.validateId(productId);
  if (error.type) return error;

  const products = await productModel.getById(productId);
  if (!products) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: products };
};

module.exports = {
  getById,
  findAll,
};
