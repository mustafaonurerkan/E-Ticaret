// controllers/categoryController.js
const Category = require('../models/category');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve categories' });
    }
};

// Yeni kategori ekleme
exports.createCategory = async (req, res) => {
    try {
        const categoryId = await Category.create(req.body);
        res.status(201).json({ id: categoryId, message: 'Category created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Could not create category' });
    }
};

// Kategori güncelleme
exports.updateCategory = async (req, res) => {
    try {
        const success = await Category.update(req.params.id, req.body.category_name);
        if (success) {
            res.json({ message: 'Category updated successfully' });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not update category' });
    }
};

// Kategori silme
exports.deleteCategory = async (req, res) => {
    try {
        const success = await Category.delete(req.params.id);
        if (success) {
            res.json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not delete category' });
    }
};
