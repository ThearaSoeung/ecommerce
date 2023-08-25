const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");
const isAuth = require('../middleware/is_auth');

router.get("", shopController.getLandingPage);
router.get("/shop/products", shopController.getProduct);
router.get("/shop/products/:productId", shopController.getProdectDetailById);
//router.post("/shop/products", shopController.postProduct);

router.post("/cart/:id", isAuth, shopController.addCartById);
router.get("/cart", isAuth, shopController.getCart);

router.post("/cart/remove/:id", isAuth, shopController.removeCartById);
router.post("/cart/update/:id", isAuth, shopController.updateCartById);


router.get("/shop/orders", isAuth, shopController.getOrders);
router.post("/shop/orders", isAuth, shopController.postOrders);

router.post("/shop/orders/removed/:id", isAuth, shopController.removedAllOrdersFromUser);
router.post("/shop/orders/completed/:id", isAuth, shopController.completedAllOrdersFromUser);
router.get("/orders/finished/:id", isAuth, shopController.markOrdersAsCompeleted);

router.get("/shop/invoices/:id", isAuth, shopController.getInvoice);

module.exports = router;
