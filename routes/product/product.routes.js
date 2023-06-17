const express = require('express');
const router = express.Router();
const productController = require('../../controller/product/product.controller');

router.post('/addProduct', productController.addProduct);
router.get('/getAll', productController.getProduct);
router.get('/get', productController.getProduct);
router.put('/updateProduct', productController.updateProduct);

module.exports = router;