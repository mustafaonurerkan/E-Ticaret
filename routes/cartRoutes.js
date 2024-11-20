// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

//get all
router.get('/', cartController.getAllCarts);

// Sepete �r�n ekleme veya g�ncelleme
router.post('/add', cartController.addToCart);

// Sepetten �r�n kald�rma
router.delete('/remove', cartController.removeFromCart);

// Sepeti temizleme
router.post('/clear', cartController.clearCart);

// Kullan�c�n�n sepetini ayr�nt�l� olarak g�r�nt�leme
router.get('/:userId', cartController.getCart);

// Kullan�c�n�n sepetini basit formatta g�r�nt�leme
router.get('/:userId/items', cartController.getByUserId);

module.exports = router;
