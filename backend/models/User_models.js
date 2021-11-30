const {query} = require('../database/database');

module.exports.insertUser = async (name, firstname, email, password) => {
    try {
        await query("INSERT INTO `users` (`name`, `firstname`, `email`, `password`) VALUES (?,?,?,?)", [name, firstname, email, password]);
    }
    catch(err) {
        console.log(err);
        res.status(400).send({err: "L'inscription a échouée !"});
    }
};