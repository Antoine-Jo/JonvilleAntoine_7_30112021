const { query } = require("express")


exports.insertPost = async (userId, text) => {
    try {
        await query("INSERT INTO `posts` (`userid`, `text`, `createdate`) VALUES(?, ?, NOW())", [userId, text])
    }
    catch(err) {
        console.log(err);
        return res.status(400).send({err: 'Création du post a échouée !'})
    }
}