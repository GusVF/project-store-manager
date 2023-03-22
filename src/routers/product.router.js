const express = require('express');
const { productsController } = require('../controllers/index');
const validataNameMiddleware = require('../middlewares/validateNameMiddlewarer');

const router = express.Router();

router.get('/', productsController.findAll);
router.get('/:id', productsController.getById);
router.post('/', validataNameMiddleware, productsController.createProduct);

module.exports = router;
