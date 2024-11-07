// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Sepete �r�n ekleme veya g�ncelleme
router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        await Cart.updateCart(userId, productId, quantity);
        res.json({ message: '�r�n sepete eklendi/g�ncellendi' });
    } catch (error) {
        res.status(500).json({ error: 'Sepete �r�n eklenemedi' });
    }
});

// Sepetten �r�n kald�rma
router.delete('/remove', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        await Cart.removeFromCart(userId, productId);
        res.json({ message: '�r�n sepetten kald�r�ld�' });
    } catch (error) {
        res.status(500).json({ error: '�r�n sepetten kald�r�lamad�' });
    }
});

module.exports = router;
