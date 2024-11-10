// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Yorum ekleme
router.post('/', commentController.createComment);

// Bir ürün için yorumlarý listeleme
router.get('/product/:productId', commentController.getCommentsByProductId);

// Belirli bir yorumu silme
router.delete('/:id', commentController.deleteComment);

module.exports = router;
