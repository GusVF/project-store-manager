const salesMockSuccess = [
  { productId: 1, quantity: 1 },
];
const salesMockFail = [
  { productId: 10, quantity: 1 },
];

const saleWithId = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
  ],
};

const saleId = 2;
const productId = 1;
const badProductId = 10;
const quantity = 1;

module.exports = {
  salesMockSuccess,
  salesMockFail,
  saleWithId,
  saleId,
  productId,
  badProductId,
  quantity,
};
