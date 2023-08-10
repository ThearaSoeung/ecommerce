const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.get("/admin/add", adminController.getAddProduct);
router.post("/admin/add", adminController.postAddProduct);
router.get("/admin/edit/:id", adminController.getEditedProductById);
router.post("/admin/edit/:id", adminController.postEditedProductById);
router.get("/admin/delete/:id", adminController.deleteProductById);
router.get("/admin", adminController.getAdminProducts);

module.exports = router;
