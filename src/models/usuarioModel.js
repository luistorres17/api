// src/models/usuarioModel.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuario = {
  // Obtener todos los usuarios
  getAll: (callback) => {
    db.query('SELECT * FROM usuarios', callback);
  },

  // Obtener un usuario por ID
  getById: (id, callback) => {
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], callback);
  },

  // Crear un nuevo usuario
  create: (usuario, callback) => {
    const { usuario: username, password, correo, rol } = usuario;
    // Cifrar la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return callback(err);
      }
      db.query(
        'INSERT INTO usuarios (usuario, password, correo, rol) VALUES (?, ?, ?, ?)',
        [username, hashedPassword, correo, rol],
        callback
      );
    });
  },

  // Verificar contraseña
  comparePassword: (password, hashedPassword, callback) => {
    bcrypt.compare(password, hashedPassword, callback);
  },

  // Actualizar un usuario
  update: (id, usuario, callback) => {
    const { usuario: username, password, correo, rol } = usuario;
    db.query(
      'UPDATE usuarios SET usuario = ?, password = ?, correo = ?, rol = ? WHERE id = ?',
      [username, password, correo, rol, id],
      callback
    );
  },

  // Eliminar un usuario
  delete: (id, callback) => {
    db.query('DELETE FROM usuarios WHERE id = ?', [id], callback);
  },

  getByUsername: (username, callback) => {
    db.query('SELECT * FROM usuarios WHERE usuario = ?', [username], callback);
  }
};

module.exports = Usuario;