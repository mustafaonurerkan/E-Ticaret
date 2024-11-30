// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Model yerine controller kullanýmý

// Tüm ürünleri listeleme
router.get('/', productController.getAllProducts);

// Belirli bir ürünü ID’ye göre getirme
router.get('/:id', productController.getProductById);

// Ürün oluþturma
router.post('/', productController.createProduct);

// Ürün güncelleme
router.put('/:id', productController.updateProduct);

// Ürün silme
router.delete('/:id', productController.deleteProduct);

// Belirli bir kategorideki ürünleri listeleme
router.get('/category/:category', productController.getByCategory);

// Ürüne týklamayý loglama ve popülerlik arttýrma
router.post('/click/:id', productController.logClick);

// Toplu ürün ekleme
router.post('/bulk', productController.createBulkProduct);
module.exports = router;
