const Product = require('../models/product');

// Controller to get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve products.' });
    }
};

// Controller to get a single product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.getById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve product.' });
    }
};

// Controller to create a new product
const createProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const productId = await Product.create(newProduct);
        res.status(201).json({ message: 'Product created successfully.', productId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create product.' });
    }
};

// Controller to update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = req.body;

        const success = await Product.update(id, updatedProduct);

        if (!success) {
            return res.status(404).json({ message: 'Product not found or no changes made.' });
        }

        res.json({ message: 'Product updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update product.' });
    }
};

// Controller to delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const success = await Product.delete(id);

        if (!success) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete product.' });
    }
};

// Controller to get products by category
const getByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.getByCategory(category);

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found in this category.' });
        }

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve products by category.' });
    }
};

// Controller to filter products by models
const getProductsByModels = async (req, res) => {
    try {
        const { models } = req.query; // Expect a comma-separated list of models
        const modelArray = models ? models.split(',') : [];
        const products = await Product.getByModels(modelArray);

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for the selected models.' });
        }

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve products by models.' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getByCategory,
    getProductsByModels,
};
