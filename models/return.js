const pool = require('../db');

const Return = {
    create: async (returnData) => {
        const query = `
            INSERT INTO returns (order_id, product_id, user_id, refund_amount, status)
            VALUES (?, ?, ?, ?, ?);
        `;
        const values = [
            returnData.order_id,
            returnData.product_id,
            returnData.user_id,
            returnData.refund_amount,
            returnData.status
        ];
        const [result] = await pool.execute(query, values);
        return result.insertId;
    },

    isProductAlreadyRefunded: async (order_id, product_id) => {
        const query = `
        SELECT 1
        FROM returns
        WHERE order_id = ? AND product_id = ?;
    `;
        const [rows] = await pool.execute(query, [order_id, product_id]);
        return rows.length > 0; // Eðer kayýt varsa, ürün bu sipariþ için zaten iade edilmiþtir
    }

};

module.exports = Return;
