const express = require('express');
const path = require('path');
const router = express.Router();
const notFoundController = require('../controllers/not-found');

router.use(notFoundController.getNotFoundPage);

module.exports = router;