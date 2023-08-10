const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("", shopController.getLandingPage);
router.get("/shop/products", shopController.getProduct);
router.get("/shop/products/:productId", shopController.getProdectDetailById);
router.get("/cart/:id", shopController.addCartById);
router.get("/cart", shopController.getCart);
router.get("/shop/orders", shopController.getOrders);

module.exports = router;
