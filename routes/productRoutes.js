// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// T�m �r�nleri listeleme
router.get('/', async (req, res) => {
    try {
        const products = await Product.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: '�r�nler getirilemedi' });
    }
});

// �r�n olu�turma
router.post('/', async (req, res) => {
    try {
        const productId = await Product.create(req.body);
        res.status(201).json({ productId });
    } catch (error) {
        res.status(500).json({ error: '�r�n olu�turulamad�' });
    }
});

module.exports = router;
