import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ReservasList from './pages/ReservasList';
import NuevaReserva from './pages/NuevaReserva';
import Habitaciones from './pages/Habitaciones';
import HistorialPage from './pages/HistorialPage';
import Login from './pages/login';
import './App.css';

// Componente para proteger rutas
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? (
    <div className="app-container">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas privadas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/reservas/listar"
          element={
            <PrivateRoute>
              <ReservasList />
            </PrivateRoute>
          }
        />
        <Route
          path="/reservas/nueva"
          element={
            <PrivateRoute>
              <NuevaReserva />
            </PrivateRoute>
          }
        />
        <Route
          path="/habitaciones"
          element={
            <PrivateRoute>
              <Habitaciones />
            </PrivateRoute>
          }
        />
        <Route
          path="/historial"
          element={
            <PrivateRoute>
              <HistorialPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
