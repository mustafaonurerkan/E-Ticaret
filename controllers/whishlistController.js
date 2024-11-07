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
