const Solicitud = require("../models/Solicitud"); 
const Data = require("../dataModel/Data");

exports.crear = (req, res) => {
    let solicitud;
    s= new Solicitud(req.body.idUsuarioAplicativo,req.body.idResponsableTI,req.body.fechaInicio,
        req.body.fechaFin,req.body.idResponsableUsuarioFinal,req.body.documentoActaConstitutiva);
    
        console.log(solicitud);

    let transaccion = `EXEC [dbo].[sp_insertarSolicitud] @idUsuarioAplicativo=N'${s.idUsuarioAplicativo}',
    @idResponsableTI =N'${s.idResponsableTI}',@fechaInicio =N'${s.fechaInicio}',@fechaFin =N'${s.fechaFin}'
    ,@idResponsableUsuarioFinal =N'${s.idResponsableUsuarioFinal}',
    @documentoActaConstitutiva =N'${s.documentoActaConstitutiva}'`;

    let data = new Data();
   data.transaccion2(transaccion,res);  
    

  
} 

exports.eliminar  = (req, res) => {
      const idSolicitud = req.params.id;   
      console.log(idSolicitud);
      
      let transaccion = `EXEC [dbo].[sp_deleteSolicitud] @idSolicitud =N'${idSolicitud}'`;
      let data = new Data();
      data.transaccion2(transaccion,res);
}

exports.obtener = (req, res) => {

    let trasaccion = `EXEC [dbo].[sp_selectAllSolicitud]`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
} 

exports.editar = (req, res) => {

    const s= {idUsuarioAplicativo,idResponsableTI,fechaInicio,fechaFin,
        idResponsableUsuarioFinal,documentoActaConstitutiva}  = req.body;
    let idSolicitud = req.params.id;
    let data = new Data();

    let transaccion = `EXEC [dbo].[sp_updateSolicitud] @idSolicitud=N'${idSolicitud}',@idUsuarioAplicativo=N'${s.idUsuarioAplicativo}',
    @idResponsableTI =N'${s.idResponsableTI}',@fechaInicio =N'${s.fechaInicio}',@fechaFin =N'${s.fechaFin}'
    ,@idResponsableUsuarioFinal =N'${s.idResponsableUsuarioFinal}',
    @documentoActaConstitutiva =N'${s.documentoActaConstitutiva}'`;
     data.transaccion2(transaccion,res);
     
     

} 

exports.buscar=(req,res) => {

    let trasaccion = `EXEC [dbo].[sp_searchDepartment]`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
}