import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia si tu backend está en otro puerto
});

export default api;
