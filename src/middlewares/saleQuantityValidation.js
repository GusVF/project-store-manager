const saleQuantityValidation = (async (req, res, next) => {
  const products = req.body;

  const quantityMoreThanZero = products.some((quant) => quant.quantity < 1);
  const hasQuantity = products.some((quant) => !quant.quantity);

  if (quantityMoreThanZero) {
    return res.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (hasQuantity) return res.status(400).json({ message: '"quantity" is required' });
  next();
});

module.exports = saleQuantityValidation;
