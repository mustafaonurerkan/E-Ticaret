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
        // Ürünü ID'ye göre veritabanýndan al
        const product = await Product.getById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        // Ürün bulunduysa popülerlik artýrma fonksiyonunu çaðýr
        const popularityUpdated = await Product.incrementPopularity(req.params.id);

        // Eðer popülerlik baþarýyla arttýysa, güncel popülerlik deðeri ile ürünü döndür
        if (popularityUpdated) {
            const updatedProduct = await Product.getById(req.params.id); // Popülerlik sonrasý güncel ürünü tekrar getir
            res.json(updatedProduct); // Güncel ürünü döndür
        } else {
            res.json(product); // Eðer popülerlik arttýrýlamadýysa, orijinal ürünü döndür
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

// Ürün güncelleme
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

// Ürün silme
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


// Ürüne týklama loglama ve popülerliði artýrma
exports.logClick = async (req, res) => {
    const productId = req.params.id;
    try {
        // Popülerliði artýr
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


// Toplu ürün ekleme
exports.createBulkProduct = async (req, res) => {
    const products = req.body; // Gelen JSON dizisini al
    try {
        const result = [];
        for (const product of products) {
            const newProduct = await Product.create(product); // Her bir ürünü veritabanýna ekle
            result.push(newProduct); // Baþarýlý ürünleri diziye ekle
        }
        res.status(201).json({ success: true, data: result }); // Tüm eklenen ürünlerin baþarýyla döndürülmesi
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not create products' });
    }
};