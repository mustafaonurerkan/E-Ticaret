// controllers/userController.js
const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve users' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.getById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve user' });
    }
};
