const encryptionUtils = require('../utils/encryptionUtils');
const password = process.env.PASSWORD;

(async function encrypt(){
    const encrypted = await encryptionUtils.encrypt(password);
    console.log(encrypted);
})();