const Usuario = require('../models/Usuario');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Busca al usuario en la base de datos
    const user = await Usuario.findOne({ username });

    // Si el usuario no existe
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Si la contraseña es incorrecta
    if (user.password !== password) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Si las credenciales son correctas
    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      token: 'fake-token-123456',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { login };
