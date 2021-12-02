const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth_controllers');
const userCtrl = require('../controllers/user_controllers');
const auth = require('../middleware/auth_middleware');

// Route authentification
router.post("/signup", authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/logout', authCtrl.logout);

// Routes GET / UPDATE / DELETE
router.get('/:id', auth, userCtrl.userInfo);
router.put('/:id', auth, userCtrl.updateOneUser);

module.exports = router;