const express = require('express');
const flash = require('connect-flash');
const hbsHelper = require('./helpers/hbsHelper');
const path = require('path');
const session      = require('express-session');
const middleWareLogger = require('./logger/middlewareLogger');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', hbsHelper.engine);
app.set('view engine', 'hbs');


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));


app.use(middleWareLogger());

app.get('/error', function(req, res, next) {
    // here we cause an error in the pipeline so we see express-winston in action.
    return next(new Error("This is an error and it should be logged to the console"));
});

app.use('/', indexRouter);

app.get('/contact', (req, res) => {
    req.flash('error', 'This is a message from the "/" endpoint - error');
    req.flash('warn', 'This is a message from the "/" endpoint - warn');
    req.flash('info', 'This is a message from the "/" endpoint - info');
    req.flash('success', 'This is a message from the "/" endpoint - success');
    res.redirect("/");
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.status(err.status || 500);

    if(req.app.get('env') === 'production'){
        req.flash('error', err.message);
        res.redirect('back');
    }else{
        res.json({ message: err.stack});
    }

});

module.exports = app;
