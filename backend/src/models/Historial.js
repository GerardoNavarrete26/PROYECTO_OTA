const mongoose = require('mongoose');

const historialSchema = new mongoose.Schema({
  reservaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reserva', required: true }, // Relación con la reserva
  clienteId: { type: String, required: true, unique: true }, // ID del cliente único
  fecha: { type: Date, required: true }, // Fecha del evento
  evento: { type: String, required: true }, // Tipo de evento
  descripcion: { type: String, required: true }, // Descripción del evento
});

module.exports = mongoose.model('Historial', historialSchema);