const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);

router.post('/', authenticate, articleController.createArticle);

router.put(
  '/:id', 
  authenticate, 
  authorize(['admin']), // Only admin can update any article
  articleController.updateArticle
);

router.delete(
  '/:id',
  authenticate,
  authorize(['admin']), // Only admin can delete any article
  articleController.deleteArticle
);

module.exports = router;