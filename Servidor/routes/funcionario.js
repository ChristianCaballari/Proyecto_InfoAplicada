const express = require('express'); 
const router = express.Router(); // Usar route de express y express para el servidor

const funcionarioController = require('../controller/FuncionarioController');


//Crear un avance (api/avance)
router.post('/',

funcionarioController.crear
   
);
// Eliminar un vuelo (api/id)
router.delete('/:id',
funcionarioController.eliminar
);

// Consultar vuelo
router.get('/consultar/:correo/:password',
funcionarioController.obtener
);

// Actualizar vuelo
router.put('/editar/:id',
funcionarioController.editar
);


module.exports = router; //exportar porque se usa en index