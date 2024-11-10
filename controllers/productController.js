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
        const product = await Product.getById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
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
