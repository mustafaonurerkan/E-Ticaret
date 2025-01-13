// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// get all
router.get('/', commentController.getAllComments);

// Yorum ekleme
router.post('/create', commentController.createComment);

// Bir �r�n i�in yorumlar� listeleme
router.get('/product/:id', commentController.getCommentsByProductId);

// Belirli bir yorumu silme
router.delete('/:id', commentController.deleteComment);

// onays�zlar� getir
router.get('/unapproved', commentController.getUnapproved);

// Yorum onaylama rotas�
router.post('/approve', commentController.approveComment);
/*
onaylama i�in post ve body �u �ekilde olmal�:
{
    "user_id": 13, //onaylamay� g�nderen user
    "comment_id": 5 //onaylanacak comment
}
*/
router.post('/add-rating', commentController.addRating);

module.exports = router;
