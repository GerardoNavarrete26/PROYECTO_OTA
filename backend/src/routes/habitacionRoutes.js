const express = require('express');
const router = express.Router();
const habitacionController = require('../controllers/habitacionController');
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/'); // Ruta corregida para garantizar que apunta a la carpeta uploads
        console.log(`Ruta de almacenamiento: ${uploadPath}`); // Log para verificar la ruta de almacenamiento
        cb(null, uploadPath); // Ruta absoluta para guardar imágenes
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        console.log(`Nombre de archivo generado: ${uniqueName}`); // Log para verificar el nombre del archivo
        cb(null, uniqueName);
    },
});

// Configuración de multer para subir archivos
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Límite de tamaño (2 MB)
    fileFilter: (req, file, cb) => {
        // Validar tipo de archivo
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido. Solo se aceptan imágenes JPEG y PNG.'));
        }
    },
});

// Middleware para depuración de solicitudes
router.use((req, res, next) => {
    console.log(`Solicitud recibida: ${req.method} ${req.url}`);
    if (Object.keys(req.body).length) {
        console.log('Cuerpo:', req.body);
    }
    if (req.file) {
        console.log('Archivo:', req.file);
    }
    next();
});

// Rutas CRUD para habitaciones
router.post('/', upload.single('imagen'), habitacionController.createHabitacion);
router.put('/:id', upload.single('imagen'), habitacionController.updateHabitacion);
router.delete('/:id', habitacionController.deleteHabitacion);
router.get('/', habitacionController.getHabitaciones);

module.exports = router;