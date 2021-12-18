const mysql = require('mysql2/promise');
const logger = require('../services/logger');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: process.env.DB_LIMIT_CONNECTIONS,
    queueLimit: process.env.DB_LIMIT_QUEUE,
    waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS,
});

module.exports = {
    query: async (sql, params) => {
        logger.info(`Execute query: ${sql}`);
        const [rows, fields] = await pool.query(sql, params);
        return rows;
    }
};