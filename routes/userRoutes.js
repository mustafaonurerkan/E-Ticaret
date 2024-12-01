// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // User yerine userController kullanýmý

// Tüm kullanýcýlarý listeleme
router.get('/', userController.getAllUsers);

// Belirli bir kullanýcýyý ID’ye göre getirme
router.get('/:id', userController.getUserById);

// Kullanýcý silme
router.delete('/:id', userController.deleteUser);

module.exports = router;