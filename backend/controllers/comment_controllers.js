const { insertComment, getComments, getCommentsByPost } = require("../models/Comment_models");
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
        // console.log(err);
        return res
        .status(err.status ? err.status : 500)
        .send({err: err.msg ? err.msg : 'Erreur lors de la création du commentaire'})
    }
}

const getAllComments = async (req, res) => {
    try {
        const allComments = await getComments();
        return res.status(200).json(allComments);
    } catch (err) {
        // console.log(err);
        return res
        .status(err.status ? err.status : 500)
        .send({err: err.msg ? err.msg : 'Erreur lors de la récupération des commentaires !'})
    }
}

const getAllCommentsByPost = async (req, res) => {
    try {
        let postId = req.params.id
        console.log(postId);
        const comments = await getCommentsByPost(postId)
        if (!comments) throw {status : 404, msg: "Ces commentaires sont introuvable !"}
        return res.status(200).json(comments)
    } catch (err) {
        console.log(err);
        return res
        .status(err.status ? err.status : 500)
        .send({err: err.msg ? err.msg : 'Erreur lors de la récupération des commentaires !'})
    }
}

module.exports = {
    createComment,
    getAllComments,
    getAllCommentsByPost
}