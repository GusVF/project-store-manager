const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const { productsService } = require("../../../src/services");
const { productsController } = require("../../../src/controllers");
const { productMock, newProductMock } = require('./mocks/product.controller.mock');

describe('Unit test for product Controller', function () {
  it('Tests the listing of all products', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'findAll')
      .resolves({ type: null, message: productMock });
    
    await productsController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productMock);
  });
  afterEach(function () {
    sinon.restore();
  });
  it('Should return with status 200 if product exists', async function () {
    const res = {};
    const req = { params: {id: 1}};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getById')
      .resolves({ type: null, message: productMock });
    
    await productsController.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productMock);
  });
  it('Tests if returns error with bad "id"', async function () {
    const res = {};
    const req = { params: { id: "invalidId" } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'getById')
      .resolves({ type: "PRODUCT_NOT_FOUND", message: 'Product not found' });
    
    await productsController.getById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: "Product not found" });
  });
});
// Teste de insercao de um novo produto
describe('Test the addition of a new product in Controller', function () {
  it('Tests the addtion of new product with success', async function () {
    const res = {};
    const req = {
      body: productMock,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'createProduct')
      .resolves({ type: null, message: newProductMock });
    
    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductMock);
  });
});
describe('Test the function that changes a product name', function () {
  afterEach(function () {
    sinon.restore();
  })
  it('Tests the change of a product name', async function () {
    const res = {};
    const req = {
      params: 1,
      body: 'Martelo do Batman',
    }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'updateProductName')
      .resolves({ status: null, message: { id: 1, name: 'Martelo do Batman' } });
    
    await productsController.updateProductName(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
      id: 1,
      name: "Martelo do Batman",
    });
  });
  it('Tests the change of a product name fail', async function () {
    const res = {};
    const req = {
      params: 999,
      body: 'Martelo do Batman',
    }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'updateProductName')
      .resolves({ status: 404, message: 'Product not found' });
    
    await productsController.updateProductName(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
  });
});
describe('Unit tests for "DELETE" query', function () {
  it(' tests the delition of a product with status 204', async function () {
    const res = {};
    const req = { params: 1 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'deleteById')
      .resolves({ status: 204, });
    
    await productsController.deleteById(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });
});
