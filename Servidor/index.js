const express = require('express');
require("dotenv").config();
const cors = require('cors');
//Crea el servidor
const app = express();

//Habilitar express.json


app.use(cors());
app.use(cors({origin: true, credentials: true}));

app.use(express.json({ extended: true}));

//Puerto de la app
const PORT = process.env.PORT || 4000;


//Importar rutas

//app.use('/api/', require('./routes/avance')); 
app.use('/api/funcionario', require('./routes/funcionario'));
app.use('/api/departamento', require('./routes/departamento'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/sexo', require('./routes/sexo'));
app.use('/api/trimestre', require('./routes/trimestre'));
app.use('/api/avance', require('./routes/avance'));
app.use('/api/solicitud', require('./routes/solicitud'));
app.use('/api/bitacora', require('./routes/bitacora'));
app.use('/api/transaccion', require('./routes/transaccion'));
app.listen(PORT, () =>{
    console.log('Servidor Activo');
});