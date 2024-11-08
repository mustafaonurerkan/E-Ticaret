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
