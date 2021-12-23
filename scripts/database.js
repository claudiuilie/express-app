const pool = require("../config/mySql");
const helper = require("../helpers/dbHelper");
const shell = require('shelljs')

// const code = shell.exec('mysql -u root -e "create database testdb";').code;
// console.log(code);

function exec(command) {

    return new Promise((resolve, reject) => shelljs.exec(command, {}, (code, value, error) => {
        if (error) {
            return reject(error)
        }
        resolve(code)
    }))
}

(async function execute(){
    const code = await shell.exec('mysql -u root -e "create database testdb";');
    console.log(code)
    console.log('finish');
})();

// shell.exec('exit');
// console.log(process.env.DB_APP_USER);
//
// async function createUsers() {
//
//
//     const rows = await pool.query(
//         `CREATE USER 'app_admin'@'%' IDENTIFIED BY 'BscPlatformAdmin2021';
//              GRANT ALL PRIVILEGES ON bsc_platform.* TO 'app_admin'@'%';
//              FLUSH PRIVILEGES;`,
//         [offset]
//     );
//     const data = helper.emptyOrRows(rows);
//     console.log(data);
// };