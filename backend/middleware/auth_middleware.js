const jwt = require('jsonwebtoken');
const { findUser } = require('../models/User_models');

module.exports = async (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        if(token) {
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
            const userId = decodedToken
            await findUser(userId, (err, result) => {

                if (err) {
                    return res.status(400).send('Requête non autorisée !')
                }
                req.auth = {
                    role : "user"
                }
            })
            next();
        } else {
            return res.status(401).json({ message: 'Non autorisé ! Veuillez vous connecter'})
        }
    }
    catch(err) {
        res.clearCookie();
        // console.log(err);
        return res.status(401).json({ message: 'Non autorisé !'});
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err) {
                console.log(err);
            } else {
                console.log(decodedToken.id);
                res.status(200).json(decodedToken.id)
                next();
            }
        })
    } else {
        console.log('No token');
        res.status(400).send({err: 'No token'})
    }
}