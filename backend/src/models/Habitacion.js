const mongoose = require('mongoose');

const habitacionSchema = new mongoose.Schema({
    numero: { type: String, required: true },
    tipo: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true },
    estado: { type: String, required: true },
    imagen: { type: String, required: true }, // Almacena solo el nombre del archivo
});

const Habitacion = mongoose.model('Habitacion', habitacionSchema);

module.exports = Habitacion;