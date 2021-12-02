const {query} = require('../database/database');

exports.insertUser = async (name, firstname, email, password) => {
    try {
        await query("INSERT INTO `users` (`name`, `firstname`, `email`, `password`) VALUES (?,?,?,?)", [name, firstname, email, password]);
    }
    catch(err) {
        console.log(err);
        return res.status(400).send({err: "L'inscription a échouée !"});
    }
};

exports.getOne = async (email, password) => {
    try {
        const answer = await query("SELECT * FROM users WHERE email LIKE ?", [email, password]);
        return answer[0];
    }
    catch(err) {
        console.log(err);
        res.status(400).send({err: "L'utilisateur n'existe pas !"})
    }
}

exports.findUser = async (id) => {
    try {
        const answer = await query("SELECT id FROM users WHERE id LIKE ?", [id]);
        return answer[0];
    }
    catch(err) {
        return res.status(400).send({err: 'Utilisateur non trouvé !'})
    }
}

exports.getUser = async (id) => {
    try {
        const answer = await query("SELECT * FROM users WHERE users.id = ?", [id])
        return answer[0];
    }
    catch(err) {
        return res.status(400).json({ message: 'Utilisateur non trouvé !'});
    }
}

exports.updateUser = async (name, firstname, email, id) => {
    try {
        const answer = await query("UPDATE users SET name = ?, firstname = ?, email = ? WHERE users.id LIKE ?", [name, firstname, email, id])
        return answer[0];
    }
    catch(err) {
        console.log(err);
        return res.status(400).send({err: 'Impossible de modifier !'})
    }
}