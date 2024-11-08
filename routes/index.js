const express = require('express');
const router = express.Router();

// Ana sayfa rotasý
router.get('/', (req, res) => {
    res.send('SA, TEAM10 HOMEPAGE, PLEASE TAKE OFF YOUR SHOES BEFORE ENTERING');
});

// Diðer rotalar
const authRoutes = require('./authRoutes');
const cartRoutes = require('./cartRoutes');
const categoryRoutes = require('./categoryRoutes');
const commentRoutes = require('./commentRoutes');
const orderRoutes = require('./orderRoutes');
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const wishlistRoutes = require('./wishlistRoutes');

// Rota dosyalarýný baðlayýn
router.use('/auth', authRoutes);
router.use('/cart', cartRoutes);
router.use('/categories', categoryRoutes);
router.use('/comments', commentRoutes);
router.use('/orders', orderRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/wishlist', wishlistRoutes);

module.exports = router;
