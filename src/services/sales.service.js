const { salesModel, productsModel } = require('../models');

const createNewSale = async (productsArray) => {
  const idInProduct = await Promise.all(productsArray.map(({ productId }) => 
    productsModel.getById(productId)));
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

module.exports = {
  createNewSale,
};
