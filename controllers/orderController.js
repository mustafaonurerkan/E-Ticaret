// controllers/orderController.js
const Order = require('../models/order');

exports.createOrder = async (req, res) => {
    try {
        const orderId = await Order.create(req.body);
        res.status(201).json({ orderId });
    } catch (error) {
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
        const order = await Order.getById(req.params.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve order' });
    }
};

// Sipariþ durumunu güncelleme
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

// Sipariþi silme
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
