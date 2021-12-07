const {query} = require('../database/database');

const insertUser = async (name, firstname, email, password) => {
    try {
        const user = await query("INSERT INTO `users` (`name`, `firstname`, `email`, `password`) VALUES (?,?,?,?)", [name, firstname, email, password]);
        return user;
    }
    catch(err) {
        // console.log(err);
        return res.status(400).send({err: "L'inscription a échouée !"});
    }
};

const getOne = async (email, password) => {
    try {
        const answer = await query("SELECT * FROM users WHERE email LIKE ?", [email, password]);
        return answer[0];
    }
    catch(err) {
        console.log(err);
        res.status(400).send({err: "L'utilisateur n'existe pas !"})
    }
}

const findUser = async (id) => {
    try {
        const answer = await query("SELECT id FROM users WHERE id LIKE ?", [id]);
        return answer[0];
    }
    catch(err) {
        return res.status(400).send({err: 'Utilisateur non trouvé !'})
    }
}

const getUser = async (id) => {
    try {
        const answer = await query("SELECT * FROM users WHERE users.id = ?", [id])
        return answer[0];
    }
    catch(err) {
        return res.status(400).json({ message: 'Utilisateur non trouvé !'});
    }
}

const updateUser = async (name, firstname, email, id) => {
    try {
        const answer = await query("UPDATE users SET name = ?, firstname = ?, email = ? WHERE users.id LIKE ?", [name, firstname, email, id])
        return answer[0];
    }
    catch(err) {
        console.log(err);
        return res.status(400).send({err: 'Impossible de modifier !'})
    }
}

const deleteUser = async (id) => {
    try {
        const answer = await query("DELETE FROM users WHERE id = ?", [id])
        return answer[0];
    }
    catch(err) {
        return res.status(400).send({err: 'Impossible de supprimer !'})
    }
}

module.exports = {
    insertUser,
    getOne,
    findUser,
    getUser,
    updateUser,
    deleteUser
}