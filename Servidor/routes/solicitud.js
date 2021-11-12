const express = require('express'); 
const router = express.Router(); // Usar route de express y express para el servidor

const solicitudController = require('../controller/SolicitudController');


//Crear una solicitud (api/avance)
router.post('/',solicitudController.crear);
// Eliminar una solicitud (api/id)
router.delete('/:id',solicitudController.eliminar);

// Consultar solicitud
router.get('/consultar',solicitudController.obtener);
router.get('/consultar/TI',solicitudController.funcionarioTI);
router.get('/consultar',solicitudController.obtener);


router.get('/obtenerSolicitudesTI',solicitudController.selectProyectosSolicitud);

// Actualizar solicitud
router.put('/editar/:id',solicitudController.editar);



module.exports = router; //exportar porque se usa en index