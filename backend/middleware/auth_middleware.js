const jwt = require('jsonwebtoken');
const { findUser } = require('../models/User_models');

exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    try {

        if(token) {
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
                if(err) {
                    res.locals.user = null;
                    res.cookies('jwt', '', { maxAge: 1 });
                    res.status(401).json({ message: 'Non autorisé !'})
                    next();
                } else {
                    console.log(decodedToken.id);
                    let user = await findUser(decodedToken.id);
                    res.locals.user = user;
                    console.log(user);
                    next();
                }
            })
        } else {
            res.locals.user = null;
            res.clearCookie();
            next();
        }
    }
    catch(err) {
        res.clearCookie();
        console.log(err);
        res.status(401).json({ message: 'Non autorisé !'});
    }
}