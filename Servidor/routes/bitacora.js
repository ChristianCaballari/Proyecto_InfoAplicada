const express = require('express'); 
const router = express.Router(); // Usar route de express y express para el servidor

const BitacoraController = require('../controller/BitacoraController');

router.get('/consultar',BitacoraController.obtener);
router.post('/filtro',BitacoraController.searchMonth);

module.exports = router;