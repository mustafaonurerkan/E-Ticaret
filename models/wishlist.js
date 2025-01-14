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
        SELECT 
            w.wishlist_id, 
            w.product_id, 
            p.name AS product_name, 
            p.photo_url AS product_image, 
            p.price AS product_price
        FROM wishlists w
        JOIN products p ON w.product_id = p.product_id
        WHERE w.user_id = ?;
    `;
        const [rows] = await pool.execute(query, [userId]);
        return rows;
    },


    delete: async (userid, productid) => {
        const query = 'DELETE FROM wishlists WHERE user_id = ? AND product_id = ?;';
        const [result] = await pool.execute(query, [userid, productid]);
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
