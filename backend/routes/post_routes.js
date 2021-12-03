const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post_controllers');
const auth = require('../middleware/auth_middleware');

// Routes CRUD pour les Posts
router.post('/', auth, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, postCtrl.updateOnePost);
router.delete('/:id', auth, postCtrl.deleteOnePost);

module.exports = router;