const express = require('express');
const router = express.Router();

// Ana sayfa için yönlendirme
router.get('/', (req, res) => {
    const asciiArt = `
       WELCOME TO OUR ETICARET WEBSITE :)
    `;
    res.send(`
        <html>
        <head>
            <title>Team10 E-Ticaret</title>
        </head>
        <body style="font-family: monospace; text-align: center;">
            <h1>Team10 E-Ticaret'e Ho?geldiniz</h1>
            <pre>${asciiArt}</pre>
        </body>
        </html>
    `);
});

// Di?er rotalar
const authRoutes = require('./authRoutes');
const cartRoutes = require('./cartRoutes');
const categoryRoutes = require('./categoryRoutes');
const commentRoutes = require('./commentRoutes');
const orderRoutes = require('./orderRoutes');
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const wishlistRoutes = require('./wishlistRoutes');
const paymentRoutes = require('./paymentRoutes');

// Rota dosyalar?n? ba?lama
router.use('/auth', authRoutes);
router.use('/carts', cartRoutes);
router.use('/categories', categoryRoutes);
router.use('/comments', commentRoutes);
router.use('/orders', orderRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/wishlists', wishlistRoutes);
router.use('/payments', paymentRoutes);

module.exports = router;
