// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// T�m �r�nleri listeleme
router.get('/', productController.getAllProducts);

// Belirli bir �r�n� ID�ye g�re getirme
router.get('/:id', productController.getProductById);

// �r�n olu�turma
router.post('/', productController.createProduct);

// �r�n g�ncelleme
router.put('/:id', productController.updateProduct);

// �r�n silme
router.delete('/:id', productController.deleteProduct);

// Belirli bir kategorideki �r�nleri listeleme
router.get('/category/:category', productController.getByCategory);

router.get('/filter', productController.getProductsByModels);

module.exports = router;
