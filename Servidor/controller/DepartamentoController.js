const Data = require("../dataModel/Data");
const Data2 = require("../dataModel/Data2");
exports.crear = (req, res) => {

    const descripcion = req.body.descripcion; 
    console.log("backend-> descripcion ",descripcion);

    let transaccion = `EXEC [dbo].[sp_insertDepartment] @descripcion =N'${descripcion}'`;

    let data = new Data();

    data.transaccion2(transaccion,res);   

  
} 

exports.eliminar  = (req, res) => {
      const idDepartamento = req.params.id;

      console.log(idDepartamento);
      let transaccion = `EXEC [dbo].[sp_deleteDepartment] @idDepartamento =N'${idDepartamento}'`;
      
      let promise = Data2.transaccion(transaccion);

      promise.then((resultado)=>{
          if(resultado[0].resultado){
            console.log(resultado[0].resultado);
            return res
            .status(200)
            .json({ msg: "Departamento eliminado", valido: "Si" });
          }else{
            return res
            .status(200)
            .json({ msg: "El departamento contiene Funcionarios Asociados", valido: "No" });
          }
      })    
}

exports.obtener = (req, res) => {

    let trasaccion = `EXEC [dbo].[sp_selectDepartaments]`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
} 

exports.editar = (req, res) => {
    let departamento;
    
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