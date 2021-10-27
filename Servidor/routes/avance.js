const express = require('express'); 
const router = express.Router(); // Usar route de express y express para el servidor

const solicitudController = require('../controller/AvanceController');


//Crear un avance (api/avance)
router.post('/',

solicitudController.crear
   
);
// Eliminar un vuelo (api/id)
router.delete('/:id',
    solicitudController.eliminar
);

// Consultar vuelo
router.get('/consultar',
    solicitudController.obtener
);

// Actualizar vuelo
router.put('/editar/:id',
    solicitudController.editar
);


module.exports = router; //exportar porque se usa en index