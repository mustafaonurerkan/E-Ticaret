// routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist');

// �stek listesine �r�n ekleme
router.post('/', async (req, res) => {
    try {
        const wishlistId = await Wishlist.create(req.body);
        res.status(201).json({ wishlistId });
    } catch (error) {
        res.status(500).json({ error: '�r�n istek listesine eklenemedi' });
    }
});

// Kullan�c�n�n istek listesini getirme
router.get('/user/:userId', async (req, res) => {
    try {
        const wishlist = await Wishlist.getByUserId(req.params.userId);
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ error: '�stek listesi getirilemedi' });
    }
});

module.exports = router;
