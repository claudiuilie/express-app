const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');
const passportMiddleware = require('../middleware/passportMiddleware');

/* GET home page. */
router.get('/',passportMiddleware,homeController);

module.exports = router;

