const Historial = require('../models/Historial');

// Obtener historial por clienteId
const getHistorialByClienteId = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const historiales = await Historial.find({ clienteId });
    if (!historiales.length) {
      return res.status(404).json({ message: 'No se encontró historial para este cliente' });
    }
    res.status(200).json(historiales);
  } catch (error) {
    console.error('Error al obtener el historial por clienteId:', error);
    res.status(500).json({ message: 'Error al obtener el historial', error });
  }
};

// Obtener historial por reservaId
const getHistorialByReservaId = async (req, res) => {
  try {
    const { reservaId } = req.params;
    const historiales = await Historial.find({ reservaId }).populate('reservaId');
    if (!historiales.length) {
      return res.status(404).json({ message: 'No se encontraron historiales para esta reserva' });
    }
    res.status(200).json(historiales);
  } catch (error) {
    console.error('Error al obtener el historial por reservaId:', error);
    res.status(500).json({ message: 'Error al obtener el historial', error });
  }
};

module.exports = {
  getHistorialByClienteId,
  getHistorialByReservaId,
};