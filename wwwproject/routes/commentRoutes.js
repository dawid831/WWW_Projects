const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, commentController.createComment);

router.get('/article/:articleId', commentController.getCommentsByArticle);

router.delete('/:id', authenticate, commentController.deleteComment);

module.exports = router;