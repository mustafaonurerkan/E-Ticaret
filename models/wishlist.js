const pool = require('../db'); // MySQL

const Wishlist = {

    create: async (wishlist) => {
        const query = `
      INSERT INTO wishlists (user_id, product_id)
      VALUES (?, ?);
    `;
        const values = [wishlist.user_id, wishlist.product_id];
        const [result] = await pool.execute(query, values);
        return result.insertId;
    },

    // Kullan?c?n?n istek listesini getirme
    getByUserId: async (userId) => {
        const query = 'SELECT * FROM wishlists WHERE user_id = ?;';
        const [rows] = await pool.execute(query, [userId]);
        return rows;
    },

    // ?stek listesi ö?esini silme
    delete: async (id) => {
        const query = 'DELETE FROM wishlists WHERE id = ?;';
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    },
};

module.exports = Wishlist;