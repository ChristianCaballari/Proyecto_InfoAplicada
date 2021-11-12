const DataFuncionario = require("../dataModel/DataFuncionario");

exports.obtenerTrimestres = (req, res) => {


  let transaccion = `EXEC [dbo].[sp_selectTrimestre]`;

  let promise = DataFuncionario.trasaccion(transaccion);

   promise.then((resultado) =>{
       res.json(resultado);
   })
};
