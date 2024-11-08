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
            const [rows] = await pool.execute('SELECT * FROM users;'); // Veritabaný sorgusu
            return rows;
        } catch (error) {
            console.error("Veritabaný getAll Hatasý:", error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const [rows] = await pool.execute('SELECT * FROM users WHERE user_id = ?;', [id]);
            return rows[0];
        } catch (error) {
            console.error("Veritabaný getById Hatasý:", error);
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
};

module.exports = User;