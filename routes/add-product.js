const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

const addProductController = require('../controllers/add-product');

router.get('/add-product', addProductController.getAddProduct);
router.post('/add-product', addProductController.postAddProduct);

module.exports = router;