const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;