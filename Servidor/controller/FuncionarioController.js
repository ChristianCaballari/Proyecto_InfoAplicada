const DataFuncionario = require("../dataModel/DataFuncionario");

exports.crear = (req, res) => {

  const {idDepartamento, idSexo, nombre, apellidos, fachaNacimiento, foto, loginName, password} = req.body;

  let transaccion = `EXEC [dbo].[sp_insertFuncionario] @idDepartamento =N'${idDepartamento}',@idSexo =N'${idSexo}',@nombre =N'${nombre}',
  @apellidos =N'${apellidos}',@fechaNacimiento =N'${fachaNacimiento}',@foto =N'${foto}',
  @loginName =N'${loginName}',@password =N'${password}'`;

  let promise = DataFuncionario.trasaccion(transaccion);

   promise.then((resultado) =>{
       res.json(resultado);
   })
};


exports.editar = (req, res) => {

  const {idFuncionario,idDepartamento, idSexo, nombre, apellidos, fachaNacimiento, foto, loginName} = req.body;

  console.log("HOALSLFSLDFJLKSJDFLKJSLKFJSLKFJLDSJFJDSLFJLKDSFJLKDSJF");
  console.log(idDepartamento);
  console.log(idSexo);
  console.log(nombre);
  console.log(apellidos);
  console.log(loginName);
  console.log(foto);
  console.log("HOALSLFSLDFJLKSJDFLKJSLKFJSLKFJLDSJFJDSLFJLKDSFJLKDSJF");

  let transaccion = `EXEC [dbo].[sp_updateFuncionario] @idFuncionario =N'${idFuncionario}', @idDepartamento =N'${idDepartamento}',@idSexo =N'${idSexo}',@nombre =N'${nombre}',
  @apellidos =N'${apellidos}',@fechaNacimiento =N'${fachaNacimiento}',@foto =N'${foto}',
  @loginName =N'${loginName}'`;

  let promise = DataFuncionario.trasaccion(transaccion);

   promise.then((resultado) =>{
       res.json(resultado);
   })
};

exports.obtenerFuncionarios = (req, res) => {
  let transaccion = `EXEC [dbo].[sp_selectFuncionarios];`;
  let promise = DataFuncionario.trasaccion(transaccion);
  try {
    promise.then((resultado) => {
      if (resultado[0].idFuncionario != undefined) {
        res.json(resultado);
      } else {
        return res.status.json({
          msg: "No hay Funcionarios registrados",
          noValido: "NO",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.obtenerFuncionario = (req, res) =>{
  const { idFuncionario } = req.params;
  let transaccion = `EXEC [dbo].[sp_selectFuncionario] @idFuncionario =N'${idFuncionario}'`;
  let promise = DataFuncionario.trasaccion(transaccion);
  try {
    promise.then((resultado) => {
        console.log(resultado);
        if(resultado != undefined){
           res.json(resultado);
        }else{
        return res
        .status(200)
        .json({ msg: "El Usuario no existe", noValido: "No" });  
        }
    });
  } catch (error) {
      console.log(error);
  }
}
exports.obtenerFuncionarioDetalles = (req, res) =>{
  const { idFuncionario } = req.params;
  let transaccion = `EXEC [dbo].[sp_selectFuncionarioDetalles] @idFuncionario =N'${idFuncionario}'`;
  let promise = DataFuncionario.trasaccion(transaccion);
  try {
    promise.then((resultado) => {
        console.log(resultado);
        if(resultado != undefined){
           res.json(resultado);
        }else{
        return res
        .status(200)
        .json({ msg: "El Usuario no existe", noValido: "No" });  
        }
    });
  } catch (error) {
      console.log(error);
  }
}

exports.eliminarFuncionario = (req, res) =>{
        const { idFuncionario } = req.params;
        let transaccion = `EXEC [dbo].[sp_eliminarFuncionario] @idFuncionario =N'${idFuncionario}'`;
        let promise = DataFuncionario.trasaccion(transaccion);    
        try {
          promise.then((resultado) => {
            let da = resultado[0].resultado;
            console.log(da);
      
              if(da ===true){
                return res.status(200)
              .json({ msg: "Funcionario eliminado", valido: "Si" });
              }else{
              return res
              .status(200)
              .json({ msg: "Funcionario asociado a una Solicitud", valido: "No" });  
              }
          });
        } catch (error) {
            console.log(error);
     }
}
