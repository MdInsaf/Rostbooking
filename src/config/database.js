<<<<<<< HEAD:config/database.js
require('dotenv').config();

=======
>>>>>>> cd1eba2c62b20767553a390717b4ca1d91b2be3b:src/config/database.js
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

module.exports = pool;



