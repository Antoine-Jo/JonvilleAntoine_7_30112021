const { insertPost, updatePost, getPost, deletePost, getPosts, getLike, createLike, deleteLike, getAllLikes, countLikes } = require('../models/Post_models');
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

    const postId = req.params.id;
    const admin = req.body.admin;
    const post = await getPost(postId);

    if (!post) throw {status:404, msg : "Ce post est introuvable !" };
    
    const text = req.body.text;
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;
    
    if (admin === 1 || userId === post.userid) {
      await updatePost(text, postId);
      return res.status(200).send({ message: "Modification réussi !" });
    }
    throw {status : 403, msg :"Vous n'avez pas l'autorisation de modifier ce post"}
  } 
  catch (err) {
    console.log(err);
    return res
    .status(err.status ? err.status : 500)
    .send({ err: err.msg ?err.msg : "Erreur lors de la modification du post !" });
  }
};

const deleteOnePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const admin = req.body.admin;
    const post = await getPost(postId);

    if (!post) throw {status:404, msg : "Ce post est introuvable !" };

    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;

    if(admin === 1 || userId === post.userid) {
      await deletePost(postId, post.userid);
      return res.status(200).send({ message: "Suppression réussi !" });
    } 
    throw {status : 403, msg :"Vous n'avez pas l'autorisation de supprimer ce post"}
  } 
  catch(err) {
    return res
    .status(err.status ? err.status : 500)
    .send({ err: err.msg ?err.msg : "Erreur lors de la suppression du post !" });
  }
};

const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;

    const likes = await getLike(userId, postId)

    if (likes === 0 ) {
      await createLike(userId, postId)
      return res.status(200).json({likes})
      // send({ message: "Le post est like !"})
    } else {
      await deleteLike(userId, postId)
      return res.status(200).json({likes})
      // send({ message: "Le post a été dislike !"})
    }
  } catch (err) {
    // console.log(err);
    return res
    .status(err.status ? err.status : 500)
    .send({ err: err.msg ?err.msg : "Erreur lors d'un like/unlike !" });
  }
}

const allLikesByPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;

    const likes = await getAllLikes(userId, postId)
    // console.log(likes);
    return res.status(200).json(likes)
  } catch (err) {
    console.log(err);
    return res
    .status(err.status ? err.status : 500)
    .send({ err: err.msg ?err.msg : "Erreur lors de la récupération des likes !" });
  }
}

const countLikesByPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const number = await countLikes(postId);

    return res.status(200).json(number)
  } catch (err) {
    console.log(err);
    return res
    .status(err.status ? err.status : 500)
    .send({ err: err.msg ?err.msg : "Erreur lors de la récupération des likes !" });
  }
}

module.exports = {
    createPost,
    getAllPost,
    getOnePost,
    updateOnePost,
    deleteOnePost,
    likePost,
    allLikesByPost,
    countLikesByPost
}