// models/wishlist.js
const pool = require('../db');

const Wishlist = {
    add: async (user_id, product_id) => {
        const query = `
        INSERT INTO wishlists (user_id, product_id)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE product_id = product_id;
        `;
        const [result] = await pool.execute(query, [user_id, product_id]);
        return result.affectedRows > 0;
    },

    getByUserId: async (userId) => {
        const query = `
        SELECT p.product_id, p.name, p.price
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

    getByName: async (userId, productName) => {
        const query = `
            SELECT p.product_id, p.name, p.price
            FROM wishlists w
            JOIN products p ON w.product_id = p.product_id
            WHERE w.user_id = ? AND p.name LIKE ?;
        `;
        const [rows] = await pool.execute(query, [userId, `%${productName}%`]);
        return rows;
    },

    getAll: async () => {
        const query = 'SELECT * FROM wishlists;';
        const [rows] = await pool.execute(query);
        return rows;
    },
};

module.exports = Wishlist;
