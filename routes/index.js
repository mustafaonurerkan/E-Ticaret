const express = require('express');
const router = express.Router();

// Ana sayfa i�in y�nlendirme
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
                    background: #f1f1f1;
                    color: #333;
                }

                /* Hero Section with background image */
                .hero {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background: url('https://via.placeholder.com/1920x1080') no-repeat center center/cover;
                    color: #ffffff;
                    text-align: center;
                    position: relative;
                    padding: 0 20px;
                    border: 5px solid #f9b034;
                    margin: 20px;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
                }

                .hero h1 {
                    font-size: 5em;
                    margin: 0;
                    font-weight: bold;
                    color: #f9b034;
                    text-transform: uppercase;
                    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.6);
                }

                .hero p {
                    font-size: 1.6em;
                    margin-top: 20px;
                    color: #ffffff;
                    max-width: 900px;
                    margin-left: auto;
                    margin-right: auto;
                    line-height: 1.8;
                    font-weight: 400;
                    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
                }

                .highlight {
                    color: #f9b034;
                    font-weight: bold;
                    text-decoration: underline;
                }

                /* Scrollable Section */
                .scroll-section {
                    background-color: #fff;
                    padding: 50px 20px;
                    text-align: center;
                    color: #333;
                }

                .scroll-section h2 {
                    font-size: 3.2em;
                    margin-bottom: 20px;
                    color: #333;
                    animation: fadeIn 1.5s ease-in-out;
                }

                .scroll-section p {
                    font-size: 1.4em;
                    margin-bottom: 30px;
                    color: #555;
                    line-height: 1.8;
                    opacity: 0.85;
                    max-width: 850px;
                    margin-left: auto;
                    margin-right: auto;
                }

                /* Products Section */
                .products {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 30px;
                    margin-top: 50px;
                    padding: 20px;
                    justify-items: center;
                    animation: fadeIn 1.5s ease-in-out;
                }

                .product-card {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 15px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease;
                    text-align: center;
                    width: 280px;
                    height: 380px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .product-card:hover {
                    transform: translateY(-10px);
                }

                .product-card img {
                    width: 100%;
                    border-radius: 10px;
                    margin-bottom: 15px;
                    height: 200px;
                    object-fit: cover;
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
                    font-size: 1.4em;
                    font-weight: bold;
                    color: #007bff;
                    margin-top: 10px;
                }

                /* Footer */
                .footer {
                    background-color: #333;
                    color: white;
                    text-align: center;
                    padding: 30px 10px;
                    font-family: 'Courier New', monospace;
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
                    color: #f9b034;
                    text-decoration: none;
                    margin: 0 15px;
                }

                .footer .footer-links a:hover {
                    text-decoration: underline;
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

                /* ASCII Art */
                .ascii-art {
                    font-family: 'Courier New', monospace;
                    font-size: 16px;
                    text-align: center;
                    white-space: pre;
                    margin-top: 40px;
                    color: #333;
                }

                /* Responsive Design */
                @media (max-width: 1024px) {
                    .products {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }

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
                        font-size: 3.5em;
                    }

                    .hero p {
                        font-size: 1.4em;
                    }
                }
            </style>
        </head>
        <body>
            <!-- Hero Section with Background Image -->
            <section class="hero">
                <div>
                    <h1>Welcome to <span class="highlight">Team10 E-Commerce</span></h1>
                    <p>Explore the latest in <span class="highlight">smartphones</span>, <span class="highlight">tablets</span>, <span class="highlight">televisions</span>, and <span class="highlight">laptops</span>! Shop now to grab exclusive deals!</p>
                </div>
            </section>

            <!-- Scrollable Section -->
            <section class="scroll-section">
                <h2>Discover the Best Deals & Latest Products</h2>
                <p>At Team10, we bring together the finest products from the most popular categories. Our goal is to provide you with a seamless and enjoyable shopping experience. From premium electronics to trendy fashion, we ensure that every product meets the highest standards of quality. Join thousands of satisfied customers and find your next favorite product with just a few clicks!</p>
                <div class="products">
                    <div class="product-card">
                        <img src="https://via.placeholder.com/280x200" alt="Smartphone X">
                        <h3>Smartphone X</h3>
                        <p>Experience cutting-edge technology with the all-new Smartphone X. Packed with advanced features and a sleek design, it's the ultimate gadget for modern users.</p>
                        <p class="price">$599.99</p>
                    </div>
                    <div class="product-card">
                        <img src="https://via.placeholder.com/280x200" alt="Tablet Pro">
                        <h3>Tablet Pro</h3>
                        <p>The ultimate tablet for productivity and entertainment. With a high-res display and powerful performance, it's perfect for work and play.</p>
                        <p class="price">$399.99</p>
                    </div>
                    <div class="product-card">
                        <img src="https://via.placeholder.com/280x200" alt="4K Smart TV">
                        <h3>4K Smart TV</h3>
                        <p>Enjoy the ultimate cinematic experience with our 4K Smart TV. Smart features and crystal-clear visuals make it the perfect addition to your living room.</p>
                        <p class="price">$799.99</p>
                    </div>
                    <div class="product-card">
                        <img src="https://via.placeholder.com/280x200" alt="Laptop Pro">
                        <h3>Laptop Pro</h3>
                        <p>Boost your productivity with our high-performance Laptop Pro. Featuring the latest processors and graphics, it's built for professionals on the go.</p>
                        <p class="price">$999.99</p>
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <footer class="footer">
                <p>&copy; 2024 Team10 E-Commerce. All Rights Reserved.</p>
                <div class="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact Us</a>
                </div>
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
const productManagerRoutes = require('./productManagerRoutes');
const salesManagerRoutes = require('./salesmanagerRoutes');

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
router.use('/product-manager', productManagerRoutes);
router.use('/salesmanager', salesManagerRoutes);

module.exports = router;
