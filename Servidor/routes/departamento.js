const express = require('express'); 
const router = express.Router(); // Usar route de express y express para el servidor

const departamentoController = require('../controller/DepartamentoController');


//Crear un Departamento
router.post('/',

    departamentoController.crear
   
);
// Eliminar un departamento (api/id)
router.delete('/:id',
    departamentoController.eliminar
);

// Consultar un departamento
router.get('/consultar',
    departamentoController.obtener
);

// Actualizar un departamento
router.put('/editar/:id',
    departamentoController.editar
);

router.get('/buscar/:id',

);


module.exports = router; //exportar porque se usa en index