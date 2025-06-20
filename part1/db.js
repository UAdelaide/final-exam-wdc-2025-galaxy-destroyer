const mysql = require('mysql2/promise');

const db = mysql.createPool({
    socketPath: '/var/run/mysqld/mysqld.sock',
    

});