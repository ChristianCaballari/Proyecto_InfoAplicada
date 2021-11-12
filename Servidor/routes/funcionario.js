const express = require('express'); 
const router = express.Router(); // Usar route de express y express para el servidor

const funcionarioController = require('../controller/FuncionarioController');


//Crear un avance (api/avance)
router.post('/',

funcionarioController.crear
   
);
// Eliminar (api/id)
router.delete('/:idFuncionario',
funcionarioController.eliminarFuncionario
);
// Actualizar
router.patch('/editar',
funcionarioController.editar
);

router.get('/obtenerFuncionarios',
     funcionarioController.obtenerFuncionarios
);

router.get('/obtenerFuncionario/:idFuncionario',
     funcionarioController.obtenerFuncionario
);
router.get('/obtenerFuncionarioDetalles/:idFuncionario',
     funcionarioController.obtenerFuncionarioDetalles
);


module.exports = router; //exportar porque se usa en index