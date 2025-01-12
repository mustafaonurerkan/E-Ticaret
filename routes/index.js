const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Team10 Backend</title>
            <style>
                body {
                    font-family: 'Courier New', monospace;
                    background-color: #121212;
                    color: #fff;
                    text-align: center;
                    margin: 0;
                    padding: 0;
                }
                h1 {
                    font-size: 48px;
                    color: #ffcc00;
                    margin-top: 20%;
                    animation: glow 1.5s infinite alternate;
                }
                .status {
                    font-size: 24px;
                    color: #00ff99;
                    margin-top: 20px;
                    font-weight: bold;
                }
                .ascii-art {
                    white-space: pre;
                    font-size: 18px;
                    margin: 40px auto;
                    line-height: 1.4;
                    color: #ff6600;
                }
                footer {
                    font-size: 14px;
                    margin-top: 50px;
                    color: #888;
                    opacity: 0.7;
                }
                @keyframes glow {
                    0% { text-shadow: 0 0 10px #ffcc00, 0 0 20px #ffcc00, 0 0 30px #ffcc00, 0 0 40px #ff6600, 0 0 70px #ff6600; }
                    100% { text-shadow: 0 0 10px #ffcc00, 0 0 20px #ffcc00, 0 0 30px #ff6600, 0 0 40px #ff6600, 0 0 70px #ff6600; }
                }
            </style>
        </head>
        <body>
            <h1>Team10 Backend Online</h1>
            <p class="status">Server Status: <span style="color: #00ff99;">Online</span></p>
            <div class="ascii-art">
                ____  ______   ___  ___  __ ______ 
               / __ \\/  _/ /  /   |/_  |/ // / __ \\
              / /_/ // // /__/ /| | / /|_/ // /_/ /
             / ____// // /__/ ___ |/ /  / // ____/ 
            /_/   /___/____/_/  |_/_/  /_/_/      
            </div>
            <footer>&copy; 2024 Team10 Backend. All Rights Reserved.</footer>
        </body>
        </html>
    `);
});

const authRoutes = require('./authRoutes');
const cartRoutes = require('./cartRoutes');
const categoryRoutes = require('./categoryRoutes');
const commentRoutes = require('./commentRoutes');
const orderRoutes = require('./orderRoutes');
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const wishlistRoutes = require('./wishlistRoutes');
const paymentRoutes = require('./paymentRoutes');
const productManagerRoutes = require('./productManagerRoutes');
const salesManagerRoutes = require('./salesmanagerRoutes');

router.use('/auth', authRoutes);
router.use('/carts', cartRoutes);
router.use('/categories', categoryRoutes);
router.use('/comments', commentRoutes);
router.use('/orders', orderRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/wishlists', wishlistRoutes);
router.use('/payments', paymentRoutes);
router.use('/product-manager', productManagerRoutes);
router.use('/salesmanager', salesManagerRoutes);

module.exports = router;
