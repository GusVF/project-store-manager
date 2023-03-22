const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models/product.model');
const connection = require('../../../src/models/connection');

const { product } = require('./mocks/product.model.mock');

describe('Unit test for product Model', function () {
  it('recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([product]);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(product);
  });
  it('recupernado um produto por "id"', async function () {
    sinon.stub(connection, 'execute').resolves([[product[0]]]);
    const result = await productModel.getById(1);
    expect(result).to.be.deep.equal(product[0]);
  });
});



