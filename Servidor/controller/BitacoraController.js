const Avance = require("../models/Bitacora"); 
const Data = require("../dataModel/Data");
const Bitacora = require("../models/Bitacora");


exports.searchMonth = (req, res) => {
    b = new Bitacora (req.body.mesInicio,req.body.mesFinal) ;

    let trasaccion = `EXEC [dbo].[searchBitacoraByMonth] @mesInicio=N'${b.mesInicio}',
    @mesFinal=N'${b.mesFinal}'`;
    let data = new Data();
    data.transaccion2(trasaccion,res);
} 

exports.obtener=(req,res)=>{

    let trasaccion = `EXEC [dbo].[selectAllBitacoras]`;
    let data = new Data();
    data.transaccion2(trasaccion,res);

}