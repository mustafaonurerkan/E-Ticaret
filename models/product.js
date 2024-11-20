const pool = require('../db');

const Product = {
    // Yeni �r�n ekleme
    create: async (product) => {
        const query = `
      INSERT INTO products (name, model, serial_number, description, quantity_in_stock, price, warranty_status, distributor_info, category_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
        const values = [
            product.name,
            product.model,
            product.serial_number,
            product.description,
            product.quantity_in_stock,
            product.price,
            product.warranty_status,
            product.distributor_info,
            product.category_id,
        ];
        const [result] = await pool.execute(query, values);
        return result.insertId;
    },

    // T�m �r�nleri listeleme
    getAll: async () => {
        const query = 'SELECT * FROM products;';
        const [rows] = await pool.execute(query);
        return rows;
    },
    
    // Belirli bir �r�n� ID�ye g�re bulma
    getById: async (product_id) => {
        const query = 'SELECT * FROM products WHERE product_id = ?;';
        const [rows] = await pool.execute(query, [product_id]);
        return rows[0];
    },

    // �r�n g�ncelleme
    update: async (product_id, product) => {
        const query = `
      UPDATE products
      SET name = ?, model = ?, serial_number = ?, description = ?, quantity_in_stock = ?, price = ?, warranty_status = ?, distributor_info = ?, category_id = ?
      WHERE product_id = ?;
    `;
        const values = [
            product.name,
            product.model,
            product.serial_number,
            product.description,
            product.quantity_in_stock,
            product.price,
            product.warranty_status,
            product.distributor_info,
            product.category_id,
            id,
        ];
        const [result] = await pool.execute(query, values);
        return result.affectedRows > 0;
    },

    // �r�n silme
    delete: async (product_id) => {
        const query = 'DELETE FROM products WHERE product_id = ?;';
        const [result] = await pool.execute(query, [product_id]);
        return result.affectedRows > 0;
    },

    // Belirli bir kategoriye g�re t�m �r�nler
    getByCategory: async (categoryId) => {
        const query = `
            SELECT p.product_id, p.name, p.price, p.description
            FROM products p
            JOIN categories c ON p.category_id = c.category_id
            WHERE c.category_id = ?;
        `;
        const [rows] = await pool.execute(query, [categoryId]);
        return rows;
    },
};

module.exports = Product;