const connection = require('./connection');

const createNewSale = async () => {
  const salesQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())'; 
  const [{ insertId }] = await connection.execute(salesQuery);
  return insertId;
};

const createNewProductsSale = async (saleId, productId, quantity) => {
  const query2 = `INSERT INTO 
  StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
  const [{ insertId }] = await connection.execute(query2, [saleId, productId, quantity]);

  return insertId;
};

module.exports = {
  createNewProductsSale,
  createNewSale,
};
