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

        // PDF oluþtur
        const pdfPath = `${process.cwd() }/sales_report_${startDate}_to_${endDate}.pdf`; 
        const doc = new PDFDocument();

        doc.pipe(fs.createWriteStream(pdfPath));

        console.log(`PDF will be saved at: ${pdfPath}`);

        doc.fontSize(20).text(`Sales Report: ${startDate} to ${endDate}`, { align: 'center' });
        doc.moveDown();
        let costs = 0
        let revenue = 0

        for (const order of filteredOrders) {
            doc.fontSize(14).text(`Order ID: ${order.order_id}`);
            //doc.text(`User ID: ${order.user_id}`);
            //doc.text(`Status: ${order.status}`);
            //doc.text(`Delivery Address: ${order.delivery_address}`);
            doc.text(`Ordered At: ${order.created_at}`);
            doc.text('Items:', { underline: true });

            const items = filteredOrders.filter(item => item.order_id === order.order_id);

            for (const item of items) {

                    /*const product = await Product.getById(item.product_id);

                if (!product) {
                    console.error(`Product not found for product_id: ${product.product_id}`);
                    doc.text(`- Product: ${item.product_name} (Product not found)`);
                }

                // Ürünün realprice'ini ve adedini kullanarak maliyet hesapla
                if (product.realprice) {
                    console.log(`Realprice for product_id: ${product.product_id}: ${product.realprice}`);
                }

                costs += product.realprice * item.quantity;*/

                doc.text(`- Product: ${item.product_name}`);
                doc.text(`  Quantity: ${item.quantity}`);
                doc.text(`  Price: $${item.item_price}`);
                //console.log(costs);
                }

            doc.text(`Revenue: $${order.total_price}`);
            revenue += order.total_price;
            
        }

        doc.moveDown();
        doc.text(`Total Profit: $${revenue - costs}`);
        console.log(`Total Profit: $${(revenue - costs).toFixed(2)}`)
        doc.end();

        // Ýstemciye PDF dosyasýný gönder
        res.download(pdfPath, (err) => {
            if (err) {
                console.error('Error downloading the PDF:', err.message);
                return res.status(500).json({ error: 'Could not download the PDF' });
            }

            // PDF dosyasýný sil
            fs.unlinkSync(pdfPath);
        });
    } catch (error) {
        console.error('Error generating sales report:', error.message);
        res.status(500).json({ error: 'Could not generate sales report' });
    }
};
