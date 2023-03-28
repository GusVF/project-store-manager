const connection = require('./connection');
// Cria uma nova venda
const createNewSale = async () => {
  const salesQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())'; 
  const [{ insertId }] = await connection.execute(salesQuery);
  return insertId;
};
// Cria um novo produto da venda
const createNewProductsSale = async (saleId, productId, quantity) => {
  const query2 = `INSERT INTO 
  StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
  const [{ insertId }] = await connection.execute(query2, [saleId, productId, quantity]);

  return insertId;
};
// Busca todas as vendas
const getSales = async () => {
  const query = `SELECT S.id as saleId, S.date, SP.product_id as productId, SP.quantity FROM
StoreManager.sales AS S
INNER JOIN StoreManager.sales_products AS SP
ON S.id = SP.sale_id
ORDER BY S.id , SP.product_id ASC`;
  const [result] = await connection.execute(query);
  return result;
};
// Busca vendas por id
const getSalesById = async (saleId) => {
    const query = `SELECT S.date, SP.product_id as productId, SP.quantity FROM
StoreManager.sales AS S
INNER JOIN StoreManager.sales_products AS SP
ON S.id = SP.sale_id
WHERE S.id = ?
ORDER BY S.id ASC, SP.product_id ASC`;
  const [result] = await connection.execute(query, [saleId]);
  return result;
};

module.exports = {
  createNewProductsSale,
  createNewSale,
  getSales,
  getSalesById,
};
