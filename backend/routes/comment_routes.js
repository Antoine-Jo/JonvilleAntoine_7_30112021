const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment_controllers');
const auth = require('../middleware/auth_middleware');

// Routes CRUD pour les commentaires
router.post('/comment/:postId', auth, commentCtrl.createComment);
router.get('/allComments', auth, commentCtrl.getAllComments);
router.get('/:postId', auth, commentCtrl.getAllCommentsByPost);
// router.put('/:id', auth, commentCtrl.updateOneComment);
// router.delete('/:id', auth, commentCtrl.deleteOneComment);

module.exports = router;