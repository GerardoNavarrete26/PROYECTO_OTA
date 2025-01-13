import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Manejar el envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        alert(response.data.message); // Mensaje de éxito
        window.location.href = '/';
      }
    } catch (error) {
      // Capturar mensajes personalizados del backend
      if (error.response && error.response.data.message) {
        alert(error.response.data.message); // Muestra la alerta personalizada
      } else {
        alert('Error al iniciar sesión. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Iniciar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
