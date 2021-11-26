const sql = require('mssql')
const config={
    // server: 'localhost',
    // user:'logChristian',
    // password:'123',
    
    
    database:'proyectoInfoAplicada',
   
        server: 'DESKTOP-093HK3B\\SQLEXPRESS',
        user:'root',
        password:'12345',
    
    options: {
        trustServerCertificate: true,
    }
};
exports.config= config;
exports.sql= sql;