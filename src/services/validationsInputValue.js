const { idSchema, nameSchema, addSalesSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

const validateProductName = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

const validateNewSale = (productArray) => {
  const { error } = addSalesSchema.validate(productArray);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateProductName,
  validateNewSale,
};