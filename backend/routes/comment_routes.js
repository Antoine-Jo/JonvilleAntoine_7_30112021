const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment_controllers');
const auth = require('../middleware/auth_middleware');

// Routes CRUD pour les commentaires
router.post('/comment/:id', auth, commentCtrl.createComment);
router.get('/allComments', auth, commentCtrl.getAllComments);
router.get('/allComments/:id', auth, commentCtrl.getAllCommentsByPost);
router.get('/comments/:id', auth, commentCtrl.countComment)
router.put('/comment/:id', auth, commentCtrl.updateComment);
router.delete('/comment/:id', auth, commentCtrl.deleteComment);

module.exports = router;