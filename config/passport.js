const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');
const passport = require('passport');
const encryptionUtils = require('../utils/encryptionUtils');
const logger = require('../services/logger');

module.exports = () => {

    passport.use(new LocalStrategy(async (username, password, done) => {

        try {
            const rows = await User.findOne(username);
            if (!rows.length) {
                return done(null, false, {message: "Invalid credentials!"});
            } else {
                const hash = rows[0].password;
                logger.info(`Matching passport: ${username}@${hash}`);
                const match = await encryptionUtils.match(password, hash);
                if (!match) {
                    return done(null, false, {message: "Invalid credentials!"});
                } else {
                    logger.info(`Passport matched`);
                    return done(null, rows[0]);
                }
            }
        } catch (err) {
            logger.error(err);
            return done(null, false, {message: 'The operation couldn\'t be completed'});
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (userId, done) => {
        try {
            const user = await User.findById(userId);
            done(null, user[0]);
        } catch (err) {
            logger.error(err);
            done(err);
        }
    });
};