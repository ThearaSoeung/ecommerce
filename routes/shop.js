const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

const shopController = require('../controllers/shop');

router.get('', shopController.getLandingPage);
router.get('/shop/products', shopController.getProduct);
router.post('/shop/products', shopController.postProduct);

router.post('/shop/cart', shopController.postCart);
router.get('/shop/orders', shopController.getOrders);
router.get('/shop/products/:productId', shopController.getProdectDetailById)

router.post('/shop/product/:productID', shopController.postProductID);

router.get('/cart/:id', shopController.addCartById);
router.get('/cart', shopController.getCart);

module.exports = router;