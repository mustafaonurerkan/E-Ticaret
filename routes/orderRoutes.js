// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Sipari� olu�turma
router.post('/', async (req, res) => {
    try {
        const orderId = await Order.create(req.body);
        res.status(201).json({ orderId });
    } catch (error) {
        res.status(500).json({ error: 'Sipari� olu�turulamad�' });
    }
});

// T�m sipari�leri listeleme
router.get('/', async (req, res) => {
    try {
        const orders = await Order.getAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Sipari�ler getirilemedi' });
    }
});

module.exports = router;
