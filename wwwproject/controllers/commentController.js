const Comment = require('../models/Comment');

exports.createComment = async (req, res, next) => {
  try {
    const comment = new Comment({
      content: req.body.content,
      article: req.body.articleId,
      author: req.user.id
    });
    
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

exports.getCommentsByArticle = async (req, res, next) => {
  try {
    const comments = await Comment.find({ 
      article: req.params.articleId 
    }).populate('author', 'username');
    
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
      $or: [
        { author: req.user.id }, // Either author
        { role: 'admin' }        // Or admin
      ]
    });
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found or unauthorized' });
    }
    
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    next(err);
  }
};