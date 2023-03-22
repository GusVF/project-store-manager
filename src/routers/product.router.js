const express = require('express');
const { productsController } = require('../controllers/index');

const router = express.Router();

router.get('/', productsController.findAll);
router.get('/:id', productsController.getById);
router.post('/', productsController.createProduct);

module.exports = router;
