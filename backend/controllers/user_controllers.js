const {getUser, updateUser, deleteUser, getAllUsers, createPicture} = require('../models/User_models');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const userInfo = async (req, res, next) => {
    // console.log(req.params)
    // const token = req.cookies.jwt;
    // const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    // console.log(decodedToken.id);
    const user = await getUser(req.params.id)
        if(!user) {
            return res.status(404).send({ err: "Cet utilisateur n'existe pas"})
        } 
        delete user.password
        return res.status(200).json(user)
}

const allUsers = async (req, res, next) => {
    const users = await getAllUsers();
    if(!users) {
        return res.status(400).send({ err: "Impossible de récupérer les utilisateurs"})
    }
    return res.status(200).json(users)
}

const updateOneUser = async (req, res, next) => {
    const {name, firstname, email} = req.body
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    // TODO s'appuyer sur req.userInfo
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
        const user = await getUser(req.params.id)
        const filename = user.picture.split('/images/')[1];
        fs.unlink(`images/${filename}`, async () => {
            await deleteUser(req.params.id)
            res.cookie('jwt', '', { maxAge: 1 })
            return res.status(200).send({message: 'Votre compte a été supprimé !'})
        })
    }
    catch(err) {
        return res
        .status(err.status ? err.status : 500)
        .send({err: err.msg ? err.msg : 'Une erreur est survenue lors de la suppression du profil'})
    }
}

const uploadProfil = async (req, res) => {
    try {
        const picture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        console.log(req.file.filename);
        // const picture = req.file.name
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.id;
        await createPicture(picture, userId)
        return res.status(200).send({message: 'Image upload !'})
    } catch (err) {
        console.log(err)
        return res
        .status(err.status ? err.status : 500)
        .send({err: err.msg ? err.msg : "Une erreur est survenue lors de l'upload d'une photo"})
    }

}

module.exports = {
    userInfo,
    allUsers,
    updateOneUser,
    deleteOneUser,
    uploadProfil
}
