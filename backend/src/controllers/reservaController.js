const Reserva = require('../models/Reserva');

// Crear una nueva reserva
const createReserva = async (req, res) => {
  try {
    // ✅ Verifica que no se esté enviando el campo createdAt desde el frontend
    const { clienteId, cliente, habitacion, fechaEntrada, fechaSalida, canalOrigen, estado } = req.body;

    // ✅ Crear una nueva instancia del modelo Reserva
    const nuevaReserva = new Reserva({
      clienteId,
      cliente,
      habitacion,
      fechaEntrada,
      fechaSalida,
      canalOrigen,
      estado,
    });

    // ✅ Guardar la reserva en la base de datos
    const reservaGuardada = await nuevaReserva.save();

    // ✅ Log para verificar la fecha de creación
    console.log('Reserva guardada:', reservaGuardada);

    // ✅ Devolver la reserva completa, incluyendo createdAt
    res.status(201).json(reservaGuardada);
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    res.status(500).json({ message: 'Error al crear la reserva', error });
  }
};

// Obtener todas las reservas
const getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('habitacion');
    console.log(reservas)
    res.status(200).json(reservas);
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    res.status(500).json({ message: 'Error al obtener las reservas', error });
  }
};
// Obtener una reserva por ID
const getReservaById = async (req, res) => {
  try {
    const { id } = req.params; // Extraer el ID de los parámetros
    const reserva = await Reserva.findById(id); // Buscar la reserva por ID
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.status(200).json(reserva);
  } catch (error) {
    console.error('Error al obtener la reserva:', error);
    res.status(500).json({ message: 'Error al obtener la reserva', error });
  }
};

// Obtener reservas por clienteId
const obtenerReservasPorCliente = async (req, res) => {
  try {
    const { clienteId } = req.params; // Capturar el clienteId desde los parámetros de la URL
    console.log('Cliente ID recibido:', clienteId);
    const reservas = await Reserva.find({ clienteId });
    if (reservas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron reservas para este cliente' });
    }
    res.status(200).json(reservas);
  } catch (error) {
    console.error('Error al obtener las reservas del cliente:', error);
    res.status(500).json({ message: 'Error al obtener las reservas del cliente', error });
  }
};

// Actualizar una reserva
const updateReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reservaActualizada = await Reserva.findByIdAndUpdate(id, req.body, { new: true });
    if (!reservaActualizada) {
      return res.status(404).json({ message: 'Reserva no encontrada para actualizar' });
    }
    res.status(200).json(reservaActualizada);
  } catch (error) {
    console.error('Error al actualizar la reserva:', error);
    res.status(500).json({ message: 'Error al actualizar la reserva', error });
  }
};

// Eliminar una reserva
const deleteReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reservaEliminada = await Reserva.findByIdAndDelete(id);
    if (!reservaEliminada) {
      return res.status(404).json({ message: 'Reserva no encontrada para eliminar' });
    }
    res.status(200).json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la reserva:', error);
    res.status(500).json({ message: 'Error al eliminar la reserva', error });
  }
};

module.exports = {
  createReserva,
  getReservas,
  getReservaById,
  obtenerReservasPorCliente,
  updateReserva,
  deleteReserva,
};