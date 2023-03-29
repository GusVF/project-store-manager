const { productsModel } = require('../models');
const schemas = require('./validationsInputValue');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};
// Faz um query "GET" em product by Id
const getById = async (productId) => {
  const error = schemas.validateId(productId);
  if (error.type) return error;

  const products = await productsModel.getById(productId);
  if (!products) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: products };
};
// Cria um novo produto
const createProduct = async (name) => {
  const error = schemas.validateProductName(name);
  if (error.type) return error;
  const newProductId = await productsModel.insert({ name });
  const newProduct = await productsModel.getById(newProductId);
  
  return { type: null, message: newProduct };
};
// faz UPDATE em um produto
const updateProductName = async (name, id) => {
  const validateId = await productsModel.getById(id);
  if (!validateId) return { status: 404, message: 'Product not found' };

  const updatedName = await productsModel.updateProductName(name, id);
  if (!id) return { status: 404, message: 'Product not found' };
  return { type: null, message: updatedName };
};

module.exports = {
  getById,
  findAll,
  createProduct,
  updateProductName,
};
