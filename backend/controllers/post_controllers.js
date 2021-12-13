const { insertPost, updatePost, getPost, deletePost, getPosts } = require('../models/Post_models');
const jwt = require('jsonwebtoken');

const createPost = async (req, res, next) => {
    try {
        let text = req.body.text;
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        let userId = decodedToken.id
        await insertPost(userId, text)
        console.log(userId, text);
        res.status(200).json({message: 'Votre post a été envoyé !'})
    }
    catch(err) {
        return res
        .status(err.status ? err.status : 500)
        .send({err: err.msg ? err.msg : 'Erreur lors de la création du post !'})
    }
};

const getAllPost = async (req, res) => {
    try {
        const allPosts = await getPosts()
        return res.status(200).json(allPosts)
    }
    catch(err) {
        return res
        .status(err.status ? err.status : 500)
        .send({err: err.msg ? err.msg : 'Erreur lors de la récupération des posts !'})
    }
};

const getOnePost = async (req, res) => {
    try {
        const idposts = req.params.id
        const post = await getPost(idposts)
        if(!post) throw {status : 404, msg: "Ce post est introuvable !"}
        return res.status(200).json(post)
    }
    catch(err) {
        return res
        .status(err.status ? err.status : 500)
        .send({ err: err.msg ? err.msg : "Erreur lors de la récupération du post !"})
    }
};

const updateOnePost = async (req, res) => {
  try {
    // if (req.auth.role !== "admin") return
    const postId = req.params.id;
    const post = await getPost(postId);
    if (!post) throw {status:404, msg : "Ce post est introuvable !" };
    const text = req.body.text;
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;
    // if (userId !== post.userid) throw {status : 403, msg :"Vous n'avez pas l'autorisation de modifier ce post"}
    // if (admin == '0') throw {status : 403, msg :"Vous n'avez pas l'autorisation de modifier ce post"}
    await updatePost(text, postId);
    return res.status(200).send({ message: "Modification réussi !" });
  } catch (err) {
    console.log(err);
    return res
    .status(err.status ? err.status : 500)
    .send({ err: err.msg ?err.msg : "Erreur lors de la modification du post !" });
  }
};

const deleteOnePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await getPost(postId);
    if (!post) throw {status:404, msg : "Ce post est introuvable !" };

    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;

    if(userId !== post.userid) throw {status : 403, msg :"Vous n'avez pas l'autorisation de supprimer ce post"}

    await deletePost(postId, post.userid);
    return res.status(200).send({ message: "Suppression réussi !" });
    
  } catch(err) {
    return res
    .status(err.status ? err.status : 500)
    .send({ err: err.msg ?err.msg : "Erreur lors de la suppression du post !" });
  }
};

module.exports = {
    createPost,
    getAllPost,
    getOnePost,
    updateOnePost,
    deleteOnePost
}