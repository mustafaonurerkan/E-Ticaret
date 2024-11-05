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
        const query = 'SELECT * FROM users;';
        const [rows] = await pool.execute(query);
        return rows;
    },

    getById: async (id) => {
        const query = 'SELECT * FROM users WHERE id = ?;';
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
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
        const query = 'DELETE FROM users WHERE id = ?;';
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    },
};

module.exports = User;