const mysql = require('mysql2/promise');

const db = mysql.createPool({
    // socketPath: '/var/run/mysqld/mysqld.sock',
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DogWalkService'
});

// a way to ensure database is connected to express
db.getConnection()
    .then(() => console.log('MySQL connected!'))
    .catch(err => console.error('MySQL could not connect to server', err));


module.exports = db;
