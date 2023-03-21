const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};
const getById = async (productId) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[products]] = await connection.execute(query, [productId]);
  return products;
};

module.exports = {
  getById,
  findAll,
};
