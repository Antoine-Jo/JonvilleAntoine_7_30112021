const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ err: 'Le mot de passe doit contenir 8 caractères, dont une majuscule, une minuscule, et 1 chiffre'})
    } else {
        next();
    }
}