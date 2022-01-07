const encryptionUtils = require('../utils/encryptionUtils');
const password = process.env.PASSWORD;

(async function encrypt(){
    if (password === undefined || password === '') {
        throw new Error(`PASSWORD is undefined!`)
    }
    const encrypted = await encryptionUtils.encrypt(password);
    console.log(encrypted);
})();