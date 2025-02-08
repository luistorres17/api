const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta pública (no requiere autenticación)
router.post('/login', usuarioController.login);

// Rutas protegidas (requieren autenticación)
router.get('/', authMiddleware, usuarioController.getAll);
router.get('/:id', authMiddleware, usuarioController.getById);
router.post('/', authMiddleware, usuarioController.create);//si sirve
router.put('/:id', authMiddleware, usuarioController.update); 
router.delete('/:id', authMiddleware, usuarioController.delete);//no elimina

module.exports = router;