const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
    const { user_id, product_id, content } = req.body;

    try {
        const hasPurchased = await Comment.hasPurchased(user_id, product_id);
        if (!hasPurchased) {
            return res.status(403).json({ error: 'You cannot comment on a product you have not purchased.' });
        }

        const commentId = await Comment.create({ user_id, product_id, content, rating: null });
        res.status(201).json({ message: 'Comment added successfully', comment_id: commentId });
    } catch (error) {
        console.error('Error creating comment:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addRating = async (req, res) => {
    const { user_id, product_id, rating } = req.body;

    try {
        const hasPurchased = await Comment.hasPurchased(user_id, product_id);
        if (!hasPurchased) {
            return res.status(403).json({ error: 'You cannot rate a product you have not purchased.' });
        }

        const ratingId = await Comment.addRating(user_id, product_id, rating);
        res.status(201).json({ message: 'Rating added successfully', rating_id: ratingId });
    } catch (error) {
        console.error('Error adding rating:', error.message);
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

exports.approveComment = async (req, res) => {
    const { user_id, comment_id } = req.body;

    try {
        // Kullan�c�n�n rol�n� kontrol et
        const role = await Comment.getUserRole(user_id);
        if (role !== 'product_manager') {
            return res.status(403).json({ error: 'You do not have permission to approve comments' });
        }

        // Yorumu onayla
        const success = await Comment.approve(comment_id);
        if (!success) {
            return res.status(404).json({ error: 'Comment not found or could not be approved' });
        }

        res.status(200).json({ message: 'Comment approved successfully' });
    } catch (error) {
        console.error('Error approving comment:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


