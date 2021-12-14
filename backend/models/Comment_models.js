const { query } = require('../database/database');

const insertComment = async (userId, postId, text) => {
    try {
        await query("INSERT INTO `comments` (`userId`, `postId`, `text`, `create_time`) VALUES(?, ?, ?, NOW())", [userId, postId, text])
    } catch (err) {
        console.log(err);
        throw {status: 400, msg: "Une erreur est survenue !"}
    }
}

module.exports = {
    insertComment
}