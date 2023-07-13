const express = require('express');
const path = require('path');
const router = express.Router();

router.use((req, res, next) => {
    //res.sendFile(path.join(__dirname, '../../views', 'not_found.ejs'));
    res.render('not_found', {
        pageTitle: 'Not found'
      });
});

module.exports = router;