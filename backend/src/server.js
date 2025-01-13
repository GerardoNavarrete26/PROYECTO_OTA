const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Crear instancia de Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware para depurar todas las solicitudes al servidor
app.use((req, res, next) => {
    console.log(`Solicitud recibida: ${req.method} ${req.url}`);
    if (req.body && Object.keys(req.body).length) {
        console.log('Cuerpo de la solicitud:', req.body);
    }
    next();
});

// Importar rutas existentes
const reservaRoutes = require('./src/routes/reservaRoutes');
const historialRoutes = require('./src/routes/historialRoutes');
const habitacionRoutes = require('./src/routes/habitacionRoutes'); // Rutas para habitaciones

// Rutas
app.use('/api/reserva', reservaRoutes); // Rutas para reservas
app.use('/api/historial', historialRoutes); // Rutas para historial
app.use('/api/habitacion', habitacionRoutes); // Rutas para habitaciones

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tu_base_de_datos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
    })
    .catch((err) => {
        console.error('Error al conectar a MongoDB:', err.message);
    });

// Configuración del servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});