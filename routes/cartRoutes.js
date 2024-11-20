// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

//get all
router.get('/', cartController.getAllCarts);

// Sepete ürün ekleme veya güncelleme
router.post('/add', cartController.addToCart);

// Sepetten ürün kaldýrma
router.delete('/remove', cartController.removeFromCart);

// Sepeti temizleme
router.post('/clear', cartController.clearCart);

// Kullanýcýnýn sepetini ayrýntýlý olarak görüntüleme
router.get('/:userId', cartController.getCart);

// Kullanýcýnýn sepetini basit formatta görüntüleme
router.get('/:userId/items', cartController.getByUserId);

module.exports = router;
