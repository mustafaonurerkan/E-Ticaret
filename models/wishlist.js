// models/wishlist.js
const pool = require('../db');

const Wishlist = {
    add: async (userId, productId) => {
        const query = `
            INSERT INTO wishlists (user_id, product_id)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE product_id = product_id;
        `;
        try {
            const [result] = await pool.execute(query, [userId, productId]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Database error:', error.message);
            throw error;
        }
    },

    getByUserId: async (userId) => {
        const query = `
            SELECT w.wishlist_id, w.product_id, p.name AS product_name
            FROM wishlists w
            JOIN products p ON w.product_id = p.product_id
            WHERE w.user_id = ?;
        `;
        const [rows] = await pool.execute(query, [userId]);
        return rows;
    },


    delete: async (id) => {
        const query = 'DELETE FROM wishlists WHERE wishlist_id = ?;';
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    },

    getByName: async (user_id, productName) => {
        const query = `
            SELECT p.product_id, p.name, p.price
            FROM wishlists w
            JOIN products p ON w.product_id = p.product_id
            WHERE w.user_id = ? AND p.name LIKE ?;
        `;
        const [rows] = await pool.execute(query, [user_id, `%${productName}%`]);
        return rows;
    },

    getAll: async () => {
        const query = 'SELECT * FROM wishlists;';
        const [rows] = await pool.execute(query);
        return rows;
    },
};

module.exports = Wishlist;
