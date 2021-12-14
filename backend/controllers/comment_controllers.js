const { insertComment } = require("../models/Comment_models");
const jwt = require('jsonwebtoken');

const createComment = async (req, res, next) => {
    try {
        let text = req.body.text;
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        let userId = decodedToken.id;
        let postId = req.params.id;
        console.log(userId, postId, text);

        await insertComment(userId, postId, text);
        res.status(200).json({message: "Votre commentaire a été créé"})
    } catch (err) {
        console.log(err);
        return res
        .status(err.status ? err.status : 500)
        .send({err: err.msg ? err.msg : 'Erreur lors de la création du commentaire'})
    }
}

module.exports = {
    createComment
}