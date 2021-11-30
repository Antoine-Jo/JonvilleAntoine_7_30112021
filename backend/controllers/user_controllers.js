const {insertUser} = require('../models/User_models');


exports.signup = async (req, res, next) => {
    try {
        const name = req.body.name; const firstname = req.body.firstname; const email = req.body.email; const password = req.body.password;
        await insertUser(name, firstname, email, password)
        res.status(200).json({message: 'Utilisateur créé !'})
    }
    catch(err) {
        console.log(err);
        res.status(500).send({err: 'Utilisateur non inscrit !'})
    }
}