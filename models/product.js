const pool = require('./db');

const Product = {
    // Yeni ürün ekleme
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

    // Tüm ürünleri listeleme
    getAll: async () => {
        const query = 'SELECT * FROM products;';
        const [rows] = await pool.execute(query);
        return rows;
    },

    // Belirli bir ürünü ID’ye göre bulma
    getById: async (id) => {
        const query = 'SELECT * FROM products WHERE id = ?;';
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    },

    // Ürün güncelleme
    update: async (id, product) => {
        const query = `
      UPDATE products
      SET name = ?, model = ?, serial_number = ?, description = ?, quantity_in_stock = ?, price = ?, warranty_status = ?, distributor_info = ?, category_id = ?
      WHERE id = ?;
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

    // Ürün silme
    delete: async (id) => {
        const query = 'DELETE FROM products WHERE id = ?;';
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    },
};

module.exports = Product;