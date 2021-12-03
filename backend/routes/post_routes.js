const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post_controllers');
const auth = require('../middleware/auth_middleware');

// Routes CRUD pour les Posts
router.post('/', auth, postCtrl.createPost);

module.exports = router;