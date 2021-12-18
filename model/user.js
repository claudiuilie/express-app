const pool = require("../config/mySql");
const helper = require("../helpers/dbHelper");
const listPerPage = parseInt(process.env.DB_LIMIT_LIST_PER_PAGE);

module.exports = {
    findAll: async (page = 1) => {
        const offset = helper.getOffset(page, listPerPage);
        const rows = await pool.query(
            'SELECT * from users LIMIT ?,?',
            [offset, listPerPage]
        );
        const data = helper.emptyOrRows(rows);
        const meta = {page};
        console.log(listPerPage);
        return {
            data,
            meta
        }
    },
    findOne: async (userName) => {
        return await pool.query(
            'SELECT * from users where userName = ?',
            [userName]
        );
    },
    findById: async (id) => {
        return await pool.query(
            'SELECT * from users where id = ?',
            [id]
        );
    }
};