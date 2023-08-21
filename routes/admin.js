const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.get("/admin/add", adminController.getAddProduct);
router.post("/admin/add", adminController.postAddProduct);
router.get("/admin/edit/:id", adminController.getEditedProductById);
router.post("/admin/edit/:id", adminController.postEditedProductById);
router.get("/admin/delete/:id", adminController.deleteProductById);
router.get("/admin", adminController.getAdminProducts);

router.get("/admin/login", adminController.getAdminLogin); 
router.post("/admin/login", adminController.postAdminLogin); 
router.get("/admin/logout", adminController.getAdminLogout); 
router.get("/admin/signup", adminController.getAdminSignup); 
router.post("/admin/signup", adminController.postAdminSignup); 

module.exports = router;
