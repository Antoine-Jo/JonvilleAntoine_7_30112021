const {query, getOne} = require('../database/database');

module.exports.insertUser = async (name, firstname, email, password) => {
    try {
        await query("INSERT INTO `users` (`name`, `firstname`, `email`, `password`) VALUES (?,?,?,?)", [name, firstname, email, password]);
    }
    catch(err) {
        console.log(err);
        return res.status(400).send({err: "L'inscription a échouée !"});
    }
};

module.exports.getOne = async (email, password) => {
    try {
        const answer = await query("SELECT * FROM users WHERE email LIKE ?", [email, password]);
        return answer[0];
    }
    catch(err) {
        console.log(err);
        res.status(400).send({err: "L'utilisateur n'existe pas !"})
    }
}