const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { productsModel } = require('../../../src/models')
const { salesMockSuccess,
  salesMockFail,
  saleWithId,
  saleId,
  productId,
  badProductId,
  quantity,
  getSalesByIdMock,
  getSalesMock,} = require('./mocks/sales.service.mock');

describe('Unit tests for service layer', function() {
  it('Tests the addition of a new sale with success', async function () {
    sinon.stub(salesModel, 'createNewSale').resolves(1);
    sinon.stub(productsModel, 'getById').resolves(1)
    sinon.stub(salesModel, 'createNewProductsSale').resolves(saleId, productId, quantity);
    const result = await salesService.createNewSale(salesMockSuccess);

    expect(result.status).to.equal(201);
    expect(result.message).to.deep.equal(saleWithId);
  });
  it('Tests the addition of a new sale fail', async function () {
    const result = await salesService.createNewSale(salesMockFail);
    sinon.stub(salesModel, 'createNewSale').resolves(0);
    sinon.stub(productsModel, 'getById').resolves(10);
    sinon
      .stub(salesModel, 'createNewProductsSale')
      .resolves(saleId, badProductId, quantity);

    expect(result.status).to.equal(404);
    expect(result.message).to.equal('Product not found');
  });
});
// Test for "GET" sales query
describe('Unit tests for "GET" sales and sales by Id', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Tests the query to "GET" all sales in database', async function () {
    sinon.stub(salesModel, 'getSales').resolves(getSalesMock);

    const result = await salesService.getSales();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.equal(getSalesMock);
  });
  it('Tests the query to "GET" all sales in database with id', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(getSalesByIdMock);
    
    const result = await salesService.getSalesById(1);
    expect(result.status).to.be.equal(null);
    expect(result.message).to.be.equal(getSalesByIdMock);
  });
  it('Tests the query to "GET" a apecific sale in database with id', async function () {
    const result = await salesService.getSalesById(999);
    expect(result.status).to.be.equal(404);
    expect(result.message).to.be.equal('Sale not found');
  });
});