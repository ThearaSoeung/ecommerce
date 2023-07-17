const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

const adminController = require('../controllers/admin');

router.get('/admin/add', adminController.getAddProduct);
router.post('/admin/add', adminController.postAddProduct);
router.get('/admin/delete', adminController.getDeletedProduct);
router.delete('/admin/delete', adminController.deleteProduct);
router.get('/admin/edit', adminController.getEditedProduct);
router.put('/admin/edit', adminController.editProduct);

//Todo 
router.get('/admin', adminController.getAdminProducts);

module.exports = router;