const express = require('express'); 
const router = express.Router(); // Usar route de express y express para el servidor

const sexoController = require('../controller/SexoController');

router.get('/obtenerSexo',
sexoController.obtenerSexo
);

router.delete('/:id',
sexoController.eliminar
);

router.put('/editar/:id',
sexoController.editar
);

router.post('/',

sexoController.crear
   
);

module.exports = router; //exportar porque se usa en index