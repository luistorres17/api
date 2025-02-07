// src/controllers/usuarioController.js
const Usuario = require('../models/usuarioModel');
const { generateToken } = require('../utils/jwt');

const usuarioController = {

    login: (req, res) => {
        const { usuario, password } = req.body;

        Usuario.getByUsername(usuario, (err, results) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            }
            const user = results[0];

            // Verificar la contraseña
            Usuario.comparePassword(password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
                }

                // Generar token JWT
                const token = generateToken(user.id);
                res.json({ token });
            });
        });
    },





  // Obtener todos los usuarios
  getAll: (req, res) => {
    Usuario.getAll((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },

  // Obtener un usuario por ID
  getById: (req, res) => {
    const id = req.params.id;
    Usuario.getById(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(results[0]);
    });
  },

  // Crear un nuevo usuario
  create: (req, res) => {
    const nuevoUsuario = req.body;
    Usuario.create(nuevoUsuario, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, ...nuevoUsuario });
    });
  },

  // Actualizar un usuario
  update: (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    Usuario.update(id, datosActualizados, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Usuario actualizado correctamente' });
    });
  },

  // Eliminar un usuario
  delete: (req, res) => {
    const id = req.params.id;
    Usuario.delete(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Usuario eliminado correctamente' });
    });
  }
};

module.exports = usuarioController;