const Funcionario = require("../models/Funcionario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const DataFuncionario = require("../dataModel/DataFuncionario");
const DataLogin = require("../dataModel/DataLogin");

exports.autenticarUsuario = async (req, res) => {
  //Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  // estraer loginName y password
  const { loginName, password } = req.body;

  let promise = DataLogin.login(loginName, password);

  try {
    // Verificar que el funcionario este registrado
    promise.then((resultado) => {
      console.log(resultado);
      if (resultado[0].loginName != undefined) {
        //    res.json(resultado);
      } else {
        return res
          .status(200)
          .json({ msg: "El Usuario no existe", noValido: "No" });
      }
     
      const idFun = resultado[0].idFuncionario;
      const nombreusuario = resultado[0].loginName;
      const foto = resultado[0].foto;
     
      // Pasa la validacion
      //Crea y firmar el JWT
      const payload = {
        funcionario: {
          id: resultado.idFuncionario,
        },
      };
      //Firmar el JWT
      jwt.sign(
        payload,
        process.env.KEY,
        {
          expiresIn: 3600, //1 hora
        },
        (error, token) => {
          if (error) throw error;
          //Mensaje de confirmacion
          res.json({ "token":token,"idFuncionario":idFun,"loginName":nombreusuario, "foto":foto});
        }
      );
    });
    // console.log(dat);
  } catch (error) {
    console.log(error);
  }
};
