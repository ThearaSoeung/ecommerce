const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../../util/path');

router.get('', (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'homepage.ejs')); 
    res.render('homepage', {
        pageTitle: 'Homepage',
        path: '/',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });

});

module.exports = router;