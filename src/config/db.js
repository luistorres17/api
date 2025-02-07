// src/config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'dev',       // Cambia por tu usuario de MySQL
  password: 'dev',       // Cambia por tu contraseña de MySQL
  database: 'usuarios_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;