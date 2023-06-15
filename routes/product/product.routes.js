const express = require('express');
const router = express.Router();
const productController = require('../../controller/product/product.controller');

router.post('/addProduct', productController.addProduct);

module.exports = router;