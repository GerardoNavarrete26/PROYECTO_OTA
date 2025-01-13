const mongoose = require('mongoose');
const Usuario = require('./src/models/Usuario'); // Ajusta la ruta si tu modelo está en otro lugar

const createUser = async () => {
  const username = 'admin1';
  const password = '123456'; // ⚠️ Contraseña sin hash

  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/tu_base_de_datos', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const newUser = new Usuario({
      username,
      password,
    });

    await newUser.save();
    console.log('Usuario creado exitosamente');
    process.exit();
  } catch (error) {
    console.error('Error al crear usuario:', error);
    process.exit(1);
  }
};

createUser();