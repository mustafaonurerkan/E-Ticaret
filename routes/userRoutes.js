// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // User yerine userController kullan�m�

// T�m kullan�c�lar� listeleme
router.get('/', userController.getAllUsers);

// Belirli bir kullan�c�y� ID�ye g�re getirme
router.get('/:id', userController.getUserById);

// Kullan�c� silme
router.delete('/:id', userController.deleteUser);

module.exports = router;