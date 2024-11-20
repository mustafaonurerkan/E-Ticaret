// routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
// get all
router.get('/', wishlistController.getAllWishes)

// Ýstek listesine ürün ekleme
router.post('/', wishlistController.addToWishlist);

// Kullanýcýnýn istek listesini getirme
router.get('/user/:userId', wishlistController.getWishlistByUserId);

// Belirli bir istek listesi ögesini silme
router.delete('/:id', wishlistController.deleteWishlistItem);

// Ýstek listesinde isim ile ürün arama
router.get('/user/:userId/search', wishlistController.getByName);

module.exports = router;
