const { salesService } = require('../services/index');
const errorMap = require('../utils/errorMap');
// Cria vendas
const createNewSale = async (req, res) => {
    const products = req.body;
  const { status, message } = await salesService.createNewSale(products);
  if (status === 404) return res.status(status).json({ message });
    return res.status(status).json(message);
};
// Busca todas as vendas
const getSales = async (_req, res) => {
  const { type, message } = await salesService.getSales();
  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(200).json(message);
};
// Busca vendas por id
const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await salesService.getSalesById(id);
  if (status === 404) return res.status(status).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  createNewSale,
  getSales,
  getSalesById,
};