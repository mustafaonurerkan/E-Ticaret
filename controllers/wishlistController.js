// controllers/wishlistController.js
const Wishlist = require('../models/wishlist');

exports.addToWishlist = async (req, res) => {
    const { user_id, product_id } = req.body;

    try {
        // Wishlist'e ekleme
        const added = await Wishlist.add(user_id, product_id);
        if (!added) {
            return res.status(400).json({ message: 'Ürün zaten istek listesinde.' });
        }

        res.status(200).json({ message: 'Ürün istek listesine eklendi.' });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).json({ message: 'Bir hata oluþtu.', error });
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
    const { user_id, product_id } = req.body;
    try {
        const success = await Wishlist.delete(user_id, product_id);
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
    const { user_id } = req.params;
    const { name } = req.query;
    try {
        const items = await Wishlist.getByName(user_id, name);
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
