// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Tüm kategorileri listeleme
router.get('/', categoryController.getAllCategories);

// Yeni kategori ekleme
router.post('/', categoryController.createCategory);

// Kategori güncelleme
router.put('/:id', categoryController.updateCategory);

// Kategori silme
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
