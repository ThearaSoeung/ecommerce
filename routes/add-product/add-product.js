const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../../util/path');

router.get('/product', (req, res, next) => {
    res.sendfile(path.join(rootDir, 'views', 'product.html'));
});

module.exports = router;