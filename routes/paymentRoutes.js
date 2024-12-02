const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Yeni bir ödeme oluþtur
router.post('/', paymentController.createPayment);

// Tüm ödemeleri getir
router.get('/', paymentController.getAllPayments);

module.exports = router;
