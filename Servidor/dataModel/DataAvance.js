const db_conection = require("../config/db");
const Avance = require("../models/Avance");

class DataAvance { 
    constructor(){

    }

   spInsertar(Avance,res){
    const {idTrimestre,idUsuarioAplicativo,idSolicitud,documento,fechaHora} = Avance;

    try {
      db_conection.sql.connect(db_conection.config)
      .then(pool =>{
           return pool.request()
           .input('idTrimestre',db_conection.sql.Int,idTrimestre)
           .input('idUsuarioAplicativo',db_conection.sql.Int,idUsuarioAplicativo)
           .input('idSolicitud',db_conection.sql.SmallInt,idSolicitud)
           .input('documento',db_conection.sql.VarChar(30),documento)
           .input('fechaHora',db_conection.sql.SmallDateTime,fechaHora)
       
           .execute('pa_InsertVuelos');
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




module.exports = DataAvance;