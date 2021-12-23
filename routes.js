const express = require('express');
const router = express.Router();

router.use('/', require('./routes/home'));
router.use('/users', require('./routes/users'));
router.use('/login', require('./routes/login'));
router.use('/logout', require('./routes/logout'));

module.exports = router;