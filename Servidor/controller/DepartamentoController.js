const Departamento = require("../models/Departamento"); 
const Data = require("../dataModel/Data");

exports.crear = (req, res) => {

    const descripcion = req.body.descripcion; 

    let transaccion = `EXEC [dbo].[sp_insertDepartment] @descripcion =N'${descripcion}'`;

    let data = new Data();

    data.transaccion2(transaccion,res);   

  
} 

exports.eliminar  = (req, res) => {
      const idDepartamento = req.params.id;   

      let trasaccion = `EXEC [dbo].[sp_deleteDepartment] @idDepartamento =N'${idDepartamento}'`;
      let data = new Data();
      data.transaccion2(trasaccion,res);
}

exports.obtener = (req, res) => {

    let trasaccion = `EXEC [dbo].[sp_selectDepartaments]`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
} 

exports.editar = (req, res) => {
    let departamento;
    
    departamento = new Vuelo(req.body.descripcion);
    let id = req.params.id;
    const {descripcion} = departamento;
  
    let data = new Data();

    let transaccion = `EXEC [dbo].[sp_updateDepartment] @id =N'${id}',@descripcion =N'${descripcion}'`;
     data.transaccion2(transaccion,res);

} 

exports.buscar=(req,res) => {

    let trasaccion = `EXEC [dbo].[sp_searchDepartment]`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
}