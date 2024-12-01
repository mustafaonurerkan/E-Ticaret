const pool = require('../db');

const Payment = {
    create: async (paymentDetails) => {
        const query = `
            INSERT INTO payments (order_id, amount, status, transaction_id)
            VALUES (?, ?, ?, ?);
        `;
        const { order_id, amount, status, transaction_id } = paymentDetails;
        const [result] = await pool.execute(query, [order_id, amount, status, transaction_id]);
        return result.insertId;
    },

    getAll: async () => {
        const query = `
            SELECT p.payment_id, p.order_id, p.amount, p.payment_date, p.status, p.transaction_id, o.user_id
            FROM payments p
            JOIN orders o ON p.order_id = o.order_id;
        `;
        const [rows] = await pool.execute(query);
        return rows;
    },
};

module.exports = Payment;
