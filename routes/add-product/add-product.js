const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../../util/path');

router.get('/product', (req, res, next) => {
    res.render('product', {
        pageTitle: 'Add Product',
        path: '/product',
        formsCSS: true,
        productCSS: true,
    });
});

module.exports = router;