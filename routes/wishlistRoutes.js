// routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
// get all
router.get('/', wishlistController.getAllWishes)

// �stek listesine �r�n ekleme
router.post('/', wishlistController.addToWishlist);

// Kullan�c�n�n istek listesini getirme
router.get('/user/:userId', wishlistController.getWishlistByUserId);

// Belirli bir istek listesi �gesini silme
router.delete('/:id', wishlistController.deleteWishlistItem);

// �stek listesinde isim ile �r�n arama
router.get('/user/:userId/search', wishlistController.getByName);

module.exports = router;
