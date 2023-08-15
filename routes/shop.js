const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("", shopController.getLandingPage);
router.get("/shop/products", shopController.getProduct);
router.get("/shop/products/:productId", shopController.getProdectDetailById);
router.post("/shop/products", shopController.postProduct);

router.post("/cart/:id", shopController.addCartById);
router.get("/cart", shopController.getCart);

router.post("/cart/remove/:id", shopController.removeCartById);
router.post("/cart/update/:id", shopController.updateCartById);


router.get("/shop/orders", shopController.getOrders);
router.post("/shop/orders", shopController.postOrders);

router.post("/shop/orders/remove", shopController.removeAllOrdersFromUser);




module.exports = router;
