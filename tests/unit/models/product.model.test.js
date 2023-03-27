const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { allProducts,newProduct } = require('./mocks/product.model.mock');

describe('Unit test for product "Model"', function () {
  afterEach(function () {
    connection.execute.restore();
  });
  it("Lists all products", async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(allProducts);
  });
  it('gets a product by "id"', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);

    const result = await productsModel.getById(1);
    expect(result).to.be.deep.equal(allProducts[0]);
  });
});
// Insercao de um novo produto.
describe('Unit test for adding new product', function () {
  it('Adds new product with success', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 10 }]);
    const result = await productsModel.insert(newProduct);

    expect(result).to.equal(10);

    afterEach(function () {
      sinon.restore();
    });
  });
});
