// sudo npm run database --DB_NAME= --DB_APP_USER_PW= --DB_ADMIN_PW=

const shell = require('shelljs');
const fs = require('fs');

const params = getDbName({
    DB_NAME: process.env.DB_NAME,
    DB_APP_USER: 'app_user',
    DB_APP_USER_PW: process.env.DB_APP_USER_PW,
    DB_ADMIN: 'app_admin',
    DB_ADMIN_PW: process.env.DB_ADMIN_PW,
});

const envContent =
    `APP_PORT=90
DB_HOST=localhost
DB_USER=${params.DB_APP_USER}
DB_PASSWORD=${params.DB_APP_USER_PW}
DB_DATABASE=${params.DB_NAME}
DB_LIMIT_CONNECTIONS=10
DB_LIMIT_QUEUE=0
DB_LIMIT_LIST_PER_PAGE=10
DB_WAIT_FOR_CONNECTIONS=true`;

function escapeShell(cmd) {
    return '"'+cmd.replace(/(["'$`\\])/g,'\\$1')+'"';
};

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

function updateEnvConfig(content) {
    shell.echo(`\nUpdating .env:\n${content}`);
    try {
        fs.writeFileSync('.env', content);
        shell.echo('\n.env successfully updated.');
    } catch (err) {
        shell.echo(err)
    }
}

(async function runScript() {
    shell.echo('Start database script...');
    shell.echo(`Parameters: ${JSON.stringify(params)}`);

    await exec(`mysql -u root -e "CREATE DATABASE ${params.DB_NAME}";`);
    await exec(`mysql -u root -e "CREATE USER '${params.DB_APP_USER}'@'localhost' IDENTIFIED BY '${params.DB_APP_USER_PW}';
            GRANT ALL PRIVILEGES ON ${params.DB_NAME}.* TO '${params.DB_APP_USER}'@'localhost';
            FLUSH PRIVILEGES;"`);
    await exec(`mysql -u root -e "CREATE USER '${params.DB_ADMIN}'@'%' IDENTIFIED BY '${params.DB_ADMIN_PW}';
            GRANT ALL PRIVILEGES ON ${params.DB_NAME}.* TO '${params.DB_ADMIN}'@'%';
            FLUSH PRIVILEGES;"`);
    await exec(`mysql -u root -e "CREATE TABLE ${params.DB_NAME}.users (id int(11) NOT NULL AUTO_INCREMENT,username varchar(100) NOT NULL,password varchar(100) NOT NULL,PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;"`);
    await exec(`mysql -u root -e "INSERT INTO ${params.DB_NAME}.users (id, username, password) VALUES(null, 'test', '${escapeShell('$2b$10$7l9mAr5UytdZrKFw8iBF7.Uf4pCH0wA2TAlNDDjcnl0HzvxEt2hje')}');"`);

    shell.echo(`Ui test user created :test@test`);
    shell.echo('\nDatabase script ended successfully.');
    shell.echo('Database connection settings:'+JSON.stringify(params));
    updateEnvConfig(envContent);
})();