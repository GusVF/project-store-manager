const allProducts = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const validName = 'productX';
const invalidName = 'a';
const validateId = 1;
const newProduct = { id: 4, name: "productX" }
const updateProductName = { id: 1, name: "Martelo do Batman" };
module.exports = {
  allProducts,
  validName,
  invalidName,
  newProduct,
  updateProductName,
  validateId,
};
