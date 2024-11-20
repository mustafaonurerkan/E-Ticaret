const pool = require('../db');

const Order = {

    create: async (order) => {
        console.log("Order Data:", order);

        const connection = await pool.getConnection(); // Transaction ba?latma
        try {
            await connection.beginTransaction();

            // Sipari? detaylar?n? orders tablosuna ekleme
            const orderQuery = `
                INSERT INTO orders (user_id, total_price, status, delivery_address)
                VALUES (?, ?, ?, ?);
            `;
            const orderValues = [order.user_id, order.total_price, order.status, order.delivery_address];

            const [orderResult] = await connection.execute(orderQuery, orderValues);
            const orderId = orderResult.insertId;

            // Sipari?teki her ürün için stok azaltma i?lemi
            for (let item of order.items) {
                const productQuery = `
                    UPDATE products 
                    SET quantity_in_stock = quantity_in_stock - ? 
                    WHERE product_id = ? AND quantity_in_stock >= ?;
                `;
                const productValues = [item.quantity, item.product_id, item.quantity];
                const [updateResult] = await connection.execute(productQuery, productValues);

                if (updateResult.affectedRows === 0) {
                    throw new Error(`Ürün stok yetersiz: ${item.product_id}`);
                }

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
        const query = `
        SELECT 
            o.order_id, 
            o.user_id, 
            o.total_price, 
            o.status, 
            o.delivery_address, 
            o.created_at,
            oi.product_id, 
            oi.quantity, 
            oi.price AS item_price,
            p.name AS product_name
        FROM orders o
        LEFT JOIN order_items oi ON o.order_id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.product_id
        ORDER BY o.order_id;
    `;

        const [rows] = await pool.execute(query);
        return rows;
    },

    // Belirli bir sipari?i ID’ye göre bulma
    getById: async (order_id) => {
        const query = 'SELECT * FROM orders WHERE order_id = ?;';
        const [rows] = await pool.execute(query, [order_id]);
        return rows[0];
    },

    // Sipari? durumu güncelleme
    update: async (order_id, status) => {
        const query = `
            UPDATE orders
            SET status = ?
            WHERE order_id = ?;
        `;
        const [result] = await pool.execute(query, [status, order_id]);
        return result.affectedRows > 0;
    },

    // Sipari? silme
    delete: async (order_id) => {
        const query = 'DELETE FROM orders WHERE order_id = ?;';
        const [result] = await pool.execute(query, [order_id]);
        return result.affectedRows > 0;
    },
};

module.exports = Order;