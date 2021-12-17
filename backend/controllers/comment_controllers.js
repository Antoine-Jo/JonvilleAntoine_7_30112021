const { insertComment, getComments, getCommentsByPost, getOneComment, updateOneComment, deleteOneComment, countCommentByPost } = require("../models/Comment_models");
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
        const postId = parseInt(req.params.id);
        console.log(postId);
        
        const allComments = await getCommentsByPost(postId)
        
        if (!allComments) throw {status : 404, msg: "Ces commentaires sont introuvable !"}
        return res.status(200).json(allComments)
    } catch (err) {
        console.log(err);
        return res
        .status(err.status ? err.status : 500)
        .send({err: err.msg ? err.msg : 'Erreur lors de la récupération des commentaires !'})
    }
}

const countComment = async (req, res) => {
    try {
        const idpost = req.params.id
        const number = await countCommentByPost(idpost);
        console.log(number);
        return res.status(200).json(number)
    } catch (err) {
        console.log(err);
        return res
        .status(err.status ? err.status : 500)
        .send({ err: err.msg ?err.msg : "Erreur lors du comptage des commentaires" });
    }
}

const updateComment = async (req, res) => {
    try {
        const id = req.params.id
        const admin = req.body.admin;
        const text = req.body.text;
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.id
        const comment = await getOneComment(id)
        if (!comment) throw {status: 404, msg: "Ce commentaire est introuvable !"};
        console.log(userId, comment.id, id);

        if (admin === 1 || userId === comment.userId) {
            await updateOneComment(text, id)
            return res.status(200).send({ msg: "Modification réussi !" })
        }
        throw {status: 403, msg: "Vous n'avez pas l'autorisation de modifier ce commentaire"}
    } catch (err) {
        console.log(err);
        return res
        .status(err.status ? err.status : 500)
        .send({ err: err.msg ?err.msg : "Erreur lors de la modification du commentaire !" });
    }
}

const deleteComment = async (req, res) => {
    try {
        const id = req.params.id;
        const admin = req.body.admin;
        const comment = await getOneComment(id);

        if (!comment) throw {status: 404, msg: "Ce comment est introuvable :"}

        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.id;

        if(admin === 1 || userId === comment.userId) {
            await deleteOneComment(id)
            return res.status(200).send({ msg: "Suppression réussi !" })
        }
        throw {status: 403, msg: "Vous n'avez pas l'autorisation de supprimer ce post"}

    } catch (err) {
        console.log(err);
        return res
        .status(err.status ? err.status : 500)
        .send({ err: err.msg ?err.msg : "Erreur lors de la suppression du commentaire !" });
    }
}

module.exports = {
    createComment,
    getAllComments,
    getAllCommentsByPost,
    countComment,
    updateComment,
    deleteComment
}