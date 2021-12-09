const DataFuncionario = require("../dataModel/DataFuncionario");
const Data = require("../dataModel/Data");


exports.obtenerTrimestres = (req, res) => {


  let transaccion = `EXEC [dbo].[sp_selectTrimestre]`;

  let promise = DataFuncionario.trasaccion(transaccion);

   promise.then((resultado) =>{
       res.json(resultado);
   })
};

exports.eliminar  = (req, res) => {

  const idTrimestre = req.params.id;   
  let transaccion = `EXEC [dbo].[sp_deleteTrimestre] @idTrimestre =N'${idTrimestre}'`;
  let data = new Data();
  data.transaccion2(transaccion,res);

  
}

exports.crear = (req, res) => {

  const descripcion = req.body.descripcion; 
  
  let transaccion = `EXEC [dbo].[sp_insertTrimestre] @descripcion =N'${descripcion}'`;

  let data = new Data();

  data.transaccion2(transaccion,res);   

}

exports.editar = (req, res) => {
  let  idTrimestre = req.params.id;  
  const {descripcion }  = req.body;
 
  let data = new Data();

  let transaccion = `EXEC [dbo].[sp_updateTrimestre] @idTrimestre =N'${idTrimestre}',@descripcion =N'${descripcion}'`;
   data.transaccion2(transaccion,res);

} 

