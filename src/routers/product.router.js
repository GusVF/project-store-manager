const express = require('express');
const { productController } = require('../controllers/index');

const router = express.Router();

router.get('/', productController.findAll);
router.get('/:id', productController.getById);

module.exports = router;
