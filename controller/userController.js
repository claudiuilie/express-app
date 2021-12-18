const user = require('../model/user');
const flash = require('../helpers/flashHelper');

module.exports = {

    getAllUsers: async (req, res) => {
        let users;
        try {
            users = await user.findAll();
            flash.info(req, JSON.stringify(users))
        } catch (err) {
            flash.error(req, err);
        }

        flash.persist(req, res);
        res.json(users);
    }
};
