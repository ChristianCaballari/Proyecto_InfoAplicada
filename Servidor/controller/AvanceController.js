const Avance = require("../models/Avance"); 
const Data = require("../dataModel/Data");

exports.crear = (req, res) => {
    
    const { idTrimestre, idUsuarioAplicativo, idSolicitud, documento  } = req.body;
   

    console.log("Veamos datos ");

    console.log(idTrimestre);
    console.log(idUsuarioAplicativo);
    console.log(idSolicitud);
    console.log(documento);

    console.log("Veamos datos ");

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
    
    console.log("ID AVANCE "+idAvance);
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
    const a= {idTrimestre,idUsuarioAplicativo,
        idSolicitud,documento}  = req.body;
    let idAvance = req.params.id;
    
    let data = new Data();

    let transaccion = `EXEC [dbo].[sp_updateAvance] @idAvance=N'${idAvance}',@idTrimestre=N'${a.idTrimestre}',
    @idUsuarioAplicativo =N'${a.idUsuarioAplicativo}',@idSolicitud =N'${a.idSolicitud}',
    @documento =N'${a.documento}'`;
    data.transaccion2(transaccion,res);
    
} 