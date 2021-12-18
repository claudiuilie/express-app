const {createLogger, format, transports} = require('winston');
const {printf} = format;
const dateUtils = require('../utils/dateUtils');

const logger = createLogger({
    transports: [
        new transports.File({
            filename: `./logs/${dateUtils.localDateString()}/app.log`,
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.json(),
                format.colorize(),
                printf((info) => {
                    return `{"level":"${info.level}","message":"${info.message}","timestamp":"${info.timestamp}"}`;
                })
            ),
        }),
        new transports.Console({
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.errors({stack: true}),
                format.json(),
                format.colorize({level: true}),
                printf((info) => {
                    return `[${info.timestamp}] ${info.level}: ${info.message}`;
                })
            ),
        })
    ],
});

module.exports = logger;