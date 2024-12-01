const pool = require('../db');

const User = {
    create: async (user) => {
        const query = `
            INSERT INTO users (name, email, password, role, tax_id, address)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        const values = [user.name, user.email, user.password, user.role, user.tax_id, user.address];
        const [result] = await pool.execute(query, values);
        return result.insertId;
    },

    getAll: async () => {
        try {
            const [rows] = await pool.execute('SELECT * FROM users;'); // Veritaban� sorgusu
            return rows;
        } catch (error) {
            console.error("Veritaban� getAll Hatas�:", error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const [rows] = await pool.execute('SELECT * FROM users WHERE user_id = ?;', [id]);
            return rows[0];
        } catch (error) {
            console.error("Veritaban� getById Hatas�:", error);
            throw error;
        }
    },
    getByEmail: async (email) => {
        try {
            const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?;', [email]);
            console.log(rows[0])
            return rows[0];
        } catch (error) {
            console.error("Veritaban� getByMail Hatas�:", error);
            throw error;
        }
    },
    update: async (id, user) => {
        const query = `
            UPDATE users
            SET name = ?, email = ?, password = ?, role = ?, tax_id= ?, address = ?
            WHERE id = ?;
        `;
        const values = [user.name, user.email, user.password, user.role, id];
        const [result] = await pool.execute(query, values);
        return result.affectedRows > 0;
    },

    delete: async (id) => {
        const query = 'DELETE FROM users WHERE user_id = ?;';
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    },

    update: async (user_id, user) => {
        const query = `
      UPDATE users
      SET tax_id = ?, address = ?
      WHERE user_id = ?;
    `;
        const values = [
            user.tax_id,
            user.address,
            user_id,
        ];
        const [result] = await pool.execute(query, values);
        return result.affectedRows > 0;
    },
};

module.exports = User;