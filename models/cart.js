const pool = require('../db'); // Veritaban� ba�lant�s�n� import et

const Cart = {
    addToCart: async (userId, productId, quantity) => {
        const query = `
            INSERT INTO cart (user_id, product_id, quantity)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE quantity = quantity + ?;
        `;
        const values = [userId, productId, quantity, quantity];
        const [result] = await pool.execute(query, values);
        return result.affectedRows > 0;
    },

    getByUserId: async (userId) => {
        const query = `
            SELECT c.cart_id, c.user_id, c.product_id, c.quantity, c.created_at, c.updated_at, p.name, p.price
            FROM cart c
            JOIN products p ON c.product_id = p.product_id
            WHERE c.user_id = ?;
        `;
        const [rows] = await pool.execute(query, [userId]);
        return rows;
    },

    updateQuantity: async (userId, productId, quantity) => {
        const query = `
            UPDATE cart
            SET quantity = ?
            WHERE user_id = ? AND product_id = ?;
        `;
        const [result] = await pool.execute(query, [quantity, userId, productId]);
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

    clearCart: async (userId) => {
        const query = `
            DELETE FROM cart
            WHERE user_id = ?;
        `;
        const [result] = await pool.execute(query, [userId]);
        return result.affectedRows > 0;
    },

    getCart: async (userId) => {
        const query = `
        SELECT 
            c.cart_id AS cartId,
            c.user_id AS userId,
            c.product_id AS productId,
            c.quantity,
            p.name AS productName,
            p.price AS productPrice
        FROM cart c
        JOIN products p ON c.product_id = p.product_id
        WHERE c.user_id = ?;
        `;
        const [rows] = await pool.execute(query, [userId]);
        return rows;
    },
    getAll: async () => {
        const query = 'SELECT * FROM cart;';
        const [rows] = await pool.execute(query);
        return rows;
    },

};

module.exports = Cart;
