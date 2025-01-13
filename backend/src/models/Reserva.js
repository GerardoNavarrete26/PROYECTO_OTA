const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  clienteId: { type: String, required: true }, // ID único del cliente
  cliente: { type: String, required: true }, // Nombre del cliente
  fechaEntrada: { type: Date, required: true }, // Fecha de entrada
  fechaSalida: { type: Date, required: true }, // Fecha de salida
  habitaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Habitacion' }], // Relación con habitaciones
  canalOrigen: { type: String, required: true }, // Canal de origen
  estado: { type: String, default: 'Confirmada' }, // Estado de la reserva
  createdAt: { type: Date, default: Date.now }, // Fecha de creación
});

module.exports = mongoose.model('Reserva', reservaSchema);