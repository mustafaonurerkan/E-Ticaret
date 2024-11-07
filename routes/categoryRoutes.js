// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Tüm kategorileri listeleme
router.get('/', async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Kategoriler getirilemedi' });
    }
});

module.exports = router;
