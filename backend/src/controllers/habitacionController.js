const Habitacion = require('../models/Habitacion');

// Crear una nueva habitación
exports.createHabitacion = async (req, res) => {
    try {
        console.log('Datos recibidos para crear habitación:', req.body);
        console.log('Archivo recibido:', req.file);

        const nuevaHabitacion = new Habitacion({
            ...req.body,
            imagen: req.file ? req.file.filename : null, // Guardar el nombre de la imagen si se sube
        });

        await nuevaHabitacion.save();
        res.status(201).json(nuevaHabitacion);
    } catch (error) {
        console.error('Error al crear la habitación:', error);
        res.status(500).json({ error: 'Error al crear la habitación' });
    }
};

// Obtener todas las habitaciones
exports.getHabitaciones = async (req, res) => {
    try {
        const habitaciones = await Habitacion.find();
        res.status(200).json(habitaciones);
    } catch (error) {
        console.error('Error al obtener las habitaciones:', error);
        res.status(500).json({ error: 'Error al obtener las habitaciones' });
    }
};

// Actualizar una habitación
exports.updateHabitacion = async (req, res) => {
    try {
        console.log('Datos recibidos para actualizar habitación:', req.body);
        console.log('Archivo recibido para actualizar:', req.file);

        const { id } = req.params;

        const updateData = {
            numero: req.body.numero,
            tipo: req.body.tipo,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            estado: req.body.estado,
        };

        // Si se sube una nueva imagen, agregarla a los datos de actualización
        if (req.file) {
            updateData.imagen = req.file.filename;
        }

        const habitacionActualizada = await Habitacion.findByIdAndUpdate(id, updateData, { new: true });

        if (!habitacionActualizada) {
            return res.status(404).json({ error: 'Habitación no encontrada' });
        }

        res.status(200).json(habitacionActualizada);
    } catch (error) {
        console.error('Error al actualizar la habitación:', error);
        res.status(500).json({ error: 'Error al actualizar la habitación' });
    }
};

// Eliminar una habitación
exports.deleteHabitacion = async (req, res) => {
    try {
        const { id } = req.params;

        const habitacionEliminada = await Habitacion.findByIdAndDelete(id);

        if (!habitacionEliminada) {
            return res.status(404).json({ error: 'Habitación no encontrada' });
        }

        res.status(200).json({ message: 'Habitación eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la habitación:', error);
        res.status(500).json({ error: 'Error al eliminar la habitación' });
    }
};
