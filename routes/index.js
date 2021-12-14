const express = require('express');
const router = express.Router();
const logger = require('../logger/logger');

/* GET home page. */
router.get('/', function (req, res, next) {
    logger.info({
        message: "test"
    });

    // res.render('index',{test:1})
    res.render('index', {
        message: {
            error: req.flash('error'),
            warn: req.flash('warn'),
            info: req.flash('info'),
            success: req.flash('success')
        }
    });
});

module.exports = router;
