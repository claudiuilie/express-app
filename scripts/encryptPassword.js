const encryptionUtils = require('../utils/encryptionUtils');
const password = process.env.PASSWORD;

(async function encrypt(){
    const encrypted = encryptionUtils.encrypt(password);
    console.log(encrypted);
})();