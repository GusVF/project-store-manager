const { salesModel, productsModel } = require('../models');
const schemas = require('./validationsInputValue');
// Cria uma nova venda
const createNewSale = async (productsArray) => {
  const idInProduct = await Promise.all(productsArray.map(({ id }) => 
    productsModel.getById(id)));
  const selectId = idInProduct.some((prodId) => !prodId); 
  if (selectId) return { status: 404, message: 'Product not found' };

  const newSaleId = await salesModel.createNewSale();
  const newSalePromises = productsArray.map(async ({ productId, quantity }) =>
  salesModel.createNewProductsSale(newSaleId, productId, quantity));
  await Promise.all(newSalePromises);

  const newSale = {
    id: newSaleId,
    itemsSold: productsArray.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  };
  return { status: 201, message: newSale };
};
// Busca todas as vendas
const getSales = async () => {
  const sales = await salesModel.getSales();
  return { type: null, message: sales };
};
// Busca vendas por id
const getSalesById = async (saleID) => {
  const error = schemas.validateId(saleID);
  if (error.type) return error;

  const sales = await salesModel.getSalesById(saleID);
  if (sales.length <= 0) return { status: 404, message: 'Sale not found' };
  return { status: null, message: sales };
};

module.exports = {
  createNewSale,
  getSales,
  getSalesById,
};
