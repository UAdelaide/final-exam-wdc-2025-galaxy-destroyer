const mysql = require('mysql2/promise');

const db = mysql.createPool({
    socketPath: '/var/run/mysqld/mysqld.sock',
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'DogWalkService'
});

// a way to ensure database is connected to express
db.getConnection() {}


module.exports = db;