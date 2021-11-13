const Avance = require("../models/Avance"); 
const Data = require("../dataModel/Data");

exports.crear = (req, res) => {
    
    const { idTrimestre, idUsuarioAplicativo, idSolicitud, documento  } = req.body;

    let data = new Data();

    let transaccion = `EXEC [dbo].[sp_insertarAvance] @idTrimestre =N'${idTrimestre}',
    @idUsuarioAplicativo =N'${idUsuarioAplicativo}',@idSolicitud =N'${idSolicitud}',
    @documento =N'${documento}'`;
    data.transaccion2(transaccion,res); 
} 

exports.eliminar  = (req, res) => {

     const idAvance = req.params.id;   
     let transaccion = `EXEC [dbo].[sp_deleteAvance] @idAvance =N'${idAvance}'`;
     let data = new Data();
     data.transaccion2(transaccion,res);

     
}
exports.obtenerDocumento = (req, res) =>{

    const idAvance = req.params.id;
    let transaccion = `EXEC [dbo].[sp_selectDocumentoAvance] @idAvance =N'${idAvance}'`;
    let data = new Data();
    data.transaccion2(transaccion,res);
}
exports.obtener = (req, res) => {
    let trasaccion = `EXEC [dbo].[sp_selectAvance]`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
} 

exports.editar = (req, res) => {
    const {idAvance,idTrimestre,idUsuarioAplicativo,
        idSolicitud,documento}  = req.body;
      
    let data = new Data();

    let transaccion = `EXEC [dbo].[sp_updateAvance] @idAvance=N'${idAvance}',@idTrimestre=N'${idTrimestre}',
    @idUsuarioAplicativo =N'${idUsuarioAplicativo}',@idSolicitud =N'${idSolicitud}',
    @documento =N'${documento}'`;
    data.transaccion2(transaccion,res);
    
} 
exports.obtenerAvanceUpdate = (req, res) =>{
    const idAvance = req.params.id;  

    let data = new Data();
    let transaccion = `EXEC [dbo].[sp_selectAvanceUpdate] @idAvance=N'${idAvance}'`;
    data.transaccion2(transaccion,res);

}