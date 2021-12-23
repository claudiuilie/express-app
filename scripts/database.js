const shell = require('shelljs');
const fs = require('fs');

const params = getDbName({
    DB_NAME: process.env.DB_NAME,
    DB_USER: 'app_user',
    DB_APP_USER_PW: process.env.DB_APP_USER_PW,
    DB_ADMIN: 'app_admin',
    DB_ADMIN_PW: process.env.DB_ADMIN_PW,
});

const envContent =
    `APP_PORT=90
DB_HOST=localhost
DB_USER=${params.DB_USER}
DB_PASSWORD=${params.DB_APP_USER_PW}
DB_DATABASE=${params.DB_NAME}
DB_LIMIT_CONNECTIONS=10
DB_LIMIT_QUEUE=0
DB_LIMIT_LIST_PER_PAGE=10
DB_WAIT_FOR_CONNECTIONS=true`;

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

async function exec(script) {
    shell.echo(' ');
    shell.echo(`Execute script: ${script}`);
    const process = await shell.exec(script);
    if (process.code !== 0) {
        shell.exit(1);
    }
    shell.echo(`code: ${process.code}`);
    shell.echo(`message: ${process.stdout === '' ? 'Success' : process.stdout}`);
}

function createDbUser(username, database) {
    return `CREATE USER 'app_admin'@'%' IDENTIFIED BY 'BscPlatformAdmin2021';
            GRANT ALL PRIVILEGES ON bsc_platform.* TO 'app_admin'@'%';
            FLUSH PRIVILEGES;`;
}

function updateEnvConfig(content) {
    shell.echo(`Updating .env:\n${content}`);
    try {
        fs.writeFileSync('.env', content);
        shell.echo('.env successfully updated.');
    } catch (err) {
        shell.echo(err)
    }
}

(async function runScript() {
    shell.echo('Start database script...');
    shell.echo(`Parameters: ${JSON.stringify(params)}`);
    await exec(`mysql -u root -e "create database ${params.DB_NAME}";`);
    shell.echo('Database script ended successfully.');
    shell.echo('Database connection settings:'+JSON.stringify(params))
    updateEnvConfig(envContent);
})();