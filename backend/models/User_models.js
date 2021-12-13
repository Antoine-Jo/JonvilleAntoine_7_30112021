const {query} = require('../database/database');

const insertUser = async (name, firstname, email, password) => {
    try {
        const user = await query("INSERT INTO `users` (`name`, `firstname`, `email`, `password`) VALUES (?,?,?,?)", [name, firstname, email, password]);
        return user;
    }
    catch(err) {
        throw {status : 400};
    }
};

const getAllUsers = async () => {
    try {
        return await query("SELECT id, name, firstname, email, admin FROM users");
    } 
    catch (err) {
        throw {status: 400};
    }
}

const getOne = async (email, password) => {
    try {
        const answer = await query("SELECT * FROM users WHERE email LIKE ?", [email, password]);
        return answer[0];
    }
    catch(err) {
        throw {status : 400};
    }
}

const findUser = async (id) => {
    try {
        const answer = await query("SELECT id FROM users WHERE id LIKE ?", [id]);
        return answer[0];
    }
    catch(err) {
        throw {status : 400};
    }
}

const getUser = async (id) => {
    try {
        const answer = await query("SELECT * FROM users WHERE users.id = ?", [id])
        return answer[0];
    }
    catch(err) {
        throw {status : 400};
    }
}

const updateUser = async (name, firstname, email, id) => {
    try {
        const answer = await query("UPDATE users SET name = ?, firstname = ?, email = ? WHERE users.id LIKE ?", [name, firstname, email, id])
        return answer[0];
    }
    catch(err) {
        throw {status : 400};
    }
}

const deleteUser = async (id) => {
    try {
        const answer = await query("DELETE FROM users WHERE id = ?", [id])
        return answer[0];
    }
    catch(err) {
        throw {status : 400};
    }
}

module.exports = {
    insertUser,
    getAllUsers,
    getOne,
    findUser,
    getUser,
    updateUser,
    deleteUser
}