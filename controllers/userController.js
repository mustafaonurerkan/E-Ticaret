// controllers/userController.js
const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (error) {
        console.error("getAllUsers Hata Detayý:", error);
        res.status(500).json({ error: 'Kullanýcýlar getirilemedi', detail: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.getById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Kullanýcý bulunamadý' });
        res.json(user);
    } catch (error) {
        console.error("getUserById Hata Detayý:", error);
        res.status(500).json({ error: 'Kullanýcý getirilemedi', detail: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params; 

    try {
        const success = await User.delete(id); 
        if (!success) {
            return res.status(404).json({ error: 'User not found or could not be deleted' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const success = await User.update(req.params.id, req.body);
        if (success) {
            res.json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not update user' });
    }
};