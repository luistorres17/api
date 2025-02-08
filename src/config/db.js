// src/config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',     // Cambia por tu host de
  user: 'root',       // Cambia por tu usuario de MySQL
  password: '',       // Cambia por tu contraseña de MySQL
  database: 'db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;