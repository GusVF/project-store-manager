const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const { salesService } = require("../../../src/services");
const { salesController } = require("../../../src/controllers");
const { salesMockSuccess, salesMockFail } = require('./mocks/sales.controller.mock');


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
