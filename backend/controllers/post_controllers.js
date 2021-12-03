const { insertPost } = require('../models/Post_models');
const jwt = require('jsonwebtoken');


exports.createPost = async (req, res, next) => {
    try {
        let text = req.body.text;
        let userId = req.body.userId
        await insertPost(userId, text)
        console.log(userId, text);
        res.status(200).json({message: 'Votre post a été envoyé !'})
    }
    catch(err) {
        console.log(err);
        return res.status(400).send('Une erreur est survenue !!')
    }
}