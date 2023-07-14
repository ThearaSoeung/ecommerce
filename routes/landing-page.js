const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');
const landingPageController = require('../controllers/landing-page');

router.get('', landingPageController.getLandingPage);

module.exports = router;