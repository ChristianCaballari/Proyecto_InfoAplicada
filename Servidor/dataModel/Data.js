
const db_conection = require("../config/db");
const Departamento = require("../models/Departamento");

class Data { 
    constructor(){

    }

    transaccion2(transaccion,res){
     
      try {
        db_conection.sql.connect(db_conection.config).then(()=>{
          return db_conection.sql.query(transaccion);
          }).then(result=>{
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

}



module.exports = Data;