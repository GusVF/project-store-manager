const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const { productsService } = require("../../../src/services");
const { productsController } = require("../../../src/controllers");
const { productListMock, newProductMock } = require('./mocks/product.controller.mock');

describe('Unit test for product Controller', function () {
  it('Tests the listing of all products', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    req.json = sinon.stub().returns();
    sinon.stub(productsService, 'findAll')
      .resolves({ type: null, message: productListMock });
    
    await productsController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(req.json).to.have.been.calledWith(productListMock);
  });
  afterEach(function () {
    sinon.restore();
  });
  it('Should return with status 200 and with data if exists', async function () {
    const req = {};
    const res = {
        params: {id: 1},
    }
    res.status = sinon.stub().returns(res);
    req.json = sinon.stub().returns();
    sinon.stub(productsService, 'getById')
      .resolves({ type: null, message: newProductMock });
    
    await productsController.getById(res, req);
    expect(res.status).to.have.been.calledWith(200);
    expect(req.json).to.have.been.calledWith(newProductMock);
  });
  it('Tests if returns error with bad "id"', async function () {
    const req = {};
    const res = {
      params: { id: 999 },
    };
    res.status = sinon.stub().returns(res);
    req.json = sinon.stub().returns();
    sinon.stub(productsService, 'getById')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    
    await productsController.getById(res, req);
    expect(res.status).to.have.been.calledWith(404);
    expect(req.json).to.have.been.calledWith('Product not found')
  });
});
