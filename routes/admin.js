const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const isAuth = require('../middleware/is_auth');

router.get("/admin/add", isAuth, adminController.getAddProduct);

router.post("/admin/add", isAuth, adminController.postAddProduct);


router.get("/admin/edit/:id", isAuth, adminController.getEditedProductById);
router.post("/admin/edit/:id", isAuth, adminController.postEditedProductById);
router.get("/admin/delete/:id", isAuth, adminController.deleteProductById);
router.get("/admin", isAuth, adminController.getAdminProducts);

router.get("/admin/login", adminController.getAdminLogin); 
router.post("/admin/login", adminController.postAdminLogin); 
router.get("/admin/logout", adminController.getAdminLogout); 
router.get("/admin/signup", adminController.getAdminSignup); 
router.post("/admin/signup", adminController.postAdminSignup); 

router.get("/forgetpassword", adminController.getForgetPass);
router.post("/forgetpassword", adminController.postForgetPass);

router.get("/resetpassword/:token", adminController.getResetPass);
router.post("/resetpassword/:token", adminController.postResetPass);

module.exports = router;
