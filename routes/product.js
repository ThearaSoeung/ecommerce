const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');
const productController = require('../controllers/product');

router.get('/product', productController.getProduct);

router.post('/product', productController.postProduct)

module.exports = router;