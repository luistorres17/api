// src/config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'behpehgubtadbxwz0hbx-mysql.services.clever-cloud.com',
  user: 'uapfci46nbqexfgk',       // Cambia por tu usuario de MySQL
  password: '5ka8DR1TybmWTSSUkWFA',       // Cambia por tu contraseña de MySQL
  database: 'behpehgubtadbxwz0hbx'
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;