// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Tüm ürünleri listeleme
router.get('/', async (req, res) => {
    try {
        const products = await Product.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Ürünler getirilemedi' });
    }
});

// Ürün oluþturma
router.post('/', async (req, res) => {
    try {
        const productId = await Product.create(req.body);
        res.status(201).json({ productId });
    } catch (error) {
        res.status(500).json({ error: 'Ürün oluþturulamadý' });
    }
});

module.exports = router;
