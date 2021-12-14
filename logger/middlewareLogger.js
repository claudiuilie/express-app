const expressWinston = require('express-winston');
const {format, transports} = require('winston');
const dateUtils = require('../utils/dateUtils');


module.exports = () => {
    return expressWinston.logger({
        transports: [
            new transports.File({filename: `./logs/${dateUtils.localDateString()}/middleware.log`}),
        ],

        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.colorize(),
            format.json()
        ),
        statusLevels: false,
        level: function (req, res) {
            let level = "";
            if (res.statusCode >= 100) {
                level = "info";
            }
            if (res.statusCode >= 400) {
                level = "warn";
            }
            if (res.statusCode >= 500) {
                level = "error";
            }
            if (res.statusCode === 401 || res.statusCode === 403) {
                level = "critical";
            }
            return level;
        },
        meta: true,
        dynamicMeta: (req, res) => {
            return {
                user: req.user ? req.user.username : null,
                role: req.user ? req.user.role : null,
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            }
        },
        responseWhitelist:["statusMessage","locals"],
        ignoreRoute:  (req, res) => {
            let excludedRoutes = ["/favicon.ico"];
            return excludedRoutes.includes(req.url);
        }
    })
};