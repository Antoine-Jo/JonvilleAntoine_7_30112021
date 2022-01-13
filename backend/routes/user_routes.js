const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth_middleware');
const authCtrl = require('../controllers/auth_controllers');
const userCtrl = require('../controllers/user_controllers');
const multer = require('../middleware/multer-config')
const checkPassword = require("../middleware/check-password");

// Route authentification
router.post("/signup", checkPassword, authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/logout', authCtrl.logout);

// Routes GET / UPDATE / DELETE
router.get('/', auth, userCtrl.allUsers);
router.get('/:id', auth, userCtrl.userInfo);
router.put('/:id', auth, userCtrl.updateOneUser);
router.delete('/:id', auth, userCtrl.deleteOneUser);

// Upload images
router.post('/upload', auth, multer, userCtrl.uploadProfil)

module.exports = router;