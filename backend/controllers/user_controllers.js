const {getUser, updateUser, deleteUser} = require('../models/User_models');
const jwt = require('jsonwebtoken');

const userInfo = async (req, res, next) => {
    // console.log(req.params)
    // const token = req.cookies.jwt;
    // const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    // console.log(decodedToken.id);
    const user = await getUser(req.params.id)
        if(!user) {
            return res.status(400).send({ err: "Cet utilisateur n'existe pas"})
        } 
        delete user.password
        return res.status(200).json(user)
}

const updateOneUser = async (req, res, next) => {
    const {name, firstname, email} = req.body
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
   try {
       if(decodedToken.id != req.params.id) throw {status: 403, msg: "Vous n'avez pas l'autorisation de modifier ce profil"}
        
        await updateUser(name, firstname, email, req.params.id)
        return res.status(200).send({message: 'Modification réussi !'})
   }
   catch(err) {
        return res
        .status(err.status ? err.status : 500)
        .send({err: err.msg ? err.msg : 'Erreur lors de la modification du profil'})
   }
}

const deleteOneUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    try {
        if(decodedToken.id != req.params.id) throw {status: 403, msg: "Vous n'avez pas l'autorisation de supprimer ce profil"}
       
        await deleteUser(req.params.id)
        res.cookie('jwt', '', { maxAge: 1 })
        return res.status(200).send({message: 'Votre compte a été supprimé !'})
    }
    catch(err) {
        return res
        .status(err.status ? err.status : 500)
        .send({err: err.msg ? err.msg : 'Une erreur est survenue lors de la suppression du profil'})
    }
}

module.exports = {
    userInfo,
    updateOneUser,
    deleteOneUser
}
