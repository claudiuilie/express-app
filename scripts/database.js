const shell = require('shelljs');
console.log(process.env.DB_NAME);
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
    await runScript('mysql -u root -e "create database testdb";');
    await runScript()
    shell.echo('Database script ended successfully.');
}

check();


function createDbUser(username, database){
    return `CREATE USER 'app_admin'@'%' IDENTIFIED BY 'BscPlatformAdmin2021';
            GRANT ALL PRIVILEGES ON bsc_platform.* TO 'app_admin'@'%';
            FLUSH PRIVILEGES;`;
}

