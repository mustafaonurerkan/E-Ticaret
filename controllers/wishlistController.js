// controllers/wishlistController.js
const Wishlist = require('../models/wishlist');

exports.addToWishlist = async (req, res) => {
    const { user_id, product_id } = req.body; // JSON isteðinden user_id ve product_id alýnýyor
    try {
        const success = await Wishlist.add(user_id, product_id);
        if (success) {
            res.status(201).json({ message: 'Product added to wishlist' });
        } else {
            res.status(400).json({ error: 'Could not add product to wishlist' });
        }
    } catch (error) {
        console.error("Error adding to wishlist:", error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getWishlistByUserId = async (req, res) => {
    try {
        const wishlist = await Wishlist.getByUserId(req.params.userId);
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve wishlist' });
        console.log(error);
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

exports.getAllWishes = async (req, res) => {
    try {
        const wishlist = await Wishlist.getAll();
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve wishlists' });
        console.log(error);
    }
};
