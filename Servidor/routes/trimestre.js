const express = require('express'); 
const router = express.Router();

const trimestreController = require('../controller/TrimestreController');

router.get('/trimestres',
trimestreController.obtenerTrimestres
);

router.delete('/:id',
trimestreController.eliminar
);

router.put('/editar/:id',
trimestreController.editar
);

router.post('/',

trimestreController.crear
   
);

module.exports = router; //exportar porque se usa en index