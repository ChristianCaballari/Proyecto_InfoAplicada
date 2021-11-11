const Avance = require("../models/Avance"); 
const Data = require("../dataModel/Data");

exports.crear = (req, res) => {
    
   let a = new Avance(req.body.idTrimestre,req.body.idUsuarioAplicativo,req.body.idSolicitud,
        req.body.documento);
    
    console.log(a);
    let data = new Data();

    let transaccion = `EXEC [dbo].[sp_insertarAvance] @idTrimestre =N'${a.idTrimestre}',
    @idUsuarioAplicativo =N'${a.idUsuarioAplicativo}',@idSolicitud =N'${a.idSolicitud}',
    @documento =N'${a.documento}'`;
    data.transaccion2(transaccion,res); 
} 

exports.eliminar  = (req, res) => {

     const idAvance = req.params.id;   
     let transaccion = `EXEC [dbo].[sp_deleteAvance] @idAvance =N'${idAvance}'`;
     let data = new Data();
     data.transaccion2(transaccion,res);

     
}

exports.obtener = (req, res) => {
    let trasaccion = `EXEC [dbo].[sp_selectAvance]`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
} 

exports.editar = (req, res) => {
    const a= {idTrimestre,idUsuarioAplicativo,
        idSolicitud,documento}  = req.body;
    let idAvance = req.params.id;
    
    let data = new Data();

    let transaccion = `EXEC [dbo].[sp_updateAvance] @idAvance=N'${idAvance}',@idTrimestre=N'${a.idTrimestre}',
    @idUsuarioAplicativo =N'${a.idUsuarioAplicativo}',@idSolicitud =N'${a.idSolicitud}',
    @documento =N'${a.documento}'`;
    data.transaccion2(transaccion,res);
    
} 