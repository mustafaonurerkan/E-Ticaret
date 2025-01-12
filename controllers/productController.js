// controllers/productController.js
const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve products' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        // �r�n� ID'ye g�re veritaban�ndan al
        const product = await Product.getById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        // �r�n bulunduysa pop�lerlik art�rma fonksiyonunu �a��r
        const popularityUpdated = await Product.incrementPopularity(req.params.id);

        // E�er pop�lerlik ba�ar�yla artt�ysa, g�ncel pop�lerlik de�eri ile �r�n� d�nd�r
        if (popularityUpdated) {
            const updatedProduct = await Product.getById(req.params.id); // Pop�lerlik sonras� g�ncel �r�n� tekrar getir
            res.json(updatedProduct); // G�ncel �r�n� d�nd�r
        } else {
            res.json(product); // E�er pop�lerlik artt�r�lamad�ysa, orijinal �r�n� d�nd�r
        }

    } catch (error) {
        console.error('Error retrieving product:', error);
        res.status(500).json({ error: 'Could not retrieve product' });
    }
};


exports.createProduct = async (req, res) => {
    try {
        const productId = await Product.create(req.body);
        res.status(201).json({ productId });
    } catch (error) {
        res.status(500).json({ error: 'Could not create product' });
    }
};

// �r�n g�ncelleme
exports.updateProduct = async (req, res) => {
    try {
        const success = await Product.update(req.params.id, req.body);
        if (success) {
            res.json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not update product' });
    }
};

// �r�n silme
exports.deleteProduct = async (req, res) => {
    try {
        const success = await Product.delete(req.params.id);
        if (success) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not delete product' });
    }
};

exports.getByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const products = await Product.getByCategory(category);
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found in this category' });
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// �r�ne t�klama loglama ve pop�lerli�i art�rma
exports.logClick = async (req, res) => {
    const productId = req.params.id;
    try {
        // Pop�lerli�i art�r
        const success = await Product.incrementPopularity(productId);

        if (success) {
            res.status(200).json({ message: 'Product popularity updated successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error logging click:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Toplu �r�n ekleme
exports.createBulkProduct = async (req, res) => {
    const products = req.body; // Gelen JSON dizisini al
    try {
        const result = [];
        for (const product of products) {
            const newProduct = await Product.create(product); // Her bir �r�n� veritaban�na ekle
            result.push(newProduct); // Ba�ar�l� �r�nleri diziye ekle
        }
        res.status(201).json({ success: true, data: result }); // T�m eklenen �r�nlerin ba�ar�yla d�nd�r�lmesi
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not create products' });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const { key } = req.params; // URL'den arama anahtarını al
        const products = await Product.searchByKey(key); // Model'den arama yap

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' }); // Eğer sonuç yoksa mesaj döndür
        }

        res.json(products); // Eşleşen ürünleri JSON olarak döndür
    } catch (error) {
        console.error('Error searching products:', error.message);
        res.status(500).json({ error: 'Internal server error' }); // Genel bir hata mesajı döndür
    }
};

exports.updateStock = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const success = await Product.updateStock(productId, quantity);
        if (success) res.json({ message: 'Stock updated successfully' });
        else res.status(404).json({ error: 'Product not found' });
    } catch (error) {
        res.status(500).json({ error: 'Could not update stock' });
    }
};

