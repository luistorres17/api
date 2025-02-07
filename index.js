const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/usuarios', usuarioRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});