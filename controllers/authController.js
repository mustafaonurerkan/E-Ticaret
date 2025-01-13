// controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password, role, tax_id, address } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await User.create({ name, email, password: hashedPassword, role, tax_id, address });
        res.status(201).json({ userId, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'User registration failed' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log("login içerisi");
        const user = await User.getByEmail(email);
        console.log(user);
        if (!user) return res.status(404).json({ error: 'User not found' });

        console.log("login içerisi 24");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

        console.log("login içerisi 27");
        console.log(user);

        try {
            // Kullanıcı ID ve rol ile token oluşturma
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            console.log("Token created:", token);

            // Token ile birlikte kullanıcı ismini dön
            console.log(user.id)
            res.json({
                token,
                name: user.name, // Kullanıcı adı
                role: user.role,
                message: 'Login successful',
                userIdNumber: user.user_id/*burası*/
                
            });
        } catch (err) {
            console.error("JWT Sign Error:", err);
            res.status(500).json({ error: 'Token generation failed' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

