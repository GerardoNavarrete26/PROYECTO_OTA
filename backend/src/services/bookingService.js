// Nota: Los endpoints reales de Booking pueden variar. Debes consultar la documentación oficial o la sandbox de Booking para adaptar tus llamadas (URL, parámetros, etc.).
const axios = require('axios');
const Reserva = require('../models/Reserva');
const Historial = require('../models/Historial');

// Ejemplo de función para obtener reservas de Booking
exports.fetchBookingReservations = async () => {
  try {
    const apiKey = process.env.BOOKING_API_KEY;
    const response = await axios.get('https://api.booking.com/...', {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });

    const reservasBooking = response.data; // Ajusta según respuesta de Booking

    // Procesar y guardar en DB
    for (let r of reservasBooking) {
      // Ejemplo: buscar si la reserva existe y actualizar, o crear nueva
      await Reserva.findOneAndUpdate(
        { idBooking: r.id },          // criterio
        { ...r, canalOrigen: 'Booking' }, // datos
        { upsert: true }             // crea si no existe
      );
    }

    // Log en historial
    const nuevoHistorial = new Historial({
      fuente: 'Booking',
      detalle: `Actualizadas ${reservasBooking.length} reservas`
    });
    await nuevoHistorial.save();

    return reservasBooking.length;
  } catch (error) {
    console.error('Error al sincronizar con Booking', error);
    throw error;
  }
};

// Ejemplo de función para actualizar disponibilidad en Booking
exports.updateBookingAvailability = async (habitacionId, disponibilidad) => {
  try {
    const apiKey = process.env.BOOKING_API_KEY;
    await axios.post('https://api.booking.com/.../availability', {
      habitacionId,
      disponibilidad
    }, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
  } catch (error) {
    console.error('Error al actualizar disponibilidad en Booking', error);
    throw error;
  }
};