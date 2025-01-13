const express = require('express');
const router = express.Router();
const salesmanagerController = require('../controllers/salesmanagerController'); 

//applyDiscount
router.put('/applyDiscount', salesmanagerController.applyDiscount);

//applyRaise
router.put('/applyRaise', salesmanagerController.applyRaise);

//all orders and invoice as pdf and print
router.post('/salesreport', salesmanagerController.salesReport);

//refund reques
//router.post('/refundRequest', salesmanagerController.processRefund);

module.exports = router;