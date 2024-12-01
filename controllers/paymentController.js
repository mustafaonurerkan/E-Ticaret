const Payment = require('../models/payment');

exports.createPayment = async (req, res) => {
    const { order_id, amount, status, transaction_id } = req.body;

    try {
        const paymentId = await Payment.create({ order_id, amount, status, transaction_id });
        res.status(201).json({ message: 'Payment created successfully', payment_id: paymentId });
    } catch (error) {
        console.error('Error creating payment:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.getAll();
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
