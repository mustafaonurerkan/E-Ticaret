// controllers/userController.js
const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (error) {
        console.error("getAllUsers Hata Detay�:", error);
        res.status(500).json({ error: 'Kullan�c�lar getirilemedi', detail: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.getById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Kullan�c� bulunamad�' });
        res.json(user);
    } catch (error) {
        console.error("getUserById Hata Detay�:", error);
        res.status(500).json({ error: 'Kullan�c� getirilemedi', detail: error.message });
    }
};
