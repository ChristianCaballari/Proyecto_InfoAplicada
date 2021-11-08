const Solicitud = require("../models/Solicitud"); 
const Data = require("../dataModel/Data");

exports.crear = (req, res) => {

    solicitud= new Solicitud(req.body.fechaHora,re.body.idUsuarioAplicativo,req.body.idResponsableTI,req.body.fechaInicio,
        req.body.fechaFin,req.body.idResponsableUsuarioFinal,req.body.documentoActaConstitutiva);
    
    let transaccion = `EXEC [dbo].[sp_insertDepartment] @fechaHora =N'${fechaHora}',@idUsuarioAplicativo =N'${idUsuarioAplicativo}',
    @idResponsableTI =N'${idResponsableTI}',@fechaInicio =N'${fechaInicio}',@fechaFin =N'${fechaFin}',@idResponsableUsuarioFinal =N'${idResponsableUsuarioFinal}',
    @documentoActaConstitutiva =N'${documentoActaConstitutiva}'`;

    let data = new Data();
    data.transaccion2(transaccion,res);   

  
} 

exports.eliminar  = (req, res) => {
      const idSolicitud = req.params.id;   
      
      let transaccion = `EXEC [dbo].[sp_deleteDepartment] @idSolicitud =N'${idSolicitud}'`;
      let data = new Data();
      data.transaccion2(transaccion,res);
}

exports.obtener = (req, res) => {

    let trasaccion = `EXEC [dbo].[sp_selectDepartaments]`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
} 

exports.editar = (req, res) => {
    let solicitud;
    
    const {idDepartamento, descripcion }  = req.body;
  
    let data = new Data();

    let transaccion = `EXEC [dbo].[sp_updateDepartment] @idDepartamento =N'${idDepartamento}',@descripcion =N'${descripcion}'`;
     data.transaccion2(transaccion,res);

} 

exports.buscar=(req,res) => {

    let trasaccion = `EXEC [dbo].[sp_searchDepartment]`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
}