const Avance = require("../models/Avance"); 
const DataAvance = require("../dataModel/DataAvance");

exports.crear = (req, res) => {
    avance = new Avance(req.body.idTrimestre,req.body.idUsuarioAplicativo,req.body.idSolicitud,
        req.body.documento,req.body.fechaHora);
    
    let data = new Data();
    let transaccion = `EXEC [dbo].[sp_insertDepartment] @descripcion =N'${descripcion}'`;
    data.transaccion2(transaccion,res); 
} 

exports.eliminar  = (req, res) => {
     
}

exports.obtener = (req, res) => {

} 

exports.editar = (req, res) => {

} 