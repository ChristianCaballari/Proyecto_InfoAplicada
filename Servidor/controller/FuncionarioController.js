const Funcionario = require("../models/Funcionario"); 
const DataFuncionario = require("../dataModel/DataFuncionario");

exports.crear = (req, res) => {
    let funcionario;

    funcionario= new Funcionario(req.body.idDepartamento,req.body.idSexo,req.body.nombre,req.body.apellidos,
        req.body.fechaNacimiento,req.body.foto,req.body.loginName,req.body.password);

    let data = new DataFuncionario();

   data.spInsertar(funcionario, res);   
} 

exports.eliminar  = (req, res) => {
     
}

exports.obtener = (req, res) => {

const { correo } = req.params;
    
const { password } = req.params;


   let transaccion = `EXEC [dbo].[sp_selectFuncionarioLogin] @loginName =N'${correo}',@password =N'${password}'`;

   let data = new DataFuncionario();
   data.transaccion2(transaccion,res);

} 

exports.editar = (req, res) => {
    
}
exports.obtenerFuncionarios = (req, res) =>{
    
    let transaccion = `EXEC [dbo].[sp_selectFuncionarios];`
    let data = new DataFuncionario();
    data.transaccion2(transaccion,res);
    
}