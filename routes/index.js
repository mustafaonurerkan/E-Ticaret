const express = require('express');
const router = express.Router();

// Ana sayfa için yönlendirme
router.get('/', (req, res) => {
    res.send(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Team10 E-Commerce</title>
            <style>
                /* Global styles */
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    background: #f5f5f5;
                    color: #333;
                }

                /* Hero Section */
                .hero {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background: linear-gradient(135deg, #0066ff, #00cc99);
                    color: white;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }

                .hero h1 {
                    font-size: 4em;
                    margin: 0;
                    font-weight: bold;
                    color: #ffcc00;
                    text-transform: uppercase;
                }

                .hero p {
                    font-size: 1.5em;
                    margin-top: 10px;
                    opacity: 0.9;
                    font-weight: 500;
                    color: #fff;
                }

                .hero .highlight {
                    color: #ff5733;
                    font-weight: bold;
                    text-decoration: underline;
                }

                /* Scrollable Section */
                .scroll-section {
                    background-color: #fff;
                    padding: 50px 20px;
                    text-align: center;
                    color: #333;
                    animation: fadeIn 2s ease-out;
                }

                .scroll-section h2 {
                    font-size: 2.8em;
                    margin-bottom: 20px;
                    color: #333;
                }

                .scroll-section p {
                    font-size: 1.3em;
                    margin-bottom: 30px;
                    opacity: 0.85;
                    color: #555;
                    line-height: 1.6;
                }

                .products {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 30px;
                    margin-top: 50px;
                }

                .product-card {
                    background-color: #f8f8f8;
                    padding: 20px;
                    border-radius: 15px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease;
                    text-align: center;
                }

                .product-card:hover {
                    transform: translateY(-10px);
                }

                .product-card img {
                    width: 100%;
                    border-radius: 10px;
                    margin-bottom: 15px;
                }

                .product-card h3 {
                    font-size: 1.6em;
                    margin: 0 0 10px;
                    color: #333;
                }

                .product-card p {
                    font-size: 1.1em;
                    color: #555;
                    margin-bottom: 10px;
                }

                .product-card .price {
                    font-size: 1.3em;
                    font-weight: bold;
                    color: #007bff;
                }

                /* Footer */
                .footer {
                    background-color: #333;
                    color: white;
                    text-align: center;
                    padding: 30px 10px;
                }

                .footer p {
                    margin: 10px 0;
                    font-size: 1em;
                    opacity: 0.8;
                }

                .footer .footer-links {
                    font-size: 1.2em;
                    margin: 20px 0;
                }

                .footer .footer-links a {
                    color: #ff5733;
                    text-decoration: none;
                    margin: 0 15px;
                }

                .footer .footer-links a:hover {
                    text-decoration: underline;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .products {
                        grid-template-columns: 1fr 1fr;
                    }
                }

                @media (max-width: 480px) {
                    .products {
                        grid-template-columns: 1fr;
                    }

                    .hero h1 {
                        font-size: 3em;
                    }

                    .hero p {
                        font-size: 1.2em;
                    }
                }

                /* Animations */
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        </head>
        <body>
            <!-- Hero Section -->
            <section class="hero">
                <div>
                    <h1>Welcome to <span class="highlight">Team10 E-Commerce</span></h1>
                    <p>Your <span class="highlight">ultimate</span> shopping experience awaits!</p>
                </div>
            </section>

            <!-- Scrollable Section with Products -->
            <section class="scroll-section">
                <h2>Featured Products</h2>
                <p>Explore the best products available right now, handpicked just for you!</p>
                <div class="products">
                    <div class="product-card">
                        <img src="https://via.placeholder.com/300x200" alt="Product 1">
                        <h3>Product 1</h3>
                        <p>A brief description of Product 1 goes here. This is the best choice for you!</p>
                        <p class="price">$49.99</p>
                    </div>
                    <div class="product-card">
                        <img src="https://via.placeholder.com/300x200" alt="Product 2">
                        <h3>Product 2</h3>
                        <p>This product is a must-have in your collection. Don’t miss out!</p>
                        <p class="price">$79.99</p>
                    </div>
                    <div class="product-card">
                        <img src="https://via.placeholder.com/300x200" alt="Product 3">
                        <h3>Product 3</h3>
                        <p>Discover the magic of this product. Your life will change!</p>
                        <p class="price">$29.99</p>
                    </div>
                </div>
            </section>

            <!-- Footer Section -->
            <footer class="footer">
                <p>&copy; 2024 Team10 E-Commerce. All rights reserved.</p>
                <p class="footer-links">
                    <a href="#">About Us</a>
                    <a href="#">Contact</a>
                    <a href="#">Terms & Conditions</a>
                    <a href="#">Privacy Policy</a>
                </p>
            </footer>
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
