// controllers/commentController.js
const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
    try {
        const commentId = await Comment.create(req.body);
        res.status(201).json({ commentId });
    } catch (error) {
        res.status(500).json({ error: 'Could not create comment' });
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
