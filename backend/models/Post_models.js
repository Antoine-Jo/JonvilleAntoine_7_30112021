const { query } = require("../database/database")


exports.insertPost = async (userId, text) => {
    try {
        await query("INSERT INTO `posts` (`userid`, `text`, `createdate`) VALUES(?, ?, NOW())", [userId, text])
    }
    catch(err) {
        console.log(err);
        return res.status(400).send({err: 'Création du post a échouée !'})
    }
}

exports.getPosts = async () => {
    try {
        return await query("SELECT * FROM posts ORDER BY createdate DESC");
    }
    catch {
        res.status(400).send("Une erreur est survenue !")
    }
}

exports.getPost = async (idposts) => {
    try {
        const answer = await query("SELECT * FROM posts WHERE idposts = ?", [idposts])
        return answer[0];
    }
    catch(err) {
        return res.status(400).json({ message: 'Post non trouvé !'});
    }
}

exports.updatePost = async (text, idposts, userid) => {
    try {
        await query("UPDATE posts SET text = ? WHERE idposts = ? AND userid = ?", [text, idposts, userid])
    }
    catch {
        console.log(err);
        return res.status(400).send({err: 'Impossible de modifier !'})
    }
}

exports.deletePost = async (idposts, userid) => {
    try {
        const answer = await query("DELETE FROM posts WHERE idposts = ? AND userid = ?", [idposts, userid])
        return answer[0];
    }
    catch {
        return res.status(400).send({err: 'Impossible à supprimer !'})
    }
}