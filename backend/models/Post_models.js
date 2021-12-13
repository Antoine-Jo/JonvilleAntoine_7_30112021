const { query } = require("../database/database")


const insertPost = async (userId, text) => {
    try {
        await query("INSERT INTO `posts` (`userid`, `text`, `createdate`) VALUES(?, ?, NOW())", [userId, text])
    }
    catch(err) {
        throw {status : 400, msg: "Une erreur est survenue !"};
    }
}

const getPosts = async () => {
    try {
        return await query("SELECT idposts, id, name, firstname, text, createdate FROM users INNER JOIN posts ON users.id = posts.userid ORDER BY createdate DESC");
    }
    catch(err){
        console.log(err);
        throw {status : 400, msg: "Une erreur est survenue !"};
    }
}

const getPost = async (idposts) => {
    try {
        const answer = await query("SELECT userid, name, firstname, admin, text, createdate FROM groupomania.users INNER JOIN groupomania.posts ON users.id = posts.userid WHERE idposts = ?", [idposts])
        return answer[0];
    }
    catch(err) {
        throw {status : 400, msg: "Une erreur est survenue !"};
    }
}

const updatePost = async (text, idposts) => {
    try {
        await query("UPDATE posts SET text = ? WHERE idposts = ?", [text, idposts])
    }
    catch(err) {
        console.log(err);
        throw {status : 400, msg: "Une erreur est survenue !"};
    }
}

const deletePost = async (idposts, userid) => {
    try {
        const answer = await query("DELETE FROM posts WHERE idposts = ? AND userid = ?", [idposts, userid])
        return answer[0];
    }
    catch(err) {
        throw {status : 400, msg: "Une erreur est survenue !"};
    }
}

module.exports = {
    deletePost,
    updatePost,
    getPost,
    getPosts,
    insertPost
}
