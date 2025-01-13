import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ReservasList from './pages/ReservasList';
import NuevaReserva from './pages/NuevaReserva';
import Habitaciones from './pages/Habitaciones';
import HistorialPage from './pages/HistorialPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reservas/listar" element={<ReservasList />} />
            <Route path="/reservas/nueva" element={<NuevaReserva />} />
            <Route path="/habitaciones" element={<Habitaciones />} />
            <Route path="/historial" element={<HistorialPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
