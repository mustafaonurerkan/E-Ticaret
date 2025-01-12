const pool = require('../db');

const Category = {

    create: async (category) => {
        const query = `
      INSERT INTO categories (category_name)
      VALUES (?);
    `;
        const [result] = await pool.execute(query, [category.category_name]);
        return result.insertId;
    },

    // T�m kategorileri listeleme
    getAll: async () => {
        const query = 'SELECT * FROM categories;';
        const [rows] = await pool.execute(query);
        return rows;
    },

    // Kategori g�ncelleme
    update: async (category_id, category_name) => {
        const query = `
      UPDATE categories
      SET category_name = ?
      WHERE category_id = ?;
    `;
        const [result] = await pool.execute(query, [category_name, category_id]);
        return result.affectedRows > 0;
    },

    // Kategori silme
    delete: async (category_id) => {
        const query = 'DELETE FROM categories WHERE category_id = ?;';
        const [result] = await pool.execute(query, [category_id]);
        return result.affectedRows > 0;
    },
};

module.exports = Category;