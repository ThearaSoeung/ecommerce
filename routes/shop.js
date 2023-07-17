const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

const shopController = require('../controllers/shop');

router.get('', shopController.getLandingPage);
router.get('/shop/products', shopController.getProduct);
router.post('/shop/products', shopController.postProduct);
router.get('/shop/cart', shopController.getCart);
router.post('/shop/cart', shopController.postCart);
router.get('/shop/orders', shopController.getOrders);

module.exports = router;