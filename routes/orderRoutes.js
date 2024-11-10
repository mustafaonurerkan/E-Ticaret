// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Sipariþ oluþturma
router.post('/', orderController.createOrder);

// Tüm sipariþleri listeleme
router.get('/', orderController.getAllOrders);

// Belirli bir sipariþi ID’ye göre getirme
router.get('/:id', orderController.getOrderById);

// Sipariþ durumunu güncelleme
router.put('/:id', orderController.updateOrderStatus);

// Sipariþi silme
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
