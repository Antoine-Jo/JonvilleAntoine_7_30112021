const {getUser} = require('../models/User_models');

exports.userInfo = async (req, res, next) => {
    console.log(req.params)
    const user = await getUser(req.params.id)
        if(!user) {
            return res.status(400).send({ err: 'ID inconnu : ' + req.params.id })
        } 
        delete user.password
        return res.status(200).json(user)
}