const mongoose = require('mongoose');
const Habitacion = require('./src/models/Habitacion'); // Ruta correcta después de mover el archivo

mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const habitaciones = [
  {
    numero: '101',
    tipo: 'Suite',
    estado: 'Disponible',
    precio: 200,
    imagen: 'https://via.placeholder.com/300',
  },
  {
    numero: '102',
    tipo: 'Doble',
    estado: 'Disponible',
    precio: 150,
    imagen: 'https://via.placeholder.com/300',
  },
  {
    numero: '103',
    tipo: 'Sencilla',
    estado: 'Ocupada',
    precio: 100,
    imagen: 'https://via.placeholder.com/300',
  },
];

Habitacion.insertMany(habitaciones)
  .then(() => {
    console.log('Habitaciones agregadas exitosamente');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error al agregar habitaciones:', error);
    mongoose.connection.close();
  });