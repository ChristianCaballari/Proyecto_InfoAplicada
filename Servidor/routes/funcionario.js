const express = require('express'); 
const router = express.Router(); // Usar route de express y express para el servidor

const funcionarioController = require('../controller/FuncionarioController');


//Crear un avance (api/avance)
router.post('/',

funcionarioController.crear
   
);
// Eliminar (api/id)
router.delete('/:id',
funcionarioController.eliminar
);

// Consultar 
router.get('/consultar/:correo/:password',
funcionarioController.obtener
);

// Actualizar
router.put('/editar/:id',
funcionarioController.editar
);

router.get('/obtenerFuncionarios',
     funcionarioController.obtenerFuncionarios
);


module.exports = router; //exportar porque se usa en index