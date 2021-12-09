
const Data = require("../dataModel/Data");


exports.obtener = (req, res) => {

    let trasaccion = `EXEC [dbo].[sp_selectTransaccion]`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
} 


exports.crear = (req, res) => {

    const descripcion = req.body.descripcion; 
    
    let transaccion = `EXEC [dbo].[sp_insertTransaccion] @descripcion =N'${descripcion}'`;

    let data = new Data();

    data.transaccion2(transaccion,res);   

}

exports.eliminar  = (req, res) => {

    const idTransaccion = req.params.id;   
    let transaccion = `EXEC [dbo].[sp_deleteTransaccion] @idTransaccion =N'${idTransaccion}'`;
    let data = new Data();
    data.transaccion2(transaccion,res);

    
}

exports.editar = (req, res) => {
    
    let  idTransaccion = req.params.id;  
    const {descripcion }  = req.body;

    let data = new Data();
  
    let transaccion = `EXEC [dbo].[sp_updateTransaccion] @idTransaccion =N'${idTransaccion}',@descripcion =N'${descripcion}'`;
     data.transaccion2(transaccion,res);
  
  } 