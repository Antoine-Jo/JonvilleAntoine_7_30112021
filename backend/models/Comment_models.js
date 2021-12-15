const { query } = require('../database/database');

const insertComment = async (userId, postId, text) => {
    try {
        await query("INSERT INTO `comments` (`userId`, `postId`, `text`, `create_time`) VALUES(?, ?, ?, NOW())", [userId, postId, text])
    } catch (err) {
        console.log(err);
        throw {status: 400, msg: "Une erreur est survenue !"}
    }
}

const getComments = async () => {
    try {
        return await query("SELECT comments.id, comments.userId, postId, comments.text, create_time FROM posts INNER JOIN comments ON comments.postId = posts.idposts ORDER BY create_time DESC");
    } catch (err) {
        console.log(err);
        throw {status: 400, msg: 'Une erreur est survenue !'};
    }
}

const getCommentsByPost = async (postId) => {
    try { //FIXME Fix la requête SQL qui n'est pas correct pour récupérer tout les com d'un post précis
        return await query("SELECT * FROM comments WHERE comments.postId = ? ORDER BY create_time DESC", [postId]);
        // return answer[0];
    } catch (err) {
        console.log(err);
        throw {status : 400, msg: "Une erreur est survenue !"};
    }
}

const getOneComment = async (id) => {
    try {
        const answer = await query("SELECT * FROM comments WHERE comments.id = ?", [id])
        return answer[0];
    } catch (err) {
        console.log(err);
        throw {status : 400, msg: "Une erreur est survenue !"};
    }
}

const updateOneComment = async (text, id) => {
    try {
        await query("UPDATE comments SET text = ? WHERE comments.id = ?", [text, id])
    } catch (err) {
        console.log(err);
        throw {status : 400, msg: "Une erreur est survenue !"};
    }
}

const deleteOneComment = async (id) => {
    try {
        const answer = await query("DELETE FROM comments WHERE comments.id = ?", [id])
        return answer[0];
    } catch (err) {
        console.log(err);
        throw {status : 400, msg: "Une erreur est survenue !"};
    }
}

module.exports = {
    insertComment,
    getComments,
    getCommentsByPost,
    getOneComment,
    updateOneComment,
    deleteOneComment
}