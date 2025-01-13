const mongoose = require('mongoose');

// Definir el esquema del usuario
const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Contraseña en texto plano
});

module.exports = mongoose.model('Usuario', usuarioSchema);
