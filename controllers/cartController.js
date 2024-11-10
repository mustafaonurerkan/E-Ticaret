// controllers/cartController.js
const Cart = require('../models/cart');

exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        await Cart.addToCart(userId, productId, quantity);
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

// Kullanýcýnýn sepetini temizleme iþlevi
exports.clearCart = async (req, res) => {
    const { userId } = req.body;
    try {
        await Cart.clearCart(userId);
        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Could not clear cart' });
    }
};

exports.getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.getCart(userId);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve cart' });
    }
};

exports.getByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const cartItems = await Cart.getByUserId(userId);
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve cart items' });
    }
};
