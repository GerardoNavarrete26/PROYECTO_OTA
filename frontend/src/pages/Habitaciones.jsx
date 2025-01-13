import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Habitaciones.css';

const Habitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [busquedaNumero, setBusquedaNumero] = useState('');

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

  const habitacionesFiltradas = habitaciones.filter((habitacion) => {
    return (
      (filtroTipo === '' || habitacion.tipo === filtroTipo) &&
      (filtroEstado === '' || habitacion.estado === filtroEstado) &&
      (busquedaNumero === '' || habitacion.numero.toString().includes(busquedaNumero))
    );
  });

  return (
    <div className="habitaciones-page">
      <h1>Listado de Habitaciones</h1>

      {/* Filtros */}
      <div className="filtros">
        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
          <option value="">Todos los Tipos</option>
          <option value="Simple">Simple</option>
          <option value="Doble">Doble</option>
          <option value="Suite">Suite</option>
        </select>

        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
          <option value="">Todos los Estados</option>
          <option value="Disponible">Disponible</option>
          <option value="Ocupada">Ocupada</option>
          <option value="Mantenimiento">Mantenimiento</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por número de habitación..."
          value={busquedaNumero}
          onChange={(e) => setBusquedaNumero(e.target.value)}
        />
      </div>

      {/* Habitaciones */}
      <div className="habitaciones-grid">
        {habitacionesFiltradas.map((habitacion) => (
          <div key={habitacion._id} className="habitacion-card">
            <img
              src={`http://localhost:3000/uploads/${habitacion.imagen}`}
              alt={`Habitación ${habitacion.numero}`}
              className="habitacion-imagen"
            />
            <h2>Habitación {habitacion.numero}</h2>
            <p><strong>Tipo:</strong> {habitacion.tipo}</p>
            <p><strong>Precio:</strong> ${habitacion.precio.toLocaleString()} CLP</p>
            <p><strong>Estado:</strong> {habitacion.estado}</p>
            <p><strong>Descripción:</strong> {habitacion.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Habitaciones;
