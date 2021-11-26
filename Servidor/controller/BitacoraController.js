const Avance = require("../models/Bitacora"); 
const Data = require("../dataModel/Data");
const Bitacora = require("../models/Bitacora");


exports.searchMonth = (req, res) => {
 //   b = new Bitacora (req.body.mesInicio,req.body.mesFinal) ;
    
    const { mesInicio, mesFinal} = req.body;

    console.log("Inicio");
    console.log(mesInicio);
    console.log(mesFinal);
    console.log("Fin");

    let trasaccion = `EXEC [dbo].[searchBitacoraByMonth] @mesInicio=N'${mesInicio}',
    @mesFinal=N'${mesFinal}'`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
} 

exports.obtener=(req,res)=>{

    let trasaccion = `EXEC [dbo].[selectAllBitacoras]`;
    let data = new Data();
    data.transaccion2(trasaccion,res);

}