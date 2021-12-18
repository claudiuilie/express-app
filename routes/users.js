const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

/* GET users/all page. */
router.get('/all', userController.getAllUsers);

module.exports = router;