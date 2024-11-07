// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Tüm kullanýcýlarý listeleme
router.get('/', async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Kullanýcýlar getirilemedi' });
    }
});

// Belirli bir kullanýcýyý ID’ye göre getirme
router.get('/:id', async (req, res) => {
    try {
        const user = await User.getById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Kullanýcý getirilemedi' });
    }
});

module.exports = router;
