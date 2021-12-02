const {getUser} = require('../models/User_models');
const jwt = require('jsonwebtoken');

exports.userInfo = async (req, res, next) => {
    console.log(req.params)
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
