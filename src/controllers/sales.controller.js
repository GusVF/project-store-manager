const { salesService } = require('../services/index');

const createNewSale = async (req, res) => {
    const products = req.body;
  const { status, message } = await salesService.createNewSale(products);
  console.log(status, message);
  if (status === 404) return res.status(status).json({ message });
    return res.status(status).json(message);
};

module.exports = {
  createNewSale,
};