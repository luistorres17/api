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
    const { usuario: username, password, correo, rol, nombre } = usuario;
    // Cifrar la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return callback(err);
      }
      db.query(
        'INSERT INTO usuarios (usuario, password, correo, rol, nombre) VALUES (?, ?, ?, ?, ?)',
        [username, hashedPassword, correo, rol, nombre],
        callback
      );
    });
  },

  // Verificar contraseña
  comparePassword: (password, hashedPassword, callback) => {
    bcrypt.compare(password, hashedPassword, callback);
  },

  // Actualizar un usuario
  // Actualizar un usuario
  

update: async (id, usuario, callback) => {
  if (!id) {
    return callback(new Error("ID del usuario es requerido"), null);
  }

  const fields = [];
  const values = [];

  // Verificar qué campos han sido enviados y agregarlos a la consulta
  if (usuario.usuario) {
    fields.push("usuario = ?");
    values.push(usuario.usuario);
  }
  if (usuario.password) {
    try {
      const hashedPassword = await bcrypt.hash(usuario.password, 10); // Cifrar la contraseña
      fields.push("password = ?");
      values.push(hashedPassword);
    } catch (err) {
      return callback(err, null); // Manejar error en el hash
    }
  }
  if (usuario.correo) {
    fields.push("correo = ?");
    values.push(usuario.correo);
  }
  if (usuario.rol) {
    fields.push("rol = ?");
    values.push(usuario.rol);
  }
  if (usuario.nombre) {
    fields.push("nombre = ?");
    values.push(usuario.nombre);
  }

  // Si no hay campos a actualizar, retornar error
  if (fields.length === 0) {
    return callback(new Error("No se enviaron campos para actualizar"), null);
  }

  // Construir la consulta dinámica
  const query = `UPDATE usuarios SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id); // Agregar ID al final

  // Ejecutar la consulta
  db.query(query, values, callback);
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