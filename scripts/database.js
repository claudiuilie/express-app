const pool = require("../config/mySql");
const helper = require("../helpers/dbHelper");
const shell = require('shelljs')

shell.echo('Test')
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