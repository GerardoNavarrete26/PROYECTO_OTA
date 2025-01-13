const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reservaRoutes = require('./routes/reservaRoutes'); // Rutas de reservas
const habitacionRoutes = require('./routes/habitacionRoutes'); // Rutas de habitaciones

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para procesar JSON en las solicitudes

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

// Puerto del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});