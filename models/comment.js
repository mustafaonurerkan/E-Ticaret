const pool = require('../db');

const Comment = {

    create: async (comment) => {
        try {
            const query = `
            INSERT INTO comments (user_id, product_id, rating, content, approved)
            VALUES (?, ?, ?, ?, ?);
        `;
            const values = [comment.user_id, comment.product_id, comment.rating, comment.content, false];
            const [result] = await pool.execute(query, values);
            return result.insertId;
        } catch (error) {
            console.error("Create Comment Error:", error.message);
            throw error;
        }
    },


    // Tüm yorumlar? listeleme
    getAll: async () => {
        const query = 'SELECT * FROM comments;';
        const [rows] = await pool.execute(query);
        return rows;
    },

    // Belirli bir ürüne ait yorumlar? bulma
    getByProductId: async (productId) => {
        const query = 'SELECT * FROM comments WHERE product_id = ?;';
        const [rows] = await pool.execute(query, [productId]);
        return rows;
    },

    // Yorum silme
    delete: async (id) => {
        const query = 'DELETE FROM comments WHERE comment_id = ?;';
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    },

    // get unapproved
    getUnapproved: async () => {
        const query = `
            SELECT * 
            FROM comments 
            WHERE approved = false;
        `;
        const [rows] = await pool.execute(query);
        return rows;
    },

    // Kullanýcýnýn belirli bir ürünü satýn alýp almadýðýný kontrol et
    hasPurchased: async (userId, productId) => {
        const query = `
            SELECT COUNT(*) AS order_count
            FROM orders o
            JOIN order_items oi ON o.order_id = oi.order_id
            WHERE o.user_id = ? AND oi.product_id = ?;
        `;
        const [rows] = await pool.execute(query, [userId, productId]);
        return rows[0].order_count > 0;
    },

    approve: async (commentId) => {
        const query = `
            UPDATE comments
            SET approved = TRUE
            WHERE comment_id = ?;
        `;
        const [result] = await pool.execute(query, [commentId]);
        return result.affectedRows > 0;
    },

    getUserRole: async (userId) => {
        const query = `
            SELECT role FROM users WHERE user_id = ?;
        `;
        const [rows] = await pool.execute(query, [userId]);
        return rows[0]?.role || null;
    },
};

module.exports = Comment;