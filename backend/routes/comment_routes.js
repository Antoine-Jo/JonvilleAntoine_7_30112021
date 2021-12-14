const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment_controllers');
const auth = require('../middleware/auth_middleware');

// Routes CRUD pour les commentaires
router.post('/', auth, commentCtrl.createComment);
router.get('/', auth, commentCtrl.getAllComments);
router.get('/:id', auth, commentCtrl.getOneComment);
router.put('/:id', auth, commentCtrl.updateOneComment);
router.delete('/:id', auth, commentCtrl.deleteOneComment);