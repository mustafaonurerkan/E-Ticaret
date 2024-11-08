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

    // Tüm kategorileri listeleme
    getAll: async () => {
        const query = 'SELECT * FROM categories;';
        const [rows] = await pool.execute(query);
        return rows;
    },

    // Kategori güncelleme
    update: async (id, name) => {
        const query = `
      UPDATE categories
      SET category_name = ?
      WHERE id = ?;
    `;
        const [result] = await pool.execute(query, [category_name, id]);
        return result.affectedRows > 0;
    },

    // Kategori silme
    delete: async (id) => {
        const query = 'DELETE FROM categories WHERE id = ?;';
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    },
};

module.exports = Category;