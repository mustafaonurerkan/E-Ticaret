// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// get all
router.get('/', commentController.getAllComments);

// Yorum ekleme
router.post('/create', commentController.createComment);

// Bir ürün için yorumlarý listeleme
router.get('/product/:id', commentController.getCommentsByProductId);

// Belirli bir yorumu silme
router.delete('/:id', commentController.deleteComment);

// onaysýzlarý getir
router.get('/unapproved', commentController.getUnapproved);

module.exports = router;
