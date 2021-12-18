const logger = require('../services/logger');

module.exports = {
    error: (req, err) => {
        logger.error(`${err.code}: ${err}`);
        if(err.code !== undefined){
            req.flash('error',`The operation couldn't be completed: ${err.code}`);
        }else{
            req.flash('error','The operation couldn\'t be completed');
        }
    },
    info: (req, message) => {
        logger.info(message);
        req.flash('info', message);
    },
    warn: (req, message) => {
        logger.warn(message);
        req.flash('warn', message);
    },
    success: (req, message) => {
        logger.warn(message);
        req.flash('success', message);
    },
    persist: (req, res) => {
        res.locals.message = req.flash();
    }
};