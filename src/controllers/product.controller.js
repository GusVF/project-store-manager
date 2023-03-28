const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');
// lista todos produtos 
const findAll = async (_req, res) => {
  const { type, message } = await productsService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};
// Seleciona produto por id
const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};
// Adiciona um novo produto na lista
const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);
  if (type) return res.status(errorMap.mapError(type)).json(message);
  res.status(201).json(message);
};

module.exports = {
  getById,
  findAll,
  createProduct,
};
