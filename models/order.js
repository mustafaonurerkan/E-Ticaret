const pool = require('../db');

const Order = {

    create: async (order) => {
        const connection = await pool.getConnection(); // Transaction ba?latma
        try {
            await connection.beginTransaction();

            // Sipari? detaylar?n? orders tablosuna ekleme
            const orderQuery = `
                INSERT INTO orders (user_id, total_price, status, delivery_address)
                VALUES (?, ?, ?, ?);
            `;
            const orderValues = [order.user_id, order.status, order.total_price];
            const [orderResult] = await connection.execute(orderQuery, orderValues);
            const orderId = orderResult.insertId;

            // Sipari?teki her ürün için stok azaltma i?lemi
            for (let item of order.items) {
                const productQuery = `
                    UPDATE products 
                    SET stock = stock - ? 
                    WHERE id = ? AND stock >= ?;
                `;
                const productValues = [item.quantity, item.product_id, item.quantity];
                const [updateResult] = await connection.execute(productQuery, productValues);

                if (updateResult.affectedRows === 0) {
                    throw new Error(`Ürün stok yetersiz: ${item.product_id}`);
                }

                // Sipari? detaylar?n? order_items tablosuna ekleme
                const orderItemQuery = `
                    INSERT INTO order_items (order_id, product_id, quantity, price)
                    VALUES (?, ?, ?, ?);
                `;
                const orderItemValues = [orderId, item.product_id, item.quantity, item.price];
                await connection.execute(orderItemQuery, orderItemValues);
            }

            await connection.commit();
            return orderId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    // Tüm sipari?leri listeleme
    getAll: async () => {
        const query = 'SELECT * FROM orders;';
        const [rows] = await pool.execute(query);
        return rows;
    },

    // Belirli bir sipari?i ID’ye göre bulma
    getById: async (id) => {
        const query = 'SELECT * FROM orders WHERE id = ?;';
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    },

    // Sipari? durumu güncelleme
    update: async (id, status) => {
        const query = `
            UPDATE orders
            SET status = ?
            WHERE id = ?;
        `;
        const [result] = await pool.execute(query, [status, id]);
        return result.affectedRows > 0;
    },

    // Sipari? silme
    delete: async (id) => {
        const query = 'DELETE FROM orders WHERE id = ?;';
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    },
};

module.exports = Order;