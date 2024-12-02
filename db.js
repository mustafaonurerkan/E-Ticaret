// db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    charset: 'utf8mb4'
});

try {
    console.log('Connected to MySQL Database');
}
catch (error){
    console.error('No connection to database', error);
}


module.exports = pool;
