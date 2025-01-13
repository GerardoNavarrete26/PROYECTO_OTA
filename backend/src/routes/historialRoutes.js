const express = require('express');
const { getHistorialByClienteId, getHistorialByReservaId } = require('../controllers/historialController');

const router = express.Router();

// Ruta para obtener historial por clienteId
router.get('/cliente/:clienteId', getHistorialByClienteId);

// Ruta para obtener historial por reservaId
router.get('/reserva/:reservaId', getHistorialByReservaId);

module.exports = router;
