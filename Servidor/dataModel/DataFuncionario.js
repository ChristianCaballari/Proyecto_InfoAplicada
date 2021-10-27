const { MAX } = require("mssql");
const db_conection = require("../config/db");
const Funcionario = require("../models/Funcionario");

class DataFuncionario { 
    constructor(){

    }

    transaccion2(transaccion,res){
     
      try {
        db_conection.sql.connect(db_conection.config).then(()=>{
          return db_conection.sql.query(transaccion);
          }).then(result=>{
          console.dir(result);
          res.json(result.recordsets[0]);
        }).then(()=>{
          console.log("Conexion cerrada");
          return db_conection.sql.close();
        }).catch(err=>{
          console.log(err);
        });
      } catch (error) {
        console.log(error)
      }
    }

   spInsertar(Funcionario,res){
    const {idDepartamento,idSexo,nombre,apellidos,fechaNacimiento,foto,loginName,password} = Funcionario;

    try {
      db_conection.sql.connect(db_conection.config)
      .then(pool =>{
           return pool.request()
           .input('idDepartamento',db_conection.sql.TinyInt,idDepartamento)
           .input('idSexo',db_conection.sql.TinyInt,idSexo)
           .input('nombre',db_conection.sql.VarChar(30),nombre)
           .input('apellidos',db_conection.sql.VarChar(30),apellidos)
           .input('fechaNacimiento',db_conection.sql.Date,fechaNacimiento)
           .input('foto',db_conection.sql.VarChar(300),foto)
           .input('loginName',db_conection.sql.VarChar(30),loginName)
           .input('password',db_conection.sql.VarChar(30),password)
       
           .execute('sp_insertFuncionario');
      }).then(result =>{
        res.json(result.recordsets[0]);
        console.log("Conexion cerrada");
        return db_conection.sql.close();
      }).catch(err =>{
          console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  }

  

}



module.exports = DataFuncionario;