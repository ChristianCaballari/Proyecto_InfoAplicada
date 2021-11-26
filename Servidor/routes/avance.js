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


//Obtener avance
router.get('/obtenerAvanceUpdate/:id',avanceController.obtenerAvanceUpdate);

// Actualizar avance
router.patch('/editar',avanceController.editar);

router.get('/obtenerAvanceProyecto',avanceController.avanceProyecto);

router.get('/obtenerAvanceTrimestral',avanceController.avanceTrimestral);

router.post('/solicitud', avanceController.avanceTrimestralSolicitud);

module.exports = router; //exportar porque se usa en index