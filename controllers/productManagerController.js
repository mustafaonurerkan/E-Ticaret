const Product = require('../models/product');
const Category = require('../models/category');
const Comment = require('../models/comment');
const Order = require('../models/order');

// Stok Yönetimi
exports.updateStock = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const updated = await Product.updateStock(productId, quantity);
        if (updated) {
            res.json({ message: 'Stock updated successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update stock', detail: error.message });
    }
};

// Yorum Onayı
exports.approveComment = async (req, res) => {
    const { commentId } = req.body;
    try {
        const approved = await Comment.approve(commentId);
        if (approved) {
            res.json({ message: 'Comment approved successfully' });
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to approve comment', detail: error.message });
    }
};

// Yeni Kategori Oluşturma
exports.createCategory = async (req, res) => {
    const { categoryName } = req.body;
    try {
        const categoryId = await Category.create({ name: categoryName });
        res.status(201).json({ message: 'Category created successfully', categoryId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category', detail: error.message });
    }
};


exports.updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { category_name } = req.body; // Yeni kategori adı
    try {
        const success = await Category.update(categoryId, category_name);
        if (success) {
            res.json({ message: 'Category updated successfully' });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        console.error('Error updating category:', error.message);
        res.status(500).json({ error: 'Failed to update category', detail: error.message });
    }
};


exports.deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const success = await Category.delete(categoryId);
        if (success) {
            res.json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        console.error('Error deleting category:', error.message);
        res.status(500).json({ error: 'Failed to delete category', detail: error.message });
    }
};


exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).json({ error: 'Failed to fetch categories', detail: error.message });
    }
};

exports.getDeliveryList = async (req, res) => {
    try {
        const deliveries = await Order.getDeliveryList();
        res.json(deliveries);
    } catch (error) {
        console.error('Error fetching delivery list:', error.message);
        res.status(500).json({ error: 'Failed to retrieve delivery list', detail: error.message });
    }
};

