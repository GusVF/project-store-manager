const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { allProducts,newProduct, updateProductName } = require('./mocks/product.model.mock');

describe('Unit test for product "Model"', function () {
  afterEach(function () {
    connection.execute.restore();
  });
  it("Lists all products", async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(allProducts);
  });
  it('gets a product by "id"', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);

    const result = await productsModel.getById(1);
    expect(result).to.be.deep.equal(allProducts[0]);
  });
});
// Insercao de um novo produto.
describe('Unit test for adding new product', function () {
  it('Adds new product with success', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 10 }]);
    const result = await productsModel.insert(newProduct);

    expect(result).to.equal(10);

    afterEach(function () {
      sinon.restore();
    });
  });
});
describe('Unit test for updating a product name', function () {
  it('Updates a product name with "PUT" query', async function () {
    const name = 'Martelo do Batman';
    const id = 1;
    sinon
      .stub(connection, "execute")
      .resolves([[updateProductName]]);
    const result = await productsModel.updateProductName(updateProductName);
    console.log('test', result);
    expect(result).to.deep.equal({ id: 1, name: "Martelo do Batman" });
  });
});
