// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// T�m kullan�c�lar� listeleme
router.get('/', async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Kullan�c�lar getirilemedi' });
    }
});

// Belirli bir kullan�c�y� ID�ye g�re getirme
router.get('/:id', async (req, res) => {
    try {
        const user = await User.getById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Kullan�c� getirilemedi' });
    }
});

module.exports = router;
