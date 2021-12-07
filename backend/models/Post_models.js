const { query } = require("../database/database")


exports.insertPost = async (userId, text) => {
    try {
        await query("INSERT INTO `posts` (`userid`, `text`, `createdate`) VALUES(?, ?, NOW())", [userId, text])
    }
    catch(err) {
        throw {status : 400, msg: "Une erreur est survenue !"};
    }
}

exports.getPosts = async () => {
    try {
        return await query("SELECT * FROM posts ORDER BY createdate DESC");
    }
    catch(err){
        throw {status : 400, msg: "Une erreur est survenue !"};
    }
}

exports.getPost = async (idposts) => {
    try {
        const answer = await query("SELECT * FROM posts WHERE idposts = ?", [idposts])
        return answer[0];
    }
    catch(err) {
        throw {status : 400, msg: "Une erreur est survenue !"};
    }
}

exports.updatePost = async (text, idposts, userid) => {
    try {
        await query("UPDATE posts SET text = ? WHERE idposts = ? AND userid = ?", [text, idposts, userid])
    }
    catch(err) {
        throw {status : 400, msg: "Une erreur est survenue !"};
    }
}

exports.deletePost = async (idposts, userid) => {
    try {
        const answer = await query("DELETE FROM posts WHERE idposts = ? AND userid = ?", [idposts, userid])
        return answer[0];
    }
    catch(err) {
        throw {status : 400, msg: "Une erreur est survenue !"};
    }
}