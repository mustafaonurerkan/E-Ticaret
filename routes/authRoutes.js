// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Kullan�c� kayd�
router.post('/register', authController.register);

// Kullan�c� giri�i
router.post('/login', authController.login);

module.exports = router;
