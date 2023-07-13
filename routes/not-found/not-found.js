const express = require('express');
const path = require('path');
const router = express.Router();

router.use((req, res, next) => {
    res.sendfile(path.join(__dirname, '../../views', 'not_found.html'));
});

module.exports = router;