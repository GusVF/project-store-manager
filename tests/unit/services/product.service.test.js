const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { allProducts } = require("./mocks/product.service.mock");
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

describe('Unit test for product "Service"', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Lists all products with query', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProducts);

    const result = await productsService.findAll();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allProducts);
  });
  it('Returns an "error" in case of "id" does not exist', async function () {
    const result = await productsService.getById('a');
    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.be.deep.equal('Product not found')
  });
  it('Returns the correct product with "id"', async function () {
    sinon.stub(productsModel, 'getById').resolves(allProducts[0]);

    const result = await productsService.getById(1);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(allProducts[0]);
  });
});