const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Importar rutas
const reservaRoutes = require('./routes/reservaRoutes'); // Rutas de reservas
const habitacionRoutes = require('./routes/habitacionRoutes'); // Rutas de habitaciones
const historialRoutes = require('./routes/historialRoutes'); // Rutas de historial

// Crear instancia de Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para procesar JSON en las solicitudes

// Middleware para servir archivos estáticos desde la carpeta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tu_base_de_datos')
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
    })
    .catch((err) => {
        console.error('Error al conectar a MongoDB:', err.message);
    });

// Rutas
app.use('/api/reservas', reservaRoutes); // Rutas para reservas
app.use('/api/habitacion', habitacionRoutes); // Rutas para habitaciones
app.use('/api/historial', historialRoutes); // Rutas para historial

// Puerto del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});