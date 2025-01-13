// controllers/orderController.js
const Order = require('../models/order');
const pool = require('../db');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

exports.createOrder = async (req, res) => {
    try {
        const order = req.body; // Gelen sipari� verileri
        const orderId = await Order.create(order); // Yeni sipari� olu�tur

        res.status(201).json({ orderId });
    } catch (error) {
        console.error("Error creating order:", error.message);
        res.status(500).json({ error: 'Could not create order' });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.getAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve orders' });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const id = req.params.id; // URL'deki ID'yi al�n
        if (!id) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        const order = await Order.getById(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error("Error fetching order by ID:", error.message);
        res.status(500).json({ error: 'Could not fetch order' });
    }
};


// Sipari� durumunu g�ncelleme
exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const success = await Order.update(req.params.id, status);
        if (success) {
            res.json({ message: 'Order status updated successfully' });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not update order status' });
    }
};

// Sipari�i silme
exports.deleteOrder = async (req, res) => {
    try {
        const success = await Order.delete(req.params.id);
        if (success) {
            res.json({ message: 'Order deleted successfully' });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not delete order' });
    }
};

exports.getOrderByUserID = async (req, res) => {
    const { id } = req.params; 

    try {
        const orders = await Order.getByUserID(id);
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this username' });
        }

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders by username:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getPurchasedProducts = async (req, res) => {
    const userId = req.params.id; // Kullan�c� ID'sini parametreden al
    try {
        const productIds = await Order.getPurchasedProductIds(userId); // Modeldeki fonksiyonu �a��r
        res.json(productIds); // JSON format�nda geri d�nd�r
    } catch (error) {
        console.error("Error fetching purchased products:", error.message);
        res.status(500).json({ error: "Could not fetch purchased product IDs" }); // Hata mesaj� d�nd�r
    }
};



/*exports.sendOrderReceipt = async (req, res) => {
    try {
        const { id } = req.params;

        // Sipari� bilgilerini al
        const order = await Order.getById(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Kullan�c�n�n e-posta adresini al
        const email = await Order.getUserEmailByOrderId(id);
        const username = await Order.getUsernamebyOrderId(id);

        // PDF olu�tur
        const pdfPath = `./order_${id}_receipt.pdf`;
        const doc = new PDFDocument();
        
        doc.pipe(fs.createWriteStream(pdfPath));

        doc.fontSize(20).text(`Order Receipt: #${id}`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Order ID: ${order.order_id}`);
        doc.text(`User ID: ${order.user_id}`);
        doc.text(`Username: ${username}`);
        doc.text(`Total Price: $${order.total_price}`);
        doc.text(`Status: ${order.status}`);
        doc.text(`Delivery Address: ${order.delivery_address}`);
        doc.text(`Created At: ${order.created_at}`);
        doc.moveDown();

        doc.text('Items:', { underline: true });
        order.items.forEach(item => {
            doc.text(`- Product: ${item.product_name}`);
            doc.text(`  Quantity: ${item.quantity}`);
            doc.text(`  Price: $${item.price}`);
            doc.moveDown();
        });

        doc.end();

        // E-posta g�nderimi
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // �rnek olarak Gmail kullan�l�yor
            auth: {
                user: 'team10proje@gmail.com', // E-posta adresi
                pass: 'hbzx nasf rhgt nzkt'  // E-posta �ifresi veya uygulama �ifresi -güncellendi-
            }
        });

        const mailOptions = {
            from: 'team10proje@gmail.com',
            to: email, //email
            subject: `Order Receipt - Order #${id}`,
            text: `Dear Customer,\n\nPlease find attached the receipt for your order #${id}.\n\nThank you for shopping with us!`,
            attachments: [
                {
                    filename: `order_${id}_receipt.pdf`,
                    path: pdfPath
                }
            ]
        };

        await transporter.sendMail(mailOptions);

        // PDF dosyas�n� sil
        fs.unlinkSync(pdfPath);

        res.json({ message: 'Order receipt sent successfully' });
    } catch (error) {
        console.error('Error sending order receipt:', error.message);
        res.status(500).json({ error: 'Could not send order receipt' });
    }
};

exports.getOrdersByStatus = async (req, res) => {
    const { status } = req.query;
    try {
        const orders = await Order.getByStatus(status);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve orders' });
    }
};

exports.getDeliveryList = async (req, res) => {
    try {
        const deliveries = await Order.getDeliveries();
        res.json(deliveries);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve delivery list' });
    }
};*/


exports.sendOrderReceipt = async (req, res) => {
    try {
        const { id } = req.params;

        // Sipariş bilgilerini al
        const order = await Order.getById(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Kullanıcının e-posta adresini al
        const email = await Order.getUserEmailByOrderId(id);
        const username = await Order.getUsernamebyOrderId(id);

        // PDF oluştur
        const pdfPath = `./order_${id}_receipt.pdf`;
        const doc = new PDFDocument();

        doc.pipe(fs.createWriteStream(pdfPath));

        doc.fontSize(20).text(`Order Receipt: #${id}`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Order ID: ${order.order_id}`);
        doc.text(`User ID: ${order.user_id}`);
        doc.text(`Username: ${username}`);
        doc.text(`Total Price: $${order.total_price}`);
        doc.text(`Status: ${order.status}`);
        doc.text(`Delivery Address: ${order.delivery_address}`);
        doc.text(`Created At: ${order.created_at}`);
        doc.moveDown();

        doc.text('Items:', { underline: true });
        order.items.forEach(item => {
            doc.text(`- Product: ${item.product_name}`);
            doc.text(`  Quantity: ${item.quantity}`);
            doc.text(`  Price: $${item.price}`);
            doc.moveDown();
        });

        doc.end();

        // PDF oluşturma işlemi tamamlandıktan sonra devam et
        doc.pipe(fs.createWriteStream(pdfPath)).on('finish', async () => {
            // E-posta gönderimi
            const transporter = nodemailer.createTransport({
                service: 'Gmail', // Örnek olarak Gmail kullanılıyor
                auth: {
                    user: 'team10proje@gmail.com', // E-posta adresi
                    pass: 'hbzx nasf rhgt nzkt'  // E-posta şifresi veya uygulama şifresi
                }
            });

            const mailOptions = {
                from: 'team10proje@gmail.com',
                to: email, // email
                subject: `Order Receipt - Order #${id}`,
                text: `Dear Customer,\n\nPlease find attached the receipt for your order #${id}.\n\nThank you for shopping with us!`,
                attachments: [
                    {
                        filename: `order_${id}_receipt.pdf`,
                        path: pdfPath
                    }
                ]
            };

            await transporter.sendMail(mailOptions);

            // Postman'de PDF'yi indirmek için yanıt olarak gönder
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=order_${id}_receipt.pdf`);

            const fileStream = fs.createReadStream(pdfPath);
            fileStream.pipe(res);

            // PDF dosyasını indirdikten sonra sil
            fileStream.on('end', () => {
                fs.unlinkSync(pdfPath);
            });
        });
    } catch (error) {
        console.error('Error sending order receipt:', error.message);
        res.status(500).json({ error: 'Could not send order receipt' });
    }
};

