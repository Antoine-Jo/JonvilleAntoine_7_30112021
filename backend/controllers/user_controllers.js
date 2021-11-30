const {insertUser} = require('../models/User_models');
const bcrypt = require('bcrypt');


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
        res.status(500).send({err: 'Utilisateur non inscrit !'})
    }
}