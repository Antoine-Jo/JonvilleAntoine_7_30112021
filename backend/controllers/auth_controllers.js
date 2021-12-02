const {insertUser, getOne} = require('../models/User_models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, { expiresIn: maxAge })
}

exports.signup = async (req, res, next) => {
    try {
        const name = req.body.name.trim(); const firstname = req.body.firstname.trim(); const email = req.body.email.trim(); const password = req.body.password.trim();
        if (name == "" || firstname == "" || email == "" || password == "") {
            return res.status(400).json({ message: 'Les champs doivent être remplis !'})
        }
        const salt = await bcrypt.genSalt();
        pwdhash = await bcrypt.hash(password, salt);
        await insertUser(name, firstname, email, pwdhash)
        res.status(200).json({message: 'Utilisateur créé !'})
    }
    catch(err) {
        console.log(err);
        res.status(500).send({err: 'Utilisateur non enregistré !'})
    }
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await getOne(email, password)
        
        if(user) {
            const auth = await bcrypt.compare(password, user.password);
            if(auth) {
                console.log(user.id);
                const token = createToken(user.id)
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })
                return res.status(200).json({user: user.id});
            }
            return res.status(400).send({message: 'Mot de passe incorrect !'})
        }
        return res.status(400).send({message: 'Email incorrect !'})
    }
    catch(err) {
        console.log(err);
        return res.status(500).send({err: 'Utilisateur non inscrit !'});
    }
}

exports.logout = (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json('OUT');
}