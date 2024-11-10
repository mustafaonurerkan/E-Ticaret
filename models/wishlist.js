// models/wishlist.js
const pool = require('../db');

const Wishlist = {
    create: async (wishlistItem) => {
        const query = `
            INSERT INTO wishlist (user_id, product_id)
            VALUES (?, ?);
        `;
        const [result] = await pool.execute(query, [wishlistItem.user_id, wishlistItem.product_id]);
        return result.insertId;
    },

    getByUserId: async (userId) => {
        const query = `
            SELECT p.id, p.name, p.price
            FROM wishlist w
            JOIN products p ON w.product_id = p.id
            WHERE w.user_id = ?;
        `;
        const [rows] = await pool.execute(query, [userId]);
        return rows;
    },

    delete: async (id) => {
        const query = 'DELETE FROM wishlist WHERE id = ?;';
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    },

    getByName: async (userId, productName) => {
        const query = `
            SELECT p.id, p.name, p.price
            FROM wishlist w
            JOIN products p ON w.product_id = p.id
            WHERE w.user_id = ? AND p.name LIKE ?;
        `;
        const [rows] = await pool.execute(query, [userId, `%${productName}%`]);
        return rows;
    }
};

module.exports = Wishlist;
