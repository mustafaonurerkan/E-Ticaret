const Product = require('../models/product');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const Order = require('../models/order');


exports.applyDiscount = async (req, res) => {
    try {
        const success = await Product.applyDiscount(req.params.id, req.body);
        if (success) {
            res.json({ message: 'Discount applied successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not apply discount' });
    }

};

exports.applyRaise = async (req, res) => {
    try {
        const success = await Product.applyRaise(req.params.id, req.body);
        if (success) {
            res.json({ message: 'Raise applied successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not apply raise' });
    }

};

exports.setPrice = async (req, res) => {
    const { product_id, price } = req.body;
    try {
        const success = await Product.setPrice(product_id, price);
        if (success) {
            res.json({ message: 'Product price set successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not set product price' });
    }

};



exports.salesReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Please provide a valid startDate and endDate' });
        }

        // Tüm sipariþleri al ve verilen tarih aralýðýnda filtrele
        const allOrders = await Order.getAll();
        const filteredOrders = allOrders.filter(order => {
            const createdAt = new Date(order.created_at);
            return createdAt >= new Date(startDate) && createdAt <= new Date(endDate);
        });

        if (filteredOrders.length === 0) {
            return res.status(404).json({ error: 'No orders found in the given date range' });
        }

        let costs = 0;
        let revenue = 0;

        const orderDetails = await Promise.all(
            filteredOrders.map(async (order) => {
                const items = filteredOrders.filter(item => item.order_id === order.order_id);
                const itemDetails = await Promise.all(
                    items.map(async (item) => {
                        const product = await Product.getById(item.product_id);

                        if (!product) {
                            console.error(`Product not found for product_id: ${item.product_id || 'No product id'}`);
                            return {
                                productName: item.product_name,
                                quantity: item.quantity,
                                price: item.item_price,
                                realPrice: 0,
                                notFound: true,
                            };
                        }
                        console.log(`Product id: ${product.product_id}, product cost: ${(product.realprice * item.quantity) * 0.6}`);
                        costs += (product.realprice * item.quantity)*0.6;  //random belirlendi, kar marjý 40%
                        return {
                            productName: item.product_name,
                            quantity: item.quantity,
                            price: item.item_price,
                            realPrice: product.realprice,
                            notFound: false,
                        };
                    })
                );

                revenue += Number(order.total_price);

                return {
                    orderId: order.order_id,
                    createdAt: order.created_at,
                    totalPrice: order.total_price,
                    items: itemDetails,
                };
            })
        );

        // PDF oluþturma iþlemi
        const pdfPath = `${process.cwd()}/sales_report_${startDate}_to_${endDate}.pdf`;
        const doc = new PDFDocument();

        


        doc.font(`${process.cwd()}/fonts/Arial.ttf`);

        doc.fontSize(20).text(`Sales Report: ${startDate} to ${endDate}`, { align: 'center' });
        doc.moveDown();

        for (const order of orderDetails) {
            doc.fontSize(14).text(`Order ID: ${order.orderId}`);
            doc.text(`Ordered At: ${order.createdAt}`);
            doc.text('Items:', { underline: true });

            for (const item of order.items) {
                if (item.notFound) {

                    let productName = item.product_name || 'No product name';
                    productName = productName.replace(/"/g, "'");
                    productName = productName.replace(/\//g, '&sol;'); // Slash'i HTML entity'ye dönüþtürme



                    doc.text(`- Product: ${productName} (Product not found)`);
                } else {
                    doc.text(`- Product: ${item.productName}`);
                    doc.text(`  Quantity: ${item.quantity}`);
                    doc.text(`  Price: $${item.price}`);
                }
            }

            doc.text(`Revenue: $${order.totalPrice}`);
            doc.moveDown();
        }

        doc.text(`Total Revenue: $${revenue.toFixed(2)}`);
        const totalProfit = revenue - costs;
        doc.text(`Total Profit: $${totalProfit.toFixed(2)}`);
        doc.end();

        // PDF oluþturulduktan sonra indir
        doc.pipe(fs.createWriteStream(pdfPath)).on('finish', () => {
            res.download(pdfPath, (err) => {
                if (err) {
                    console.error('Error downloading the PDF:', err.message);
                    return res.status(500).json({ error: 'Could not download the PDF' });
                }

                // PDF dosyasýný sil
                //fs.unlinkSync(pdfPath);
            });
        });
        
    } catch (error) {
        console.error('Error generating sales report:', error.message);
        res.status(500).json({ error: 'Could not generate sales report' });
    }
};

