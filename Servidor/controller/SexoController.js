const Data2 = require('../dataModel/Data2');

exports.obtenerSexo = (req, res) => {

    let transaccion = `EXEC [dbo].[sp_SelectSexo]`;
    let promise =  Data2.transaccion(transaccion);

    promise.then((result)=>{
       res.json(result);
    });
}