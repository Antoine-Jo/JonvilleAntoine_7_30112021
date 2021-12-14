const jwt = require('jsonwebtoken');
const { findUser, updateKey } = require('../models/User_models');
const {createCookie} = require("../controllers/auth_controllers");
const maxAge = 3 * 24 * 60 * 60 * 1000;
module.exports = async (req, res, next) => {
    try {
        //BUG Problème de vérif key token => key bdd, à faire plus tard
        const token = req.cookies.jwt;
        if(!token)  throw {status : 401, msg : 'Non autorisé ! Veuillez vous connecter'};
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userInfo = await findUser(decodedToken.id);
        if (decodedToken.key === undefined || decodedToken.id === undefined) throw {status : 401, msg : 'jeton non valide'};
        // delete req.userInfo.password
        // console.log(req.userInfo);
        
        // if (req.userInfo.key !== decodedToken.key) throw {status : 401, msg : "le jeton ne correspond pas à la base de donnée"};
        if (req.userInfo === undefined) throw {status : 401, msg : 'l\'utilisateur n\'existe pas'};
        const newKey = randomKey();
        await updateKey(newKey, decodedToken.id);
        // console.log(decodedToken.id, newKey);
        createCookie(decodedToken.id, newKey, (res) => {

           return res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })
        });
        // console.log(token);
        next();
    }
    catch(err) { //err : { status, msg}
        res.clearCookie();
        console.log(err);
        return res
            .status(err.status ? err.status : 500)
            .json({ message: err.msg ? err.msg : "Houston on a un problème :("});
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

function randomKey() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}