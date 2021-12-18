const flash = require('../helpers/flashHelper');

module.exports = async (req,res,next) => {
    flash.persist(req,res);
    res.render('home',{test:1});
};