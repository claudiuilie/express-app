const shell = require('shelljs');
const crypto = require('../utils/encryptionUtils');

const params = getDbName({
    DB_NAME: process.env.DB_NAME,
    DB_USER: 'app_user',
    DB_APP_USER_PW: process.env.DB_APP_USER_PW,
    DB_ADMIN: 'app_admin',
    DB_ADMIN_PW: process.env.DB_ADMIN_PW,
});

function getDbName(param) {
    const keys = Object.keys(param);
    for (let key in keys) {
        const value = param[`${keys[key]}`];
        if (value === undefined || value === '') {
            throw new Error(`${keys[key]} is undefined!`)
        }
    }
    return param;
}


function exec(command) {
    return new Promise((resolve, reject) => shelljs.exec(command, {}, (code, value, error) => {
        if (!error) {
            return reject(error)
        }
        resolve(code)
    }));
}

async function runScript(script) {
    shell.echo(' ');
    shell.echo(`Execute script: ${script}`);
    const process = await shell.exec(script);
    if (process.code !== 0) {
        shell.exit(1);
    }
    shell.echo(`code: ${process.code}`);
    shell.echo(`message: ${process.stdout === '' ? 'Success' : process.stdout}`);
}

async function check() {
    shell.echo('Start database script...');
    shell.echo(`Parameters: ${JSON.stringify(params)}`);
    await runScript(`mysql -u root -e "create database ${params.DB_NAME}";`);
    shell.echo('Database script ended successfully.');
    shell.echo(`.env properties:
    APP_PORT=90
    DB_HOST=localhost
    DB_USER=${params.DB_USER}
    DB_PASSWORD=${await crypto.encrypt(params.DB_APP_USER_PW)}
    DB_DATABASE=${params.DB_NAME}
    DB_LIMIT_CONNECTIONS=10
    DB_LIMIT_QUEUE=0
    DB_LIMIT_LIST_PER_PAGE=10
    DB_WAIT_FOR_CONNECTIONS=true`);
}

check();


function createDbUser(username, database) {
    return `CREATE USER 'app_admin'@'%' IDENTIFIED BY 'BscPlatformAdmin2021';
            GRANT ALL PRIVILEGES ON bsc_platform.* TO 'app_admin'@'%';
            FLUSH PRIVILEGES;`;
}

