const express = require('express'); 
const router = express.Router();

const trimestreController = require('../controller/TrimestreController');

router.get('/trimestres',
trimestreController.obtenerTrimestres
);

module.exports = router; //exportar porque se usa en index