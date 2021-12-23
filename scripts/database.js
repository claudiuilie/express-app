const shell = require('shelljs');
const params = getDbName({
    dbName: process.env.DB_NAME,
    dbAppUser: process.env.DB_APP_USER,
    dbAppUserPw: process.env.DB_APP_USER_PW,
    dbAdmin: process.env.DB_ADMIN,
    dbAdminPw: process.env.DB_ADMIN_PW,
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
    shell.echo(`Parameters; ${JSON.stringify(params)}`);
    await runScript(`mysql -u root -e "create database ${process.dbName}";`);
    await runScript();
    shell.echo('Database script ended successfully.');
}

check();


function createDbUser(username, database) {
    return `CREATE USER 'app_admin'@'%' IDENTIFIED BY 'BscPlatformAdmin2021';
            GRANT ALL PRIVILEGES ON bsc_platform.* TO 'app_admin'@'%';
            FLUSH PRIVILEGES;`;
}

