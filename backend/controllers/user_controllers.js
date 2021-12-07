const {getUser, updateUser, deleteUser} = require('../models/User_models');
const jwt = require('jsonwebtoken');

const userInfo = async (req, res, next) => {
    // console.log(req.params)
    // const token = req.cookies.jwt;
    // const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    // console.log(decodedToken.id);
    const user = await getUser(req.params.id)
        if(!user) {
            return res.status(400).send({ err: "Utilisateur inexistant !"})
        } else {
            delete user.password
            return res.status(200).json(user)
        }
}

const updateOneUser = async (req, res, next) => {
    const {name, firstname, email} = req.body
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
   try {
       if(decodedToken.id != req.params.id) {
        return res.status(200).send({err : "Vous n'êtes pas autorisé à modifier ce profil !"})
           
        }
        else {
            await updateUser(name, firstname, email, req.params.id)
            return res.status(200).send({message: 'Modification réussi !'})
        }
   }
   catch(err) {
       console.log(err);
        return res.status(400).send('Une erreur est survenue !!')
   }
}

const deleteOneUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    try {
        if(decodedToken.id == req.params.id) {
            await deleteUser(req.params.id)
            res.cookie('jwt', '', { maxAge: 1 })
            return res.status(200).send({message: 'Votre compte a été supprimé !'})
        } else {
            return res.status(200).send({err: "Vous n'êtes pas autorisé à supprimer ce profil !"})
        }
    }
    catch(err) {
        return res.status(400).send('Une erreur est survenue !!')
    }
}

module.exports = {
    userInfo,
    updateOneUser,
    deleteOneUser
}
