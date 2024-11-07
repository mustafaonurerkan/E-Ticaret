// controllers/cartController.js
const Cart = require('../models/cart');

exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        await Cart.updateCart(userId, productId, quantity);
        res.json({ message: 'Product added/updated in cart' });
    } catch (error) {
        res.status(500).json({ error: 'Could not add/update product in cart' });
    }
};

exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        await Cart.removeFromCart(userId, productId);
        res.json({ message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ error: 'Could not remove product from cart' });
    }
};
