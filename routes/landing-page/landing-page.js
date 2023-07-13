const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../../util/path');

router.get('', (req, res, next) => {
    res.sendfile(path.join(rootDir, 'views', 'homepage.ejs')); 
});

module.exports = router;