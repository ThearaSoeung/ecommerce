const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

const adminController = require('../controllers/admin');

router.get('/admin/add', adminController.getAddProduct);
router.post('/admin/add', adminController.postAddProduct);
router.get('/admin/delete', adminController.getDeletedProduct);
router.get('/admin/delete/:id', adminController.deleteProductById);
router.delete('/admin/delete', adminController.DeletedProduct);

router.get('/admin/edit/:id', adminController.getEditedProductById);
router.post('/admin/edit/:id', adminController.postEditedProductById);
router.put('/admin/edit', adminController.editProduct);

//Todo 
router.get('/admin', adminController.getAdminProducts);

module.exports = router;