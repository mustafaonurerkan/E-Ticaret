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

// To get order history
router.get('/user_id/:id', orderController.getOrderByUserID);

router.get('/user-products/:id', orderController.getPurchasedProducts);


// To send order receipt PDF to mail
router.post('/:id/sendPDF', orderController.sendOrderReceipt);

// �ade talebi
router.post('/refund/request', orderController.createRefundRequest);

// �ade taleplerini onaylama/reddetme
router.put('/refund/approve/:id', orderController.approveRefund);

module.exports = router;
