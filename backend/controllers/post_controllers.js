const { insertPost, updatePost, getPost, deletePost, getPosts } = require('../models/Post_models');
const jwt = require('jsonwebtoken');


exports.createPost = async (req, res, next) => {
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
        console.log(err);
        return res.status(400).send('Une erreur est survenue !!')
    }
}

exports.getAllPost = async (req, res) => {
    try {
        const allPosts = await getPosts()
        return res.status(200).json(allPosts)
    }
    catch(err) {
        res.status(404).send({err})
    }
}

exports.getOnePost = async (req, res) => {
    try {
        const idposts = req.params.id
        const post = await getPost(idposts)
        // console.log(post);
        if(!post) {
            return res.status(400).send({ err: "Post inexistant !"})
        }
        return res.status(200).json(post)
    }
    catch {
        console.log(err);
        return res.status(400).send({ err: "Post inexistant !"})
    }
}

exports.updateOnePost = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await getPost(postId)
        if(!post) {
            return res.status(400).send({ err: "Post inexistant !"})
        } else {
            // res.status(200).json(post)
            const text = req.body.text;
            const token = req.cookies.jwt;
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
            const userId = decodedToken.id

            if (userId === post.userid) {
                await updatePost(text, postId, post.userid)
                return res.status(200).send({message: 'Modification réussi !'})
            } else {
                return res.status(400).send({err : "Vous n'êtes pas autorisé à modifier ce post !"})
            }
        }
    }
    catch(err) {
        console.log(err);
    }
}

exports.deleteOnePost = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await getPost(postId)
        if(!post) {
            return res.status(400).send({ err: "Post inexistant !"})
        } else {
            const token = req.cookies.jwt;
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
            const userId = decodedToken.id

            if (userId === post.userid) {
                await deletePost(postId, post.userid)
                return res.status(200).send({message: 'Suppression réussi !'})
            } else {
                return res.status(400).send("Vous n'êtes pas autorisé à supprimer ce post !")
            }
        }
    }
    catch {
        return res.status(400).send('Une erreur est survenue !!')
    }
}