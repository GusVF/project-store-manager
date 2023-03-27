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
  quantity } = require('./mocks/sales.service.mock');

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