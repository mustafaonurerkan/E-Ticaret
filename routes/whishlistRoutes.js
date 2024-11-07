// routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist');

// Ýstek listesine ürün ekleme
router.post('/', async (req, res) => {
    try {
        const wishlistId = await Wishlist.create(req.body);
        res.status(201).json({ wishlistId });
    } catch (error) {
        res.status(500).json({ error: 'Ürün istek listesine eklenemedi' });
    }
});

// Kullanýcýnýn istek listesini getirme
router.get('/user/:userId', async (req, res) => {
    try {
        const wishlist = await Wishlist.getByUserId(req.params.userId);
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ error: 'Ýstek listesi getirilemedi' });
    }
});

module.exports = router;
