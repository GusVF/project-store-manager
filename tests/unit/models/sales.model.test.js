const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { salesMockSuccess,
  salesMockFail,
  saleWithId,
  date,
  saleId,
  productId,
  quantity,
  badProductId,} = require('./mocks/sales.model.mock');

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

