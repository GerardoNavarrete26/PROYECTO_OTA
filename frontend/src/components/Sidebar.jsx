import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaClipboardList, FaBed, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token del localStorage
    navigate('/login'); // Redirige al login
  };

  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to="/">
            <FaHome /> Inicio
          </Link>
        </li>
        <li className="submenu-item">
          <div className="menu-title">
            <FaClipboardList /> Reservas
          </div>
          <ul className="submenu">
            <li>
              <Link to="/reservas/listar">Listar Reservas</Link>
            </li>
            <li>
              <Link to="/reservas/nueva">Agregar Nueva Reserva</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/habitaciones">
            <FaBed /> Habitaciones
          </Link>
        </li>
        <li>
          <Link to="/historial">
            <FaClipboardList /> Historial
          </Link>
        </li>
        <li>
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

