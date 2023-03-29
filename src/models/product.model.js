const connection = require('./connection');
// Faz a requisicao de todos os produtos
const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};
// Faz a requisicao de um produto pro id
const getById = async (productId) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[products]] = await connection.execute(query, [productId]);
  return products;
};
// Inseri um novo produto na tabela
const insert = async (products) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUE (?)',
      [products.name]);
  return insertId;
};
// Faz o UPDATE do nome de um produto
const updateProductName = async (name, id) => {
      await connection
    .execute(`UPDATE StoreManager.products
    SET name = '${name}' WHERE id = ${id}`);
  const [[updatedName]] = await connection
    .execute(`SELECT id, name FROM StoreManager.products WHERE id = ${id}`);
  return updatedName;
};

const deleteById = async (id) => {
  const [deletedProduct] = await connection.execute(`DELETE FROM StoreManager.products
  WHERE id = ${id}`);
  return deletedProduct;
};

module.exports = {
  getById,
  findAll,
  insert,
  updateProductName,
  deleteById,
};
