// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Yorum ekleme
router.post('/', async (req, res) => {
    try {
        const commentId = await Comment.create(req.body);
        res.status(201).json({ commentId });
    } catch (error) {
        res.status(500).json({ error: 'Yorum oluþturulamadý' });
    }
});

// Bir ürün için yorumlarý listeleme
router.get('/product/:productId', async (req, res) => {
    try {
        const comments = await Comment.getByProductId(req.params.productId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Yorumlar getirilemedi' });
    }
});

module.exports = router;
