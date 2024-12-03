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

// Yorum onaylama rotasý
router.post('/approve', commentController.approveComment);
/*
onaylama için post ve body þu þekilde olmalý:
{
    "user_id": 13, //onaylamayý gönderen user
    "comment_id": 5 //onaylanacak comment
}
*/

module.exports = router;
