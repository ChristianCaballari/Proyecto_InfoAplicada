const db_conection = require("../config/db");

exports.login = async(loginName, password) =>{
    let log;
     try {
       await db_conection.sql.connect(db_conection.config)
          .then(pool =>{
               return pool.request()
               .input('loginName',db_conection.sql.VarChar(30),loginName)
               .input('password',db_conection.sql.VarChar(30),password)
               .execute('sp_selectFuncionarioLogin');
          }).then(result =>{
           // res.json(result.recordsets[0]);
            console.log("Conexion cerrada");
            //console.log(result.recordsets[0]);
            log = result.recordsets[0];
            db_conection.sql.close();
          }).catch(err =>{
              console.log(err);
          });
     } catch (error) {
       console.log(error)
     }
     return log;
   }
