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
// faz UPDATE em um produto
const updateProductName = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, message } = await productsService.updateProductName(name, id);
  if (status === 404) return res.status(404).json({ message });
  res.status(200).json(message);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productsService.deleteById(id);
  if (status === 404) return res.status(404).json({ message });
  res.status(204).json(message);
};

module.exports = {
  getById,
  findAll,
  createProduct,
  updateProductName,
  deleteById,
};
