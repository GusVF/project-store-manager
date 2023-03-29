const express = require('express');
const { productsController } = require('../controllers/index');
const validateNameMiddleware = require('../middlewares/validateNameMiddlewear');

const router = express.Router();

router.get('/', productsController.findAll);
router.get('/:id', productsController.getById);
router.post('/', validateNameMiddleware, productsController.createProduct);
router.put('/:id', validateNameMiddleware, productsController.updateProductName);
module.exports = router;
