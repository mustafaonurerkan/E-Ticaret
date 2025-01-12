const express = require('express');
const router = express.Router();
const productManagerController = require('../controllers/productManagerController');

// Stok yönetimi
router.post('/stock', productManagerController.updateStock);
router.post('/comment/approve', productManagerController.approveComment);
router.post('/category', productManagerController.createCategory); // Yeni kategori ekleme
router.put('/category/:categoryId', productManagerController.updateCategory); // Kategori güncelleme
router.delete('/category/:categoryId', productManagerController.deleteCategory); // Kategori silme
router.get('/categories', productManagerController.getAllCategories); // Tüm kategorileri listeleme
router.get('/delivery-list', productManagerController.getDeliveryList); // Teslimat listesi


module.exports = router;
