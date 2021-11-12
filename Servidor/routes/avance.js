const express = require('express'); 
const router = express.Router(); // Usar route de express y express para el servidor

const avanceController = require('../controller/AvanceController');


//Crear un avance (api/avance)
router.post('/', avanceController.crear);
// Eliminar un vuelo (api/id)
router.delete('/:id',avanceController.eliminar);

// Consultar avance
router.get('/consultar',avanceController.obtener);

//Obtener Documento 
router.get('/obtenerDocumento/:id',avanceController.obtenerDocumento);

// Actualizar avance
router.put('/editar/:id',avanceController.editar);


module.exports = router; //exportar porque se usa en index