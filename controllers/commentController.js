// controllers/commentController.js
const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
    const { user_id, product_id, rating, content, approved } = req.body;
    try {
        // Kullanýcýnýn ürünü satýn alýp almadýðýný kontrol et
        const hasPurchased = await Comment.hasPurchased(user_id, product_id);
        if (!hasPurchased) {
            return res.status(403).json({ error: 'You cannot comment on a product you have not purchased.' });
        }

        // Yorum ekleme iþlemi
        const commentId = await Comment.create({ user_id, product_id, rating, content });
        res.status(201).json({ message: 'Comment added successfully', comment_id: commentId });
    } catch (error) {
        console.error('Error creating comment:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getCommentsByProductId = async (req, res) => {
    try {
        const comments = await Comment.getByProductId(req.params.id);
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

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.getAll();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve comments' });
    }
};

exports.getUnapproved = async (req, res) => {
    try {
        const comments = await Comment.getUnapproved();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve unapproved comments' });
    }
};



