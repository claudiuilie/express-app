const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('../helpers/flashHelper');

router.get('/', (req, res) => {
    flash.persist(req, res);
    res.render('login', {
        layout: 'main'
    });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;