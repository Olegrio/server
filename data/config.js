const mysql = require('mysql');

const config = {
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'api',
};

const pool = mysql.createPool(config);

module.exports = pool;