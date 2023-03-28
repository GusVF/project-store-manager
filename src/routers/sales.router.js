const express = require('express');
const { salesController } = require('../controllers/index');
const productIdMiddleware = require('../middlewares/productIdMiddleware');
const saleQuantityValidation = require('../middlewares/saleQuantityValidation');

const router = express.Router();

router.post('/', productIdMiddleware, saleQuantityValidation, salesController.createNewSale);
router.get('/', salesController.getSales);
router.get('/:id', salesController.getSalesById);
module.exports = router;