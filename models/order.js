const pool = require('../db');
const fs = require('fs');

const Order = {

    create: async (order) => {
        console.log("Order Data:", order);

        const connection = await pool.getConnection(); // Transaction starting
        try {
            await connection.beginTransaction();

            // order detail
            const orderQuery = `
                INSERT INTO orders (user_id, total_price, status, delivery_address)
                VALUES (?, ?, ?, ?);
            `;
            const orderValues = [order.user_id, order.total_price, order.status, order.delivery_address];

            const [orderResult] = await connection.execute(orderQuery, orderValues);
            const orderId = orderResult.insertId;


            for (let item of order.items) {
                const productQuery = `
                    UPDATE products 
                    SET quantity_in_stock = quantity_in_stock - ? 
                    WHERE product_id = ? AND quantity_in_stock >= ?;
                `;
                const productValues = [item.quantity, item.product_id, item.quantity];
                const [updateResult] = await connection.execute(productQuery, productValues);

                if (updateResult.affectedRows === 0) {
                    throw new Error(`�r�n stok yetersiz: ${item.product_id}`);
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

    // Belirli bir sipari?i ID�ye g�re bulma
    getById: async (id) => {
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
            WHERE o.order_id = ?;
        `;
        const [rows] = await pool.execute(query, [id]);

        if (rows.length === 0) {
            return null; // E�er sipari� bulunamazsa
        }

        // Sipari� detaylar�n� formatlamak
        const order = {
            order_id: rows[0].order_id,
            user_id: rows[0].user_id,
            total_price: rows[0].total_price,
            status: rows[0].status,
            delivery_address: rows[0].delivery_address,
            created_at: rows[0].created_at,
            items: rows.map(row => ({
                product_id: row.product_id,
                product_name: row.product_name,
                quantity: row.quantity,
                price: row.item_price
            }))
        };

        return order;
    },

    // Sipari? durumu g�ncelleme
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

    // Order history by user_id
    getByUserID: async (user_id) => {
        const query = `
            SELECT o.order_id, o.total_price, o.status, o.created_at, o.delivery_address
            FROM orders o
            WHERE o.user_id = ?;
        `;
        try {
            const [rows] = await pool.execute(query, [user_id]); // Buradaki parametrenin t�r�n� kontrol edin
            console.log('Query result:', rows); // Sorgudan d�nen sonucu loglay�n
            return rows;
        } catch (error) {
            console.error('Database error:', error.message); // Veritaban� hatas�n� kontrol edin
            throw error; // Hatay� yukar� f�rlat�n
        }
    },


    getUserEmailByOrderId: async (order_id) => {
        const query = `
            SELECT u.email
            FROM orders o
            JOIN users u ON o.user_id = u.user_id
            WHERE o.order_id = ?;
        `;

        const [rows] = await pool.execute(query, [order_id]);
        console.error('order_id bulundu: ',order_id);

        if (rows.length === 0) {
            throw new Error(`No email found for order_id: ${order_id}`);
        }

        return rows[0].email; // E-posta adresini d�nd�r
    },

    getPurchasedProductIds: async (userId) => {
        const query = `
        SELECT DISTINCT p.product_id
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.user_id = ?;
    `;
        const [rows] = await pool.execute(query, [userId]);
        return rows.map(row => row.product_id); // Sadece product_id'leri d�nd�r
    },


    getUsernamebyOrderId: async (order_id) => {
        const query = `
            SELECT u.name
            FROM orders o
            JOIN users u ON o.user_id = u.user_id
            WHERE o.order_id = ?;
        `;

        const [rows] = await pool.execute(query, [order_id]);
        console.error('order_id bulundu: ', order_id);

        if (rows.length === 0) {
            throw new Error(`No email found for order_id: ${order_id}`);
        }

        return rows[0].name; // E-posta adresini d�nd�r
    },
    createRefundRequest: async (user_id, order_id, product_id, refund_amount) => {
        const query = `
            INSERT INTO returns (user_id, order_id, product_id, refund_amount)
            VALUES (?, ?, ?, ?);
        `;
        const [result] = await pool.execute(query, [user_id, order_id, product_id, refund_amount]);
        return result.insertId;
    },

    validateRefund: async (user_id, order_id, product_id) => {
        const query = `
            SELECT o.created_at
            FROM orders o
            JOIN order_items oi ON o.order_id = oi.order_id
            WHERE o.user_id = ? AND o.order_id = ? AND oi.product_id = ?;
        `;
        const [rows] = await pool.execute(query, [user_id, order_id, product_id]);

        if (rows.length === 0) return false;

        const orderDate = new Date(rows[0].created_at);
        const now = new Date();
        const diffDays = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
    },

    updateRefundStatus: async (return_id, status) => {
        const query = `
            UPDATE returns
            SET status = ?
            WHERE return_id = ?;
        `;
        const [result] = await pool.execute(query, [status, return_id]);
        return result.affectedRows > 0;
    },

    getRefundAmount: async (order_id, product_id) => {
        const query = `
            SELECT price, quantity
            FROM order_items
            WHERE order_id = ? AND product_id = ?;
        `;
        const [rows] = await pool.execute(query, [order_id, product_id]);
        return rows.length > 0 ? rows[0] : null;
    },

    getRefundsById: async (id) => {
        const query = `
            SELECT r.return_id, r.product_id, r.refund_amount, r.quantity
            FROM returns r
            WHERE r.return_id = ?;
        `;
        const [rows] = await pool.execute(query, [id]);
        return rows;
    },

    getOrderDetails: async (order_id, user_id) => {
        const query = `
        SELECT 
            o.order_id, 
            o.user_id, 
            oi.product_id, 
            oi.quantity, 
            oi.price AS item_price, 
            p.name AS product_name
        FROM orders o
        LEFT JOIN order_items oi ON o.order_id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.product_id
        WHERE o.order_id = ? AND o.user_id = ?;
    `;

        const [rows] = await pool.execute(query, [order_id, user_id]);

        if (rows.length === 0) {
            return null; // Sipariş bulunamadıysa null döndür
        }

        // Sipariş detaylarını yapılandır
        return {
            order_id: rows[0].order_id,
            user_id: rows[0].user_id,
            items: rows.map(row => ({
                product_id: row.product_id,
                product_name: row.product_name,
                quantity: row.quantity,
                item_price: row.item_price
            }))
        };
    },


    getAllRefundRequests: async () => {
        const query = `
            SELECT r.return_id, r.order_id, r.product_id, r.refund_amount, r.status, r.created_at,
                   o.user_id, o.total_price, o.delivery_address
            FROM returns r
            JOIN orders o ON r.order_id = o.order_id
            WHERE r.status = 'pending';
        `;
        const [rows] = await pool.execute(query);
        return rows; 
    },

    updateItemStatus: async (orderId, productId, status) => {
        const query = `
        UPDATE order_items
        SET status = ?
        WHERE order_id = ? AND product_id = ?;
    `;
        const [result] = await pool.execute(query, [status, orderId, productId]);
        return result.affectedRows > 0;
    },

    getItemStatus: async (orderId, productId) => {
        const query = `
        SELECT status
        FROM order_items
        WHERE order_id = ? AND product_id = ?;
    `;
        const [rows] = await pool.execute(query, [orderId, productId]);
        return rows.length > 0 ? rows[0].status : null;
    }


};

Order.getDeliveryList = async () => {
    const query = `
        SELECT 
            o.order_id, 
            o.user_id, 
            u.name AS customer_name, 
            o.delivery_address, 
            o.status AS delivery_status, 
            o.created_at AS order_date,
            oi.product_id, 
            p.name AS product_name, 
            oi.quantity
        FROM orders o
        JOIN users u ON o.user_id = u.user_id
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        ORDER BY o.created_at DESC;
    `;
    try {
        const [rows] = await pool.execute(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = Order;