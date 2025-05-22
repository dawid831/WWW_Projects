const Article = require('../models/Article');

exports.getAllArticles = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const filter = {};
    
    if (req.query.tag) filter.tags = req.query.tag;
    if (req.query.author) filter.author = req.query.author;

    const articles = await Article.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'username');

    res.json(articles);
  } catch (err) {
    next(err);
  }
};

exports.getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' }
      });

    if (!article) {
        return res.status(404).json({ message: 'Article not found' });
    }

    res.json(articles);
  } catch (err) {
    next(err);
  }
};

exports.createArticle = async (req, res, next) => {
  try {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
      tags: req.body.tags
    });
    
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
};

exports.updateArticle = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    
    const article = await Article.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id }, // Only author can update
      { title, content, tags, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found or unauthorized' });
    }

    res.json(article);
  } catch (err) {
    next(err);
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.id,
      $or: [
        { author: req.user.id }, // Author can delete
        { role: 'admin' }        // Admin can delete any
      ]
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found or unauthorized' });
    }

    // Also delete associated comments
    await Comment.deleteMany({ article: req.params.id });

    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    next(err);
  }
};
