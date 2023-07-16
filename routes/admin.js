const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

const adminController = require('../controllers/admin');

router.get('/admin/add', adminController.getAddProduct);
router.post('/admin/add', adminController.postAddProduct);

//Todo 
router.get('/admin', adminController.getAdminProducts);

module.exports = router;