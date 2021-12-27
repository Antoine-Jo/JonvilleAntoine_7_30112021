const {insertUser, getOne} = require('../models/User_models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createCookie = (id, key, res) =>{
    return jwt.sign({id, key}, process.env.TOKEN_SECRET, { expiresIn: maxAge });
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })
}

const signup = async (req, res, next) => {
    try {
        // console.log(req)
        const name = req.body.name.trim(); const firstname = req.body.firstname.trim(); const email = req.body.email.trim(); const password = req.body.password.trim();
        
        if (name == "" || firstname == "" || email == "" || password == "") throw { status: 400, msg: 'Les champs doivent être remplis !'}
        
        const salt = await bcrypt.genSalt();
        pwdhash = await bcrypt.hash(password, salt);
        await insertUser(name, firstname, email, pwdhash)
        res.status(200).json({message: 'Utilisateur créé !'})
    }
    catch(err) {
        return res
        .status(err.status ? err.status : 500)
        .send({err: err.msg ? err.msg : 'Email déjà enregistré ! '})
    }
}

const login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await getOne(email, password)
        
        if(user) {
            const auth = await bcrypt.compare(password, user.password);
            if(auth) {
                const token = createCookie(user.id, user.key)
                // console.log(token);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })
                return res.status(200).json({user: user.id, key: user.key});
            }
            throw {status: 400, msg: 'Mot de passe incorrect !'}
        }
        throw {status: 400, msg: 'Email incorrect !'}
    }
    catch(err) {
        console.log(err);
        return res
        .status(err.status ? err.status : 500)
        .send({err: err.msg ? err.msg : 'Utilisateur non inscrit !'})
    }
}

const logout = (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({msg : 'Vous vous êtes déconnecté'});
}

module.exports = {
    signup,
    login,
    logout,
    createCookie
}