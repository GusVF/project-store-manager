const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const { salesService } = require("../../../src/services");
const { salesController } = require("../../../src/controllers");
const { salesMockSuccess, salesMockFail, getSalesMock, getSalesByIdMock } = require('./mocks/sales.controller.mock');


describe('Unit tests for sales Service', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Tests addition of a new sale success', async function () {
    const res = {};
    const req = {
      body: salesMockSuccess,
    }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'createNewSale')
      .resolves({ status: 201, message: salesMockSuccess });

    await salesController.createNewSale(req, res);
     expect(res.status).to.have.been.calledWith(201);
     expect(res.json).to.have.been.calledWith(salesMockSuccess);
  });
  it('Tests addtion of a new sale fail', async function () {
    const res = {};
    const req = {
      body: salesMockFail,
    }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'createNewSale')
      .resolves({ status: 404, message: 'Product not found' });

    await salesController.createNewSale(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});
// "Get" sales test
describe('Unti tests for "Get" all sales and sales with "id"', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('tests functions to get all sales', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'getSales')
      .resolves({ status: 200, message: getSalesMock });

    await salesController.getSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getSalesMock);
  });
  it('Tests function to "GET" sales with salesId', async function () {
    const res = {};
    const req = { params: { saleId: 1 } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'getSalesById')
      .resolves({ status: 200, message: getSalesByIdMock });
    
    await salesController.getSalesById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getSalesByIdMock);
  });
  it('Tests function to "GET" sales with bad salesId', async function () {
    const res = {};
    const req = { params: { saleId: 999 } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, "getSalesById")
      .resolves({ status: 404, message: "Sale not found" });

    await salesController.getSalesById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: "Sale not found"})
  });
});
