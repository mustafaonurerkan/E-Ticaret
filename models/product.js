const pool = require('../db');

const Product = {
    // Yeni ürün ekleme
    create: async (product) => {
        const query = `
      INSERT INTO products (name, model, serial_number, description, quantity_in_stock, price, warranty_status, distributor_info, category_id, sizes, photo_url, popularity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
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
            product.sizes,
            product.photo_url,
            product.popularity
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
    getById: async (product_id) => {
        const query = 'SELECT * FROM products WHERE product_id = ?;';
        const [rows] = await pool.execute(query, [product_id]);
        return rows[0];
    },

    // Ürün güncelleme
    update: async (product_id, product) => {
        const query = `
      UPDATE products
      SET name = ?, model = ?, serial_number = ?, description = ?, quantity_in_stock = ?, price = ?, warranty_status = ?, distributor_info = ?, category_id = ?, sizes = ?, photo_url = ?, popularity = ?
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
            product.sizes,
            product.photo_url,
            product.popularity,
            product_id,
        ];
        const [result] = await pool.execute(query, values);
        return result.affectedRows > 0;
    },

    // Ürün silme
    delete: async (product_id) => {
        const query = 'DELETE FROM products WHERE product_id = ?;';
        const [result] = await pool.execute(query, [product_id]);
        return result.affectedRows > 0;
    },

    // Belirli bir kategoriye göre tüm ürünler
    getByCategory: async (categoryId) => {
        const query = `
            SELECT p.product_id, p.name, p.price, p.description, p.photo_url, p.popularity
            FROM products p
            JOIN categories c ON p.category_id = c.category_id
            WHERE c.category_id = ?;
        `;
        const [rows] = await pool.execute(query, [categoryId]);
        return rows;
    },

    incrementPopularity: async (id) => {
        const [result] = await pool.execute( // `db.query` yerine `pool.execute` kullanmalýsýnýz.
            'UPDATE products SET popularity = popularity + 0.5 WHERE product_id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

};

module.exports = Product;