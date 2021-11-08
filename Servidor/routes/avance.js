const express = require('express'); 
const router = express.Router(); // Usar route de express y express para el servidor

const avanceController = require('../controller/AvanceController');


//Crear un avance (api/avance)
router.post('/',

    avanceController.crear
   
);
// Eliminar un vuelo (api/id)
router.delete('/:id',
    avanceController.eliminar
);

// Consultar vuelo
router.get('/obtener/:id',
    avanceController.obtener
);

// Actualizar vuelo
router.put('/editar/:id',
    avanceController.editar
);


module.exports = router; //exportar porque se usa en index