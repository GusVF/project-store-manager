const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  // MYSQL_DATABASE: 'store_manager_db',
  // PORT: 3001,
  // HOST: 'store_manager',
});

module.exports = connection;
