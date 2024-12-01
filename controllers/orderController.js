// controllers/orderController.js
const Order = require('../models/order');

exports.createOrder = async (req, res) => {
    try {
        const orderId = await Order.create(req.body);
        res.status(201).json({ orderId });
    } catch (error) {
        res.status(500).json({ error: 'Could not create order' });
        console.log(error);
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
        const id = req.params.id; // URL'deki ID'yi alýn
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

exports.getOrderByUsername = async (req, res) => {
    const { username } = req.params; 

    try {
        const orders = await Order.getByUsername(username);
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this username' });
        }

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders by username:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};