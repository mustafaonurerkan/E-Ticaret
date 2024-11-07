// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Sepete ürün ekleme veya güncelleme
router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        await Cart.updateCart(userId, productId, quantity);
        res.json({ message: 'Ürün sepete eklendi/güncellendi' });
    } catch (error) {
        res.status(500).json({ error: 'Sepete ürün eklenemedi' });
    }
});

// Sepetten ürün kaldýrma
router.delete('/remove', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        await Cart.removeFromCart(userId, productId);
        res.json({ message: 'Ürün sepetten kaldýrýldý' });
    } catch (error) {
        res.status(500).json({ error: 'Ürün sepetten kaldýrýlamadý' });
    }
});

module.exports = router;
