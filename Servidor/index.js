const express = require('express');

//Crea el servidor
const app = express();

//Habilitar express.json

const cors = require('cors');
app.use(cors());
app.use(cors({origin: true, credentials: true}));

app.use(express.json({ extended: true}));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//variables de entorno 

//Importar rutas

//app.use('/api/', require('./routes/avance')); 
app.use('/api/funcionario', require('./routes/funcionario'));

app.listen(PORT, () =>{
    console.log('Servidor Activo');
});