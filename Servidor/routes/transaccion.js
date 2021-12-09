const express = require('express'); 
const router = express.Router(); // Usar route de express y express para el servidor

const transaccionController = require('../controller/TransaccionController');

router.get('/consultar',
transaccionController.obtener
);

router.delete('/:id',
transaccionController.eliminar
);

router.put('/editar/:id',
transaccionController.editar
);

router.post('/',

transaccionController.crear
   
);

module.exports = router; //exportar porque se usa en index