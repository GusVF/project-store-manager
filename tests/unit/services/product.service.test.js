const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const {
  allProducts,
  validName,
  invalidName,
  newProduct,
  updateProductName,
  validateId,
} = require("./mocks/product.service.mock");


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
// Testa a insercao de um produto
describe('Tests the insertion of a product', function () {
  it('Tests the addition of a product with invalid value', async function () {
    const result = await productsService.createProduct(invalidName);

    expect(result.type).to.equal("INVALID_VALUE");
    expect(result.message).to.equal('"value" length must be at least 5 characters long');
  });

  it('Tests the addition of a product with success', async function () {
    sinon.stub(productsModel, 'insert').resolves(1);
    sinon.stub(productsModel, 'getById').resolves(allProducts[0]);
    const result = await productsService.createProduct(validName);

    expect(result.type).to.equal(null);
    expect(result.message).to.equal(allProducts[0]);
  });
});
describe('Tests the change of a product name with "PUT" query', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Tests the updating of a product name with status 200', async function () {
    sinon.stub(productsModel, 'getById').resolves(updateProductName);
    sinon.stub(productsModel, 'updateProductName').resolves(updateProductName);
    const result = await productsService.updateProductName('Martelo do Batman', 1);
    expect(result.type).to.equal(null);
    expect(result.message).to.equal(updateProductName);
  });
  it('Tests the updating of a product name with status 404', async function () {
   sinon.stub(productsModel, "getById").resolves(false);
   sinon.stub(productsModel, "updateProductName").resolves();
   const result = await productsService.updateProductName('Martelo do Batman', 999);
   expect(result.status).to.equal(404);
   expect(result.message).to.equal('Product not found');
  });
});
describe('Tests the route "DELETE"', function () {
  it('Tests the "DELETE" query with success and status 204', async function () {
    // sinon.stub(productsModel, 'deleteById').resolves(2);
    const result = await productsService.deleteById(validateId);

    expect(result.type).to.equal(undefined);
  });
});