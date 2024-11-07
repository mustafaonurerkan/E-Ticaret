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
