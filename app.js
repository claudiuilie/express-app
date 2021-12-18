const express = require('express');
const flash = require('connect-flash');
const hbsHelper = require('./helpers/hbsHelper');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const env = require('dotenv').config();
const routes = require('./routes');
const app = express();

require('./config/passport')();

app.engine('hbs', hbsHelper.engine);
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=',
    key: 'session',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(loggerMiddleware());

app.use(routes);

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.status(err.status || 500);

    if (req.app.get('env') === 'production') {
        req.flash('error', err.message);
        res.redirect('back');
    } else {
        res.json({message: err.stack});
    }
});

module.exports = app;
