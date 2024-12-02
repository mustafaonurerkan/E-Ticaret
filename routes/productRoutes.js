// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Model yerine controller kullan�m�

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

// �r�ne t�klamay� loglama ve pop�lerlik artt�rma
router.post('/click/:id', productController.logClick);

router.get('/search/:key', productController.searchProducts);

// Toplu �r�n ekleme
router.post('/bulk', productController.createBulkProduct);
module.exports = router;
