// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Sipari� olu�turma
router.post('/', orderController.createOrder);

// T�m sipari�leri listeleme
router.get('/', orderController.getAllOrders);

// Belirli bir sipari�i ID�ye g�re getirme
router.get('/:id', orderController.getOrderById);

// Sipari� durumunu g�ncelleme
router.put('/:id', orderController.updateOrderStatus);

// Sipari�i silme
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
