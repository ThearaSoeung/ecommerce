const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');
const productController = require('../controllers/product');

router.get('/product', productController.getProduct);

module.exports = router;