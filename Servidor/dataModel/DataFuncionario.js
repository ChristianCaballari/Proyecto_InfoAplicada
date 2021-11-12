const db_conection = require("../config/db");

exports.trasaccion = async(transaccion) =>{
  let data;
  try {
    await db_conection.sql.connect(db_conection.config).then(()=>{
      return db_conection.sql.query(transaccion);
      }).then(result=>{       
      data = result.recordsets[0];
  
    }).then(()=>{
      console.log("Conexion cerrada");
     return db_conection.sql.close();
    }).catch(err=>{
      console.log(err);
    });
  } catch (error) {
    console.log(error)
  }
  return data;
}