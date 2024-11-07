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
