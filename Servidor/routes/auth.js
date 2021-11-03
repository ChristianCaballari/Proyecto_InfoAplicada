//Rutas de autenticacion de usuarios

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const AuthController = require('../controller/AuthController');

//api/auth
router.post('/',
    [
      check('loginName', 'El nombre de usuario es obligatorio').not().isEmpty(),
      check('password','El password debe ser minimo de 5 caracteres').isLength({ min: 5})    
    ],
    AuthController.autenticarUsuario
);
module.exports = router;