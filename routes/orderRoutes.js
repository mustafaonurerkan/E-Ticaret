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

// To get order history
router.get('/user_id/:id', orderController.getOrderByUserID);

router.get('/user-products/:id', orderController.getPurchasedProducts);


// To send order receipt PDF to mail
router.post('/:id/sendPDF', orderController.sendOrderReceipt);

// Ýade talebi
router.post('/refund/request', orderController.createRefundRequest);

// Ýade taleplerini onaylama/reddetme
router.put('/refund/approve/:id', orderController.approveRefund);

module.exports = router;
