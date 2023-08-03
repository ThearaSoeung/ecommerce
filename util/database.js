const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'my_mvc_schema',
    password: 'Theara011802399'
});

module.exports = pool.promise();


