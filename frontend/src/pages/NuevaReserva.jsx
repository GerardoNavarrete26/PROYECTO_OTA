import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './NuevaReserva.css';
import { useNavigate } from 'react-router-dom';

const NuevaReserva = () => {
  const [clienteId, setClienteId] = useState('');
  const [cliente, setCliente] = useState('');
  const [habitacion, setHabitacion] = useState('');
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [canalOrigen, setCanalOrigen] = useState('Directo');
  const [estado, setEstado] = useState('Confirmada');
  const [habitaciones, setHabitaciones] = useState([]);

  const navigate = useNavigate();

  // Obtener las habitaciones desde el backend
  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await api.get('/habitacion');
        setHabitaciones(response.data);
      } catch (error) {
        console.error('Error al obtener las habitaciones:', error);
      }
    };

    fetchHabitaciones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaReserva = {
      clienteId,
      cliente,
      habitacion,
      fechaEntrada,
      fechaSalida,
      canalOrigen,
      estado,
    };

    try {
      await api.post('/reservas', nuevaReserva);
      alert('Reserva creada exitosamente');
      navigate('/reservas/listar');
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      alert('Error al crear la reserva. Por favor intenta de nuevo.');
    }
  };

  return (
    <div className="nueva-reserva-page">
      <h1>Agregar Nueva Reserva</h1>
      <form onSubmit={handleSubmit}>
        <label>RUT del Cliente</label>
        <input
          type="text"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          required
        />

        <label>Nombre del Cliente</label>
        <input
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          required
        />

        <label>Habitación</label>
        <select
          value={habitacion}
          onChange={(e) => setHabitacion(e.target.value)}
          required
        >
          <option value="">Selecciona una habitación</option>
          {habitaciones.map((hab) => (
            <option key={hab.numero} value={hab._id}>
              {hab.tipo}
            </option>
          ))}
        </select>

        <label>Fecha de Entrada</label>
        <input
          type="date"
          value={fechaEntrada}
          onChange={(e) => setFechaEntrada(e.target.value)}
          required
        />

        <label>Fecha de Salida</label>
        <input
          type="date"
          value={fechaSalida}
          onChange={(e) => setFechaSalida(e.target.value)}
          required
        />

        <label>Canal de Origen</label>
        <select value={canalOrigen} onChange={(e) => setCanalOrigen(e.target.value)}>
          <option value="Directo">Directo</option>
          <option value="Booking">Booking</option>
          <option value="Expedia">Expedia</option>
          <option value="Agencia">Agencia</option>
        </select>

        <label>Estado</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="Confirmada">Confirmada</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Cancelada">Cancelada</option>
        </select>

        <button type="submit">Guardar Reserva</button>
      </form>
    </div>
  );
};

export default NuevaReserva;
