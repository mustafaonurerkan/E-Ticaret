// controllers/wishlistController.js
const Wishlist = require('../models/wishlist');

exports.addToWishlist = async (req, res) => {
    try {
        const wishlistId = await Wishlist.create(req.body);
        res.status(201).json({ wishlistId });
    } catch (error) {
        res.status(500).json({ error: 'Could not add product to wishlist' });
    }
};

exports.getWishlistByUserId = async (req, res) => {
    try {
        const wishlist = await Wishlist.getByUserId(req.params.userId);
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve wishlist' });
    }
};

exports.deleteWishlistItem = async (req, res) => {
    try {
        const success = await Wishlist.delete(req.params.id);
        if (success) {
            res.json({ message: 'Wishlist item deleted successfully' });
        } else {
            res.status(404).json({ error: 'Wishlist item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not delete wishlist item' });
    }
};

// Ýsim ile istek listesindeki ürünleri getirme
exports.getByName = async (req, res) => {
    const { userId } = req.params;
    const { name } = req.query;
    try {
        const items = await Wishlist.getByName(userId, name);
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve wishlist items by name' });
    }
};
