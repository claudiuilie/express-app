const {compare, hash} = require('bcrypt');
const saltRounds = 10;

module.exports = {
    encrypt: (password) => {
        return hash(password, saltRounds);
    },
    match: (password, passwordHash) => {
        return compare(password, passwordHash);
    }
};