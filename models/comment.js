const pool = require('../db'); // MySQL

const Comment = {

    create: async (comment) => {
        const query = `
      INSERT INTO comments (user_id, product_id, rating, content, approved)
      VALUES (?, ?, ?, ?, ?);
    `;
        const values = [comment.user_id, comment.product_id, comment.rating, comment.content, comment.approved];
        const [result] = await pool.execute(query, values);
        return result.insertId;
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
        const query = 'DELETE FROM comments WHERE id = ?;';
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    },
};

module.exports = Comment;