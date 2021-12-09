const Data2 = require('../dataModel/Data2');
const Data = require("../dataModel/Data");

exports.obtenerSexo = (req, res) => {

    let transaccion = `EXEC [dbo].[sp_SelectSexo]`;
    let promise =  Data2.transaccion(transaccion);

    promise.then((result)=>{
       res.json(result);
    });
}
exports.crear = (req, res) => {

    const descripcion = req.body.descripcion; 
    
    let transaccion = `EXEC [dbo].[sp_insertSexo] @descripcion =N'${descripcion}'`;

    let data = new Data();

    data.transaccion2(transaccion,res);   

}

exports.eliminar  = (req, res) => {

    const idSexo = req.params.id;   
    let transaccion = `EXEC [dbo].[sp_deleteSexo] @idSexo =N'${idSexo}'`;
    let data = new Data();
    data.transaccion2(transaccion,res);

    
}

exports.editar = (req, res) => {
    
    let  idSexo = req.params.id;  
    const {descripcion }  = req.body;

    let data = new Data();
  
    let transaccion = `EXEC [dbo].[sp_updateSexo] @idSexo =N'${idSexo}',@descripcion =N'${descripcion}'`;
     data.transaccion2(transaccion,res);
  
  } 