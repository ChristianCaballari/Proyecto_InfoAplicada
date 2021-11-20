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
router.get('/consultar/funcionario/:id',solicitudController.funcionarioSolicitud);
router.get('/consultar',solicitudController.obtener);
router.post('/filtro',solicitudController.solicitudFiltro);


router.get('/obtenerSolicitudesTI',solicitudController.selectProyectosSolicitud);

router.get('/documentoActa/:id',solicitudController.documentoActaConstitutiva);


// Actualizar solicitud
router.put('/editar/:id',solicitudController.editar);

router.get('/obtenerProyectoTerminadoCancelado',solicitudController.proyectoTerminadoCancelado);

router.delete('/TerminarSolicitud/:id',solicitudController.terminarSolicitud);



module.exports = router; //exportar porque se usa en index