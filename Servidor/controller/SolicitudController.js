const Solicitud = require("../models/Solicitud"); 
const Data = require("../dataModel/Data");
const DataFuncionario = require("../dataModel/DataFuncionario");


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
      let promise = DataFuncionario.trasaccion(transaccion);    
      try {
        promise.then((resultado) => {
          let da = resultado[0].resultado;
          console.log(da);
    
            if(da ===true){
              return res.status(200)
            .json({ msg: "Solicitud eliminada", valido: "Si" });
            }else{
            return res
            .status(200)
            .json({ msg: "No se puede eliminar", valido: "No" });  
            }
        });
      } catch (error) {
          console.log(error);
   };
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

exports.funcionarioTI=(req,res) =>{
    let trasaccion = `EXEC [dbo].[sp_selectFuncionariosTI]`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
}

exports.buscar=(req,res) => {

    let trasaccion = `EXEC [dbo].[sp_searchDepartment]`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
}
exports.selectProyectosSolicitud=(req,res) =>{
    let trasaccion = `EXEC [dbo].[sp_selectProyectosSolicitud]`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
}

exports.documentoActaConstitutiva=(req,res) =>{
    const idSolicitud = req.params.id; 

    console.log("IDSOLICITUD");

    console.log(idSolicitud);

    console.log("IDSOLICITUD");
    let trasaccion = `EXEC [dbo].[sp_selectDocumentoActaConstitutiva] @idSolicitud =N'${idSolicitud}'`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
}

exports.funcionarioSolicitud=(req,res) =>{
    let idFuncionario = req.params.id; 
    let trasaccion = `EXEC [dbo].[sp_selectFuncionarioSolicitud] @idFuncionario=N'${idFuncionario}'`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
    
}