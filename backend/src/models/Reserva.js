const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  clienteId: { type: String, required: true }, // RUT o identificación del cliente
  cliente: { type: String, required: true }, // Nombre del cliente
  fechaEntrada: { type: Date, required: true }, // Fecha de entrada
  fechaSalida: { type: Date, required: true }, // Fecha de salida
  habitacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Habitacion', required: true }, // Relación con una habitación específica
  canalOrigen: { type: String, required: true }, // Canal por el cual se hizo la reserva (Directo, Booking, etc.)
  estado: { type: String, default: 'Confirmada' }, // Estado de la reserva (Confirmada, Pendiente, Cancelada)
  createdAt: { type: Date, default: Date.now }, // Fecha de creación automática
});

module.exports = mongoose.model('Reserva', reservaSchema);
