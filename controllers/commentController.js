// controllers/commentController.js
const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
    const { userId, productId, rating, content } = req.body;
    try {
        const commentId = await Comment.create({ userId, productId, rating, content });
        res.status(201).json({ commentId, message: 'Comment added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Could not add comment' });
    }
};

exports.getCommentsByProductId = async (req, res) => {
    try {
        const comments = await Comment.getByProductId(req.params.productId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve comments' });
    }
};

// Yorum silme
exports.deleteComment = async (req, res) => {
    try {
        const success = await Comment.delete(req.params.id);
        if (success) {
            res.json({ message: 'Comment deleted successfully' });
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not delete comment' });
    }
};
