// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Kullanýcý kaydý
router.post('/register', authController.register);

// Kullanýcý giriþi
router.post('/login', authController.login);

module.exports = router;
