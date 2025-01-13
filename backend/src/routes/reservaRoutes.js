const express = require('express');
const {
  createReserva,
  getReservas,
  getReservaById,
  obtenerReservasPorCliente, // Importar el nuevo controlador
  updateReserva,
  deleteReserva,
} = require('../controllers/reservaController');

const router = express.Router();

// Rutas CRUD para reservas
router.post('/', createReserva); // Crear una nueva reserva
router.get('/', getReservas); // Obtener todas las reservas
router.get('/:id', getReservaById); // Obtener una reserva por ID
router.get('/cliente/:clienteId', obtenerReservasPorCliente); // Obtener reservas por clienteId
router.put('/:id', updateReserva); // Actualizar una reserva por ID
router.delete('/:id', deleteReserva); // Eliminar una reserva por ID

module.exports = router;