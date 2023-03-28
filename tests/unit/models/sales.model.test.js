const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const {
  date,
  saleId,
  productId,
  quantity,
  getSalesMock,
  getSalesByIdMock,
  } = require('./mocks/sales.model.mock');

describe('Unit tests for Sales "Model"', function () {
  it('Adds a sale to "Sales" table', async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 10 }]);
    const result = await salesModel.createNewSale(date);
    expect(result).to.equal(10);
  });
});
  describe('Unit tests for Sales "Model"', function () {
    it('Adds a sale to "Product_sale" table', async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
      const result = await salesModel.createNewProductsSale(
        saleId,
        productId,
        quantity,
      );
      expect(result).to.be.equal(1);
    });
  });
describe('Unit test for "GET" query on all sales and sales with id', function () {
  afterEach(function () {
    connection.execute.restore();
  });
  it('Test the query "GET" on all sales', async function () {
    sinon.stub(connection, 'execute').resolves([getSalesMock]);

    const result = await salesModel.getSales();
    expect(result).to.be.equal(getSalesMock);
  });
});

