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

const insert = async (products) => {
  // const columns = Object.keys(products);
  // const placeHolder = Object.values(products);
  // console.log(columns, placeHolder);
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUE (?)',
      [products.name]);
  return insertId;
};
module.exports = {
  getById,
  findAll,
  insert,
};