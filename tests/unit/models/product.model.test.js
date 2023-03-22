const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { allProducts } = require('./mocks/product.model.mock');

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
