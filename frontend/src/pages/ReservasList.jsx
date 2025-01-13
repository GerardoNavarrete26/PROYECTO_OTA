import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './ReservasList.css';

const ReservasList = () => {
  const [reservas, setReservas] = useState([]);
  const [filtroRUT, setFiltroRUT] = useState('');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await api.get('/reservas');
        setReservas(response.data);
      } catch (error) {
        console.error('Error al obtener reservas:', error);
      }
    };

    fetchReservas();
  }, []);

  // Filtrar reservas por RUT
  const reservasFiltradas = reservas.filter((reserva) =>
    reserva.clienteId.includes(filtroRUT)
  );

  return (
    <div className="reservas-list-page">
      <h1>Listado de Reservas</h1>
      <input
        type="text"
        placeholder="Buscar por RUT..."
        value={filtroRUT}
        onChange={(e) => setFiltroRUT(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>RUT</th>
            <th>Habitación</th>
            <th>Fecha de Entrada</th>
            <th>Fecha de Salida</th>
            <th>Fecha de Creación</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reservasFiltradas.map((reserva) => (
            <tr key={reserva._id}>
              <td>{reserva.cliente}</td>
              <td>{reserva.clienteId}</td>
              <td>{reserva.habitacion.tipo}</td>
              <td>{new Date(reserva.fechaEntrada).toLocaleDateString()}</td>
              <td>{new Date(reserva.fechaSalida).toLocaleDateString()}</td>
              <td>
                {reserva.createdAt
                  ? new Date(reserva.createdAt).toLocaleDateString('es-ES')
                  : '-'}
              </td>
              <td>{reserva.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservasList;
