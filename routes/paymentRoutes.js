const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Yeni bir �deme olu�tur
router.post('/', paymentController.createPayment);

// T�m �demeleri getir
router.get('/', paymentController.getAllPayments);

module.exports = router;
