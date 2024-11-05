const pool = require('../db');

const Cart = {
    updateCart: async (userId, productId, quantity) => {
        const query = `
            INSERT INTO cart (user_id, product_id, quantity)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE quantity = ?;
        `;
        const values = [userId, productId, quantity, quantity];
        const [result] = await pool.execute(query, values);
        return result.affectedRows > 0;
    },

    removeFromCart: async (userId, productId) => {
        const query = `
            DELETE FROM cart 
            WHERE user_id = ? AND product_id = ?;
        `;
        const [result] = await pool.execute(query, [userId, productId]);
        return result.affectedRows > 0;
    },
};

module.exports = Cart;