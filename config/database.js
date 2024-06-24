require('dotenv').config();
const util = require('util');
const { createPool } = require("mysql");

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 20,
    authPlugins: {
        mysql_clear_password: () => () => Buffer.from(process.env.DB_PASS)
    }
});

pool.query = util.promisify(pool.query);

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    } else {
        console.log('Connected to database');
        connection.release();
    }
});

module.exports = pool;