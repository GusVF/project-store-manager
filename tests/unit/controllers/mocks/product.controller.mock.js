// const allProductsMock = [
//   {
//     id: 1,
//     name: "Traje de encolhimento",
//   },
//   {
//     id: 2,
//     name: "Escudo do Capitão América",
//   },
//   {
//     id: 3,
//     name: "ProdutoX",
//   },
// ];

const productMock = { id: 1, name: "Martelo de Thor" };

const newProductMock = { id: 1, ...productMock };

const productListMock = [newProductMock];

module.exports = {
  productMock,
  newProductMock,
  productListMock,
  // allProductsMock,
}
