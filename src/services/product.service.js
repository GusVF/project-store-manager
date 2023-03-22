const { productsModel } = require('../models');
const schemas = require('./validationsInputValue');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const getById = async (productId) => {
  const error = schemas.validateId(productId);
  if (error.type) return error;

  const products = await productsModel.getById(productId);
  if (!products) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  console.log(products);
  return { type: null, message: products };
};

// const createProduct = async (name) => {
//   const error = schemas.validateNewProduct(name);
//   if (error.type) return error;
//   const newProductId = await productsModel.insert({ name });
//   const newProduct = await productsModel.getById(newProductId);
  
//   return { type: null, message: newProduct };
// };

module.exports = {
  getById,
  findAll,
  // createProduct,
};
